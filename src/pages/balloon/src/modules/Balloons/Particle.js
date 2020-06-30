export default class Particle {
	constructor() {
		this.velocity = new Array(3);
		this.position = new Array(3);
		this.size = 1.0;
		this.color = [0.2+Math.random()*0.8, 0.2+Math.random()*0.8, 0.2+Math.random()*0.8];
		this.alpha = 1.0;
		this.misc = [Math.random(), Math.random(), Math.random()];
	}

	setVelocity(vx, vy, vz) {
		this.velocity[0] = vx;
		this.velocity[1] = vy;
		this.velocity[2] = vz;
	}

	setPosition(nx, ny, nz) {
		this.position[0] = nx;
		this.position[1] = ny;
		this.position[2] = nz;
	}

	setSize(s) {
		this.size = s;
	}
	
	update(dt) {
		this.position[0] += this.velocity[0] * dt;
		this.position[1] += this.velocity[1] * dt;
		this.position[2] += this.velocity[2] * dt;
	}
}
