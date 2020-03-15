import * as THREE from 'three';
import Background from './modules/Background/Background';
import Balloons from './modules/Balloons/Balloons';
import Title from './modules/Title/Title';
// Control
import { OrbitControls } from 'LIB/threejs/controls/OrbitControls';
// Post-Processing
import { EffectComposer } from 'LIB/threejs/postprocessing/EffectComposer';
import { RenderPass } from 'LIB/threejs/postprocessing/RenderPass';
import { ShaderPass } from 'LIB/threejs/postprocessing/ShaderPass';
import { VignetteShader } from 'LIB/threejs/shaders/VignetteShader';
import { BlurPassShader } from 'COMMON/modules/BlurPass/BlurPassShader';
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
		const camera = (this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 500));
		this.initCameraYPos = 0;
		camera.position.set(0, this.initCameraYPos, 20);
		
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

		this.initControl();
		// Scene
		this.initScene(callback);
	}

	initEntryAnime() {
		// Todo:
		// new TWEEN.Tween(this.camera.position)
		// .to({ y: 0 }, 10000)
		// .onUpdate((value) => {
		// 	this.control.target.y = value.y;
		// })
		// .easing(TWEEN.Easing.Exponential.InOut)
		// .start();
	}

	initControl() {
		this.control = new OrbitControls(this.camera, this.container);
		this.control.target.y = this.initCameraYPos;
		this.control.enableZoom = false;
		this.control.enablePan = false;
		// Horizontal
		this.control.minAzimuthAngle = -Math.PI / 6;
		this.control.maxAzimuthAngle = Math.PI / 6;
		// Vertical
		this.control.minPolarAngle = Math.PI / 2;
		this.control.maxPolarAngle = Math.PI / 2;
		this.control.rotateSpeed = 0.1;
	}

	initScene(callback) {
		const scene = (this.scene = new THREE.Scene());
		this.background = new Background(this);
		this.balloons = new Balloons(this);
		this.title = new Title(this);
		this.title.mesh.position.y = this.initCameraYPos;
		this.initPostProcessing();
		if (this.debug) this.initGUI();
		this.initEvents();
		this.animete();
		typeof callback === 'function' && callback();
	}

	initPostProcessing() {
		this.composer = new EffectComposer(this.renderer);
		this.composer.addPass(new RenderPass(this.scene, this.camera));

		// Blur
		let blurPassX = (this.blurPassX = new ShaderPass(BlurPassShader));
		blurPassX.uniforms['resolution'].value = new THREE.Vector2(this.width, this.height);
		blurPassX.uniforms['direction'].value = new THREE.Vector2(0, 1);
		this.composer.addPass(blurPassX);
		let blurPassY = (this.blurPassY = new ShaderPass(BlurPassShader));
		blurPassY.uniforms['resolution'].value = new THREE.Vector2(this.width, this.height);
		blurPassY.uniforms['direction'].value = new THREE.Vector2(1, 0);
		this.composer.addPass(blurPassY);

		// Vignette
		let vignettePass = (this.vignettePass = new ShaderPass(VignetteShader));
		vignettePass.uniforms['offset'].value = 1;
		vignettePass.uniforms['darkness'].value = 1;
		this.composer.addPass(vignettePass);
	}

	initGUI() {
		let gui = new GUI();
		let bgMaterial = this.background.mesh.material;
		let balloonMaterial = this.balloons.mesh.material;
		let params = {
			bgColor: bgMaterial.uniforms.uColor.value.getHex(),
			bgColorOffset: bgMaterial.uniforms.uColorOffset.value,
			bgCenterX: bgMaterial.uniforms.uOffset.value.x,
			bgCenterY: bgMaterial.uniforms.uOffset.value.y,
			bgScale: bgMaterial.uniforms.uScale.value,
			// Balloons
			specularFactor: balloonMaterial.uniforms.uSpecularFactor.value,
			balloonAlpha: balloonMaterial.uniforms.uAlpha.value,
			// PP
			vignetteOffset: this.vignettePass.uniforms.offset.value,
			vignetteDarkness: this.vignettePass.uniforms.darkness.value
		};
		gui.close();
		// Background
		const bgFolder = gui.addFolder('Background');
		bgFolder
			.addColor(params, 'bgColor')
			.name('color')
			.onChange(value => {
				bgMaterial.uniforms.uColor.value.setHex(value);
			});
		bgFolder
			.add(params, 'bgColorOffset', 0, 1)
			.step(0.01)
			.name('colorOffset')
			.onChange(value => {
				bgMaterial.uniforms.uColorOffset.value = value;
			});
		bgFolder
			.add(params, 'bgCenterX', -1, 1)
			.step(0.01)
			.name('centerX')
			.onChange(value => {
				bgMaterial.uniforms.uOffset.value.x = value;
			});
		bgFolder
			.add(params, 'bgCenterY', -1, 1)
			.step(0.01)
			.name('centerY')
			.onChange(value => {
				bgMaterial.uniforms.uOffset.value.y = value;
			});
		bgFolder
			.add(params, 'bgScale', 0, 2)
			.step(0.01)
			.name('scale')
			.onChange(value => {
				bgMaterial.uniforms.uScale.value = 1 / value;
			});
		bgFolder.close();
		// Balloons
		const BalloonFolder = gui.addFolder('Balloons');
		BalloonFolder.add(params, 'specularFactor', 0, 1)
			.step(0.01)
			.name('specular')
			.onChange(value => {
				balloonMaterial.uniforms.uSpecularFactor.value = value;
			});
		BalloonFolder.add(params, 'balloonAlpha', 0, 1)
			.step(0.01)
			.name('alpha')
			.onChange(value => {
				balloonMaterial.uniforms.uAlpha.value = value;
			});
		BalloonFolder.close();
		// PP
		const ppFolder = gui.addFolder('Post-processing');
		ppFolder
			.add(params, 'vignetteOffset', 0, 5)
			.step(0.01)
			.name('offset')
			.onChange(value => {
				this.vignettePass.uniforms.offset.value = value;
			});
		ppFolder
			.add(params, 'vignetteDarkness', 0, 5)
			.step(0.01)
			.name('darkness')
			.onChange(value => {
				this.vignettePass.uniforms.darkness.value = value;
			});
		ppFolder.close();
	}

	initEvents() {
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
	}

	onWindowResize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		if (this.composer) this.composer.setSize(this.width, this.height);
	}

	animete() {
		const time = this.clock.getDelta();
		this.background.render(time);
		this.balloons.render(time);
		this.title.render(time/1.2);
		this.control.update();
		TWEEN.update();
		this.composer.render();
		requestAnimationFrame(this.animete.bind(this));
	}
}
