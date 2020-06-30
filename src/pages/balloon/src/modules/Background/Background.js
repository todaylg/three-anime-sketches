import * as THREE from 'three';
import vertexShader from './shaders/backgroundVS.glsl';
import fragmentShader from './shaders/backgroundFS.glsl';

export default class Background {
	constructor(mainScene, uniforms = {}) {
		let { color, offset } = uniforms;
		this.uniforms = {
			uTime: {
				type: 'float',
				value: 0
			},
			uColor: {
				type: 'vec3',
				value: color || new THREE.Color(0x4c7497)
			},
			uColorOffset: {
				type: 'float',
				value: 0.1
			},
			uOffset: {
				type: 'vec2',
				value: offset || new THREE.Vector2(0.25)
			},
			uScale: {
				type: 'float',
				value: .25
			},
		};
		this.scene = mainScene.scene;
		this.plane = this.createObj();
	}

	get mesh() {
		return this.plane;
	}

	createObj() {
		let screenGeometry = new THREE.BufferGeometry();
		let posVertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
		let uvVertices = new Float32Array([0, 0, 2, 0, 0, 2]);
		screenGeometry.setAttribute('position', new THREE.BufferAttribute(posVertices, 3));
		screenGeometry.setAttribute('uv', new THREE.BufferAttribute(uvVertices, 2));
		let mesh = new THREE.Mesh(
			screenGeometry,
			new THREE.RawShaderMaterial({
				uniforms: this.uniforms,
				vertexShader,
				fragmentShader,
				side: THREE.FrontSide,
				depthTest: false,
				depthWrite: false
			})
		);
		this.scene.add(mesh);
		return mesh;
	}

	render(time) {
		this.uniforms.uTime.value += time;
	}
}
