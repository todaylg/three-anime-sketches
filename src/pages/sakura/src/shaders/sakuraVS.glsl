attribute vec3 aEuler;
attribute float aSize;

varying vec3 normX;
varying vec3 normY;
varying vec3 normZ;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
	gl_PointSize = aSize * (300.0 / - mvPosition.z);
	
	vPosition = vec3(mvPosition.xyz);
	// Caculate Normal
	vec3 elrsn = sin(aEuler);
 	vec3 elrcs = cos(aEuler);
 	mat3 rotx = mat3(
		1.0, 0.0, 0.0,
      0.0, elrcs.x, elrsn.x,
      0.0, -elrsn.x, elrcs.x
 	);
	mat3 roty = mat3(
      elrcs.y, 0.0, -elrsn.y,
      0.0, 1.0, 0.0,
      elrsn.y, 0.0, elrcs.y
	);
	mat3 rotz = mat3(
      elrcs.z, elrsn.z, 0.0, 
      -elrsn.z, elrcs.z, 0.0,
      0.0, 0.0, 1.0
	);
	mat3 rotmat = rotx * roty * rotz;
	vNormal = rotmat[2]; // [x,y,z]

	mat3 trrotm = mat3(
      rotmat[0][0], rotmat[1][0], rotmat[2][0],
      rotmat[0][1], rotmat[1][1], rotmat[2][1],
      rotmat[0][2], rotmat[1][2], rotmat[2][2]
 	);
 	normX = trrotm[0];
 	normY = trrotm[1];
 	normZ = trrotm[2];
}