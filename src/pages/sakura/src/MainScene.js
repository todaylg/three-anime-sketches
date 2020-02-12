import * as THREE from "three";
import Sakura from "./js/Sakura";
import Megumi from "./js/Megumi";
// Post-Processing
import { EffectComposer } from "LIB/threejs/postprocessing/EffectComposer";
import { RenderPass } from "LIB/threejs/postprocessing/RenderPass";
import { ShaderPass } from "LIB/threejs/postprocessing/ShaderPass";
import { UnrealBloomPass } from "LIB/threejs/postprocessing/UnrealBloomPass";
import { VignetteShader } from "LIB/threejs/shaders/VignetteShader";
// Utils
import { getEleWidth, getEleHeight, isMobile } from 'JS/Utils';
import TWEEN from 'LIB/threejs/libs/tween.module.min';
// Test
import { GUI } from 'LIB/threejs/libs/dat.gui.module.js';

export default class MainScene {
	constructor(container, callback) {
		this.container = container;
		this.width = getEleWidth(container);
		this.height = getEleHeight(container);
		this.clock = new THREE.Clock();
		this.debug = true;
		this.isMobile = isMobile();

		// Camera
		const camera = (this.camera = new THREE.PerspectiveCamera(
			45,
			this.width / this.height,
			1,
			500
		));
		camera.position.set(0, 0, 10);

		// Renderer
		const renderer = (this.renderer = new THREE.WebGLRenderer({
			antialias: false
		}));
		renderer.domElement.id = 'canvasWebGL';
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(this.width, this.height);
		renderer.gammaFactor = 2.2;
		renderer.setClearColor(0xffffff, 1.0);
		container.appendChild(renderer.domElement);
		// Scene
		this.initScene(callback);
	}

	initScene(callback) {
		const scene = (this.scene = new THREE.Scene());
		this.sakura = new Sakura(this);
		this.megumi = new Megumi(this);
		this.megumi.loadTexture().then(() => {
			this.initPostProcessing();
			if (this.debug) this.initGUI();
			this.initEntryAnime();
			this.animete();
			this.initEvents();
			typeof callback === 'function' && callback();
		});
	}

	initPostProcessing() {
		this.composer = new EffectComposer(this.renderer);
		this.composer.addPass(new RenderPass(this.scene, this.camera));
		// Strength, Radius, Threshold
		let bloomPass = (this.bloomPass = new UnrealBloomPass(new THREE.Vector2(this.width, this.height)));
		bloomPass.strength = 5;
		bloomPass.radius = 0.5;
		bloomPass.threshold = 0.995;
		this.composer.addPass(bloomPass);
		// Offset、Darkness
		let vignettePass = (this.vignettePass = new ShaderPass(VignetteShader));
		vignettePass.uniforms['offset'].value = 1000;
		vignettePass.uniforms['darkness'].value = 20;
		this.composer.addPass(vignettePass);
	}

	initGUI(){
		let gui = new GUI();
		let sakura = this.sakura;
		let sakuraMaterial = sakura.mesh.material;
		let params = {
			// Sakura
			sakuraTopColor: sakuraMaterial.uniforms.topColor.value.getHex(),
			sakuraBottomColor: sakuraMaterial.uniforms.bottomColor.value.getHex(),
			sakuraLightColor: sakura.directionalLight.lightColor.getHex(),
			sakuraLightDiffuse: sakura.directionalLight.diffuseFactor,
			sakuraLightSpecular: sakura.directionalLight.specularFactor,
			// PP
			vignetteOffset: 1.2,
			vignetteDarkness: 1,
			bloomStrength: 0.4,
			bloomRadius: 0.5,
			bloomThreshold: 0.995
		};
		gui.close();
		// Sakura
		const sakuraFolder = gui.addFolder('Sakura');
		sakuraFolder
			.addColor(params, 'sakuraTopColor')
			.name('topColor')
			.onChange(value => {
				sakuraMaterial.uniforms.topColor.value.setHex(value);
			});
		sakuraFolder
			.addColor(params, 'sakuraBottomColor')
			.name('bottomColor')
			.onChange(value => {
				sakuraMaterial.uniforms.bottomColor.value.setHex(value);
			});
		sakuraFolder
			.addColor(params, 'sakuraLightColor')
			.name('lightColor')
			.onChange(value => {
				sakura.directionalLight.lightColor.setHex(value);
			});
		sakuraFolder
			.add(params, 'sakuraLightDiffuse', 0, 5)
			.name('diffuseFoctor')
			.onChange(value => {
				sakura.directionalLight.diffuseFactor = value;
			});
		sakuraFolder
			.add(params, 'sakuraLightSpecular', 0, 10)
			.name('specularFoctor')
			.onChange(value => {
				sakura.directionalLight.specularFactor = value;
			});
		// PP
		const ppFolder = gui.addFolder('Post-processing');
		ppFolder
			.add(params, 'vignetteOffset', 0, 5)
			.step(0.01)
			.onChange(value => {
				this.vignettePass.uniforms.offset.value = value;
			});
		ppFolder
			.add(params, 'vignetteDarkness', 0, 5)
			.step(0.01)
			.onChange(value => {
				this.vignettePass.uniforms.darkness.value = value;
			});
		ppFolder
			.add(params, 'bloomStrength', 0, 1)
			.step(0.01)
			.onChange(value => {
				this.bloomPass.strength = value;
			});
		ppFolder
			.add(params, 'bloomRadius', 0, 1)
			.step(0.01)
			.onChange(value => {
				this.bloomPass.radius = value;
			});
		ppFolder
			.add(params, 'bloomThreshold', 0, 1)
			.step(0.01)
			.onChange(value => {
				this.bloomPass.threshold = value;
			});
		ppFolder.close();
	}

	initEntryAnime() {
		new TWEEN.Tween(this.bloomPass)
			.to({ strength: 0.4 }, 1500)
			.delay(800)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();
		new TWEEN.Tween(this.vignettePass.uniforms.darkness)
			.to({ value: 1 }, 1500)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();
		new TWEEN.Tween(this.vignettePass.uniforms.offset)
			.to({ value: 1.2 }, 1500)
			.easing(TWEEN.Easing.Exponential.InOut)
			.onComplete(() => {
				this.enableTitleShowing = true;
			})
			.start();
	}

	initEvents() {
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
	}

	onWindowResize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		if (this.megumi) this.megumi.onResize();
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		if (this.composer) this.composer.setSize(this.width, this.height);
	}

	animete() {
		const time = this.clock.getDelta();
		this.sakura.render(time);
		TWEEN.update();
		this.composer.render();
		requestAnimationFrame(this.animete.bind(this));
	}
}