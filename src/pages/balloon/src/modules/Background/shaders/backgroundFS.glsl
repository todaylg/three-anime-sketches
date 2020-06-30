precision highp float;

varying vec2 vUv;

uniform vec3 uColor;
uniform float uColorOffset;
uniform vec2 uOffset;
uniform float uScale;

void main() {
	vec2 st = vUv;// [0,1]
  	vec3 p = vec3(st - vec2(0.5, 0.5), 0.0) * 2.;// [-1,1]
	p.x -= uOffset.x;
	p.y -= uOffset.y;
	vec3 color = uColor - uColorOffset * p.y;
	color *= 1.0 - uScale * length(p);
	gl_FragColor = vec4(color, 1.0);
}