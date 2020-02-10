/**
 * Usage:
	let blurPassX = (this.blurPassX = new ShaderPass(BlurPassShader));
	blurPassX.uniforms['resolution'].value = new THREE.Vector2(this.width, this.height);
	blurPassX.uniforms['direction'].value = new THREE.Vector2(0, 1);
	this.composer.addPass(blurPassX);
	let blurPassY = (this.blurPassY = new ShaderPass(BlurPassShader));
	blurPassY.uniforms['resolution'].value = new THREE.Vector2(this.width, this.height);
	blurPassY.uniforms['direction'].value = new THREE.Vector2(1, 0);
	this.composer.addPass(blurPassY);
 */

import * as THREE from 'three';
import blurVS from './shaders/blurVS';
import blurFS from './shaders/blurFS';

const BlurPassShader = {	
	uniforms: {
		tDiffuse: { value: null },
		resolution: { value: new THREE.Vector2() },
		direction: { value: new THREE.Vector2() },
	},
	vertexShader: blurVS,
	fragmentShader: blurFS
};
 
 export { BlurPassShader };
 