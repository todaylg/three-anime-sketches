import * as THREE from 'three';
import vertexShader from './shaders/titleVS.glsl';
import fragmentShader from './shaders/titleFS.glsl';
import { isMobile } from 'JS/Utils';
import { titleSrc } from '../../const/config';

export default class Title {
	constructor(mainScene) {
		this.uniforms = {
			time: {
				type: 'f',
				value: 0
			},
			texture: {
				type: 't',
				value: null
			}
		};
		this.obj;
		this.isLoaded = false;
		this.scene = mainScene.scene;
		this.width = mainScene.width;
		this.height = mainScene.height;
		this.isMobile = mainScene.isMobile;
		this.loadTexture();
		this.obj = this.createObj();
	}

	get mesh(){
		return this.obj;
	}

	loadTexture() {
		const loader = new THREE.TextureLoader();
		loader.load(titleSrc, texture => {
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.NearestFilter;
			this.uniforms.texture.value = texture;
			this.isLoaded = true;
		});
	}

	createObj() {
		let mesh = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(64, 16, 16, 4),
			new THREE.RawShaderMaterial({
				uniforms: this.uniforms,
				vertexShader,
				fragmentShader,
				transparent: true
			})
		);
		if(this.isMobile){
			// Todo
			mesh.scale.setScalar(this.width/1024/4);
		}else{
			mesh.scale.setScalar(this.width/1024/5);
		}
		this.scene.add(mesh);
		return mesh;
	}

	render(time) {
		if (!this.isLoaded) return;
		this.uniforms.time.value += time;
	}
}
