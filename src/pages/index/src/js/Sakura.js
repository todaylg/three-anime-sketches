import * as THREE from 'three';
import Particle from './Particle';
import vertexShader from '../shaders/sakuraVS.glsl';
import fragmentShader from '../shaders/sakuraFS.glsl';

const PI2 = Math.PI * 2.0;
function symmetryRandom() {
	return Math.random() * 2.0 - 1.0;
}

export default class Sakura {
	constructor(mainScene) {
		this.scene = mainScene.scene;
		this.deltaTime = 0;
		this.particleControl = {
			particleNum: 500,
			area: [20.0, 20.0, 50.0]
		};
		// Data
		this.geometry = new THREE.BufferGeometry();
		this.positions = new Float32Array(this.particleControl.particleNum * 3);
		this.eulers = new Float32Array(this.particleControl.particleNum * 3);
		this.sizes = new Float32Array(this.particleControl.particleNum);
		this.directionalLight = {
			lightPos: new THREE.Vector3(-1, 1, 0),
			target: new THREE.Vector3(0, 0, 0),
			lightColor: new THREE.Color(0xffffff),
			diffuseFactor: 2.5,
			specularFactor: 6
		};
		this.initParticle();
	}

	get mesh(){
		return this.points;
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
			tempVec3.x = symmetryRandom() * 0.3 + 0.8;
			tempVec3.y = symmetryRandom() * 0.2 - 1.0;
			tempVec3.z = symmetryRandom() * 0.3 + 0.5;
			tempVec3.normalize();
			tempVelocity = 5.0 + Math.random() * 1.0;
			tempVec3.multiplyScalar(tempVelocity);
			// Velocity
			particle.setVelocity(tempVec3.x, tempVec3.y, tempVec3.z);
			// Rotation
			particle.setRotation(
				symmetryRandom() * PI2 * 0.5,
				symmetryRandom() * PI2 * 0.5,
				symmetryRandom() * PI2 * 0.5
			);
			// Position
			particle.setPosition(symmetryRandom() * area[0], symmetryRandom() * area[1], symmetryRandom() * area[2]);
			// Euler
			particle.setEulerAngles(
				Math.random() * Math.PI * 2.0,
				Math.random() * Math.PI * 2.0,
				Math.random() * Math.PI * 2.0
			);
			// Size
			particle.setSize(4 + Math.random() * 1);
		}
		// Attributes
		this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
		this.geometry.setAttribute('aEuler', new THREE.BufferAttribute(this.eulers, 3));
		this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
		// Uniforms
		this.uniforms = {
			far: {
				type: 'f',
				value: area[2]
			},
			topColor: { value: new THREE.Color(1.0, 0.8, 0.75) },
			bottomColor: { value: new THREE.Color(1.0, 0.9, 0.87) },
			ambientLightColor: { value: new THREE.Color(0xffffff) },
			ambientStrength: { value: 2 },
			directionalLight: { value: this.directionalLight }
		};
		this.points = new THREE.Points(
			this.geometry,
			new THREE.ShaderMaterial({
				uniforms: this.uniforms,
				vertexShader,
				fragmentShader
			})
		);
		this.scene.add(this.points);
	}

	// Cycle Position
	repeatPos(particle, area) {
		for (let index = 0; index < 3; index++) {
			let limit = area[index];
			if (Math.abs(particle.position[index]) - particle.size * 0.5 > limit) {
				// Out Of Area
				if (particle.position[index] > 0) {
					particle.position[index] -= limit * 2.0;
				} else {
					particle.position[index] += limit * 2.0;
				}
			}
		}
	}

	// Cycle Euler
	repeatEuler(particle) {
		for (let index = 0; index < 3; index++) {
			particle.euler[index] = particle.euler[index] % PI2;
			if (particle.euler[index] < 0.0) {
				particle.euler[index] += PI2;
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
			this.repeatEuler(particle);
			// Position
			this.positions[i * 3] = particle.position[0];
			this.positions[i * 3 + 1] = particle.position[1];
			this.positions[i * 3 + 2] = particle.position[2];
			// Rotation
			this.eulers[i * 3] = particle.euler[0];
			this.eulers[i * 3 + 1] = particle.euler[1];
			this.eulers[i * 3 + 2] = particle.euler[2];
			// Size
			this.sizes[i] = particle.size;
		}
		this.geometry.attributes['position'].needsUpdate = true;
		this.geometry.attributes['aEuler'].needsUpdate = true;
		this.geometry.attributes['aSize'].needsUpdate = true;
	}

	render(time) {
		this.deltaTime = time;
		this.renderParticle();
	}
}
