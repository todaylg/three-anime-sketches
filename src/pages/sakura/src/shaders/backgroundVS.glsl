varying vec2 vUv;
uniform mat3 uvTransform;
uniform vec2 uRatio;

void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	vec2 screenPos = position.xy;
	// 还原比例
	screenPos.x /= uRatio.x;
	screenPos.y /= uRatio.y;
	float scale = max(uRatio.x, uRatio.y);
	screenPos *= scale;
	gl_Position = vec4( screenPos, 0.9, 1.0 );
}