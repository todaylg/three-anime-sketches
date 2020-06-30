attribute float aSize;
attribute vec3 color;
attribute vec3 miscs;

varying vec3 vPosition;
varying vec3 vColor;
varying vec3 vMiscs;

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
	gl_PointSize = aSize * (1000.0 / - mvPosition.z);
	
	vPosition = vec3(mvPosition.xyz);
	vColor = color;
	vMiscs = miscs;
}