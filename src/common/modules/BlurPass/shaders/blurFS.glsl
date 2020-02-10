uniform vec2 resolution;
uniform sampler2D tDiffuse;
uniform vec2 direction;

varying vec2 vUv;

#pragma glslify: blur3 = require('glsl-fast-gaussian-blur/5')

void main() {
   gl_FragColor = blur3(tDiffuse, vUv, resolution, direction);
}