precision highp float;

varying vec3 normX;
varying vec3 normY;
varying vec3 normZ;
varying vec3 vNormal;
varying vec3 vPosition;

float rstop = 0.1;
float pAlpha = 1.0;

uniform vec3 ambientLightColor;
uniform float ambientStrength;

struct DirectionalLight {
    vec3 target;
    vec3 lightColor;
    vec3 lightPos;
    float diffuseFactor;
    float specularFactor;
};

uniform DirectionalLight directionalLight;

// pos orign r.ab
float ellipse(vec2 p, vec2 o, vec2 r) { 
    vec2 lp = (p - o) / r;
    return length(lp) - 1.0;
}

vec3 CalcDirLight(DirectionalLight light, vec3 normal, vec3 ambient)
{
    vec3 lightDir = normalize(light.lightPos - light.target);
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 halfwayDir = normalize(lightDir + viewDir);
    // diffuse
    vec3 diffuse = light.diffuseFactor  * max(dot(normal, lightDir),0.0) * light.lightColor;
    // specular
    float spec = pow(max(dot(normal, halfwayDir), 0.0), 32.0);
    vec3 specular = light.specularFactor * spec * light.lightColor; 

    return (ambient + diffuse + specular);
}

void main() {
	vec3 p = vec3(gl_PointCoord - vec2(0.5, 0.5), 0.0) * 2.0;
	vec3 d = vec3(0.0, 0.0, -1.0);
	float nd = normZ.z; //dot(-normZ, d);
	if(abs(nd) < 0.0001) discard;

	float np = dot(normZ, p);
    vec3 tp = p + d * np / nd;//dot(-normZ, d) / dot(-normZ, p);
	// Back 2D 
 	vec2 coord = vec2(dot(normX, tp), dot(normY, tp));

	// angle = 15 degree
	const float flwrsn = 0.258819045102521;
	const float flwrcs = 0.965925826289068;
	mat2 flwrm = mat2(flwrcs, -flwrsn, flwrsn, flwrcs);
	// abs => double [0,1]
	vec2 flwrp = vec2(abs(coord.x), coord.y) * flwrm;
	float r;
	if(flwrp.x < 0.0) {
	// middle part(double)
		r = ellipse(flwrp, vec2(0.065, 0.024) * 0.5, vec2(0.36, 0.96) * 0.5);
	} else {
		// out part(double)
		r = ellipse(flwrp, vec2(0.065, 0.024) * 0.5, vec2(0.58, 0.96) * 0.5);
	}
	if(r > rstop) discard;
    // r = ellipse(flwrp, vec2(0.250,0.440), vec2(0.140,0.190));
    vec3 col = mix(vec3(1.0, 0.8, 0.75), vec3(1.0, 0.9, 0.87), r);
    
	float grady = mix(0.0, 1.0, pow(coord.y * 0.5 + 0.5, 0.35));
  	col *= vec3(1.0, grady, grady);
	col *= mix(0.8, 1.0, pow(abs(coord.x), 0.3));
    
	float alpha = (0.5 - r / (rstop * 1.0));
	alpha = smoothstep(0.0, 1.0, alpha) * pAlpha;
    
	vec3 baseColor = col*0.5;
	vec3 ambient = ambientStrength * ambientLightColor;
    vec3 normal = normalize(vNormal);
	vec3 result = CalcDirLight(directionalLight, normal, ambient) * baseColor;
	gl_FragColor = vec4(result, alpha);
}