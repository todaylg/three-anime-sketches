import * as THREE from 'three';
import Particle from './Particle';
import vertexShader from './shaders/balloonVS.glsl';
import fragmentShader from './shaders/balloonFS.glsl';
import noise from './assets/noise.png';
import { symmetryRandom } from 'JS/Math';

export default class Bubbles {
	constructor(mainScene) {
		this.scene = mainScene.scene;
		this.deltaTime = 0;
		this.particleControl = {
			particleNum: 25,
			area: [20.0, 20.0, 10.0]
		};
		// Data
		this.geometry = new THREE.BufferGeometry();
		this.positions = new Float32Array(this.particleControl.particleNum * 3);
		this.colors = new Float32Array(this.particleControl.particleNum * 3);
		this.sizes = new Float32Array(this.particleControl.particleNum);
		this.miscs = new Float32Array(this.particleControl.particleNum * 3);
		this.initParticle();
	}

	initParticle() {
		let { particleControl } = this;
		let { particleNum, area } = particleControl;
		particleControl.particles = new Array(particleNum);
		let tempVec3 = new THREE.Vector3();
		let tempVelocity = 0;
		for (let i = 0; i < particleNum; i++) {
			particleControl.particles[i] = new Particle();
			let particle = particleControl.particles[i];
			// Init Transform
			tempVec3.x = symmetryRandom() * 0.1;
			tempVec3.y = symmetryRandom() * 0.1 - 1.0;
			tempVec3.z = symmetryRandom() * 0.3;
			tempVec3.normalize();
			tempVelocity = -1 + Math.random() * -5;
			tempVec3.multiplyScalar(tempVelocity);
			// Velocity
			particle.setVelocity(tempVec3.x, tempVec3.y, tempVec3.z);
			// Position
			particle.setPosition(symmetryRandom() * area[0], symmetryRandom() * area[1], symmetryRandom() * area[2]/2);
			// Size
			particle.setSize(4 + Math.random() * 1);
		}
		// Attributes
		this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
		this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
		this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
		this.geometry.setAttribute('miscs', new THREE.BufferAttribute(this.miscs, 3));
		// Uniforms
		let noiseTexture = new THREE.TextureLoader().load(noise, texture =>{
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
		});
		this.uniforms = {
			far: {
				type: 'float',
				value: area[2]
			},
			uTime: {
				type: 'float',
				value: 0
			},
			tNoise: {
				type: 'sampler2D',
				value: noiseTexture
			},
			uSpecularFactor: {
				type: 'float',
				value: 1
			},
			uAlpha: {
				type: 'float',
				value: 1
			},
			uDOF: {
				type: 'vector3',
				value: new THREE.Vector3(10.0, 4.0, 8.0)
			},
		};
		this.points = new THREE.Points(
			this.geometry,
			new THREE.ShaderMaterial({
				uniforms: this.uniforms,
				vertexShader,
				fragmentShader,
				blending: THREE.CustomBlending,
				side: THREE.FrontSide,
				depthWrite: false,
				extensions: {
					derivatives: true,
				}
			})
		);
		this.scene.add(this.points);
	}

	// Cycle Position
	repeatPos(particle, area) {
		for (let index = 0; index < 3; index++) {
			let limit = area[index];
			if (Math.abs(particle.position[index]) - particle.size * 0.5 > limit) {
				if(index === 2) return;
				// Out Of Area
				if (particle.position[index] > 0){
					particle.position[index] -= 2. * limit;
				}else{
					particle.position[index] += 2. * limit;
				}
				// X
				if(index === 0){
					particle.position[1] = -limit + particle.size;
				}
				particle.position[2] = 0;
			}
		}
	}

	renderParticle() {
		let { particleNum, area, particles } = this.particleControl;
		// Update Data
		for (let i = 0; i < particleNum; i++) {
			let particle = particles[i];
			particle.update(this.deltaTime);
			this.repeatPos(particle, area);
			// Position
			this.positions[i * 3] = particle.position[0];
			this.positions[i * 3 + 1] = particle.position[1];
			this.positions[i * 3 + 2] = particle.position[2];
			// Size
			this.sizes[i] = particle.size;
			// Color
			this.colors[i * 3] = particle.color[0];
			this.colors[i * 3 + 1] = particle.color[1];
			this.colors[i * 3 + 2] = particle.color[2];
			// Misc
			this.miscs[i * 3] = particle.misc[0];
			this.miscs[i * 3 + 1] = particle.misc[1];
			this.miscs[i * 3 + 2] = particle.misc[2];
		}
		this.geometry.attributes['position'].needsUpdate = true;
		this.geometry.attributes['aSize'].needsUpdate = true;
	}

	get mesh(){
		return this.points;
	}

	render(time) {
		this.deltaTime = time;
		this.uniforms.uTime.value += time;
		this.renderParticle();
	}
}
