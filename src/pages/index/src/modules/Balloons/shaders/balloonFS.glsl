// refer: https://www.shadertoy.com/view/4lBXDt
precision highp float;

varying vec3 vPosition;
varying vec3 vColor;
varying vec3 vMiscs;

uniform sampler2D tNoise;
uniform float uTime;
uniform float uSpecularFactor;
uniform float uAlpha;
uniform vec3 uDOF;  //x:focus distance, y:focus radius, z:max radius

#define EdgeColor vec4(1., 1., 1., 1.0)
#define BoundaryColor vec4(.0, .0, .0, 1.0)
#define SpecularColor vec4(1., 1., 1., 1.0)
#define BlueColor vec4(0.384, 0.667, 0.655, 1.0)

const float amplitude = 0.32;

float noise2d(vec2 p) {
	float t = texture2D(tNoise, p).x;
	t += 0.5 * texture2D(tNoise, p * 2.0).x;
	t += 0.25 * texture2D(tNoise, p * 4.0).x;
	return t / 1.75;
}

float line(vec2 p, vec2 p0, vec2 p1, float width) {
    vec2 dir0 = p1 - p0;
    vec2 dir1 = p - p0;
    float h = clamp(dot(dir1, dir0)/dot(dir0, dir0), 0.0, 1.0);
    float d = (length(dir1 - dir0 * h) - width * 0.5);
    return d;
}

vec4 drawline(vec2 p, vec2 p0, vec2 p1, float width) {
    float d = line(p, p0, p1, width);
    d += noise2d(p * vec2(0.2)) * 0.005;
    float w = fwidth(d) * 1.0;
    
    return vec4(EdgeColor.rgb, 1.-smoothstep(-w, w, d));
}

float metaball(vec2 p, float r) {
	return r / dot(p, p);
}

vec4 balloon(vec2 pos, vec2 start, vec2 end, float radius, vec4 color) {
    // Line
    vec2 linePos = pos;
    linePos.x *= (1.0 + sin(noise2d(pos * 0.005) * pos.y * 8.) * 0.05);
    vec4 line = drawline(linePos,
        start * (1.0 + vec2(vMiscs.x * 10. * cos(uTime * 1.4), sin(1.)) * 2. * amplitude), 
        end, 0.015);
    
    // Blob shape
    vec2 c0 = start * (1.0 + vec2(vMiscs.x * 10. * cos(uTime * 1.4), sin(2.4)) * 2.8 * amplitude);
    vec2 c1 = start * (1.0 + vec2(vMiscs.y * 10. * cos(uTime * 1.4), sin(1.9)) * 0.5  * amplitude);
    vec2 c2 = start * (1.0 + vec2(vMiscs.z * 10. * sin(uTime * 1.9), cos(2.4)) * 0.3 * amplitude);

	float r = metaball(pos - c0, radius * 1.1) * 
            metaball(pos - c1, radius * 1.3) * 
            metaball(pos - c2, radius * 0.9);

    // Boundary
    vec2 boundary = vec2(0.45, 0.5);
	vec4 c = vec4(0.);
			
	vec4 egdeColor = EdgeColor;
    vec4 boundaryColor = BoundaryColor;
	vec4 blobColor = color;
    
    r += noise2d(pos * vec2(0.05)) * 0.07;

    if (r < boundary.x) {
		c = boundaryColor;
		c.a = 0.;
	} else if (r < boundary.y) {
		c = boundaryColor;
		c.a = 1.0;
    } else {
        c = blobColor;
        c.a = 1.0;
    }
    
    // Shadow
    // if(length(pos)< .25) c.rgb *= 1. * cos(pos.y) * length(pos);

    // Add specular
    vec2 s0 = start * (1.0 + vec2(vMiscs.x * 5. * cos(uTime * 1.4), sin(0.9)) * 4. * amplitude);
    vec2 s1 = start * (1.0 + vec2(vMiscs.y * 5. * cos(uTime * 1.4), sin(0.88)) * 3.5 * amplitude);
    float specular = metaball(pos - s0, radius * 0.02) * metaball(pos - s1, radius * 0.08);
    c += specular * SpecularColor * uSpecularFactor;
    
     // Blur the edges
    float w = 0.05;
	if (r > boundary.x - w && r < boundary.x) {
		c = mix(line, boundaryColor, smoothstep(-w, 0.0, r - boundary.x));
        c.a = mix(0.0, 1.0, smoothstep(-w, 0.0, r - boundary.x));
	}
	if (r > boundary.y - w && r < boundary.y + w) {
		c.rgb = mix(boundaryColor.rgb, blobColor.rgb, smoothstep(-w, w, r - boundary.y));
	}

    c.rgb += noise2d(pos * 0.1) * 0.01;
    // Blob
    c.rgb = mix(line.rgb, c.rgb, c.a);
    // Line
    c.a = max(line.a, c.a);
    
    return c;
}

void main() {
	vec2 st = (gl_PointCoord - vec2(0.5, 0.5)) * 2.0; //[-1,1]
	vec4 fragColor;
	vec4 c = balloon(st, vec2(0.01, -0.4), vec2(0.01, 0.95), 0.15, vec4(vColor,1.0));
	fragColor.rgb = mix(vec3(0.), c.rgb, c.a);

    if(length(st)< .2) fragColor.rgb *= 1. * cos(st.y) * length(st);

    fragColor.rgb = pow(fragColor.rgb, vec3(1.0/2.2));
    float alpha = c.a * uAlpha;
	gl_FragColor = vec4(fragColor.rgb, alpha);
}