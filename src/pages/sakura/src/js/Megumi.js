import * as THREE from 'three';
import vertexShader from '../shaders/backgroundVS.glsl';
import fragmentShader from '../shaders/backgroundFS.glsl';
import { isMobile } from 'JS/Utils';
const imgSrc = require('../images/megumi.png');
const imgSPSrc = require('../images/megumi_sp.png');

export default class Megumi {
	constructor(mainScene) {
		this.isMobile = mainScene.isMobile;
		this.scene = mainScene.scene;
		this.obj = null;
	}

	loadTexture() {
		const loader = new THREE.TextureLoader();
		let src = imgSrc;
		if (this.isMobile) src = imgSPSrc;
		return new Promise(resolve => {
			loader.load(src, texture => {
				texture.format = THREE.RGBAFormat;
				texture.needsUpdate = true;
				this.texture = texture;
				this.obj = this.createObj();
				resolve(texture);
			});
		});
	}

	onResize() {
		const textureWidth = this.texture.image.width;
		const textureHeight = this.texture.image.height;
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		let ratio = {};
		ratio.x = windowWidth / textureWidth;
		ratio.y = windowHeight / textureHeight;
		this.mesh.material.uniforms.uRatio.value = new THREE.Vector2(ratio.x, ratio.y);
	}
	
	createObj() {
		let texture = this.texture;
		this.material = new THREE.ShaderMaterial({
			type: 'BackgroundMaterial',
			uniforms: {
				uvTransform: { value: new THREE.Matrix3() },
				t2D: { value: null },
				uRatio: { value: new THREE.Vector2(1) }
			},
			vertexShader,
			fragmentShader,
			side: THREE.FrontSide,
			blending: THREE.CustomBlending
		});
		let planeMesh = (this.mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.material));
		this.onResize();
		planeMesh.geometry.deleteAttribute('normal');
		planeMesh.material.uniforms.t2D.value = texture;
		planeMesh.material.uniforms.uvTransform.value.copy(texture.matrix);
		this.scene.add(planeMesh);
		return planeMesh;
	}
}
