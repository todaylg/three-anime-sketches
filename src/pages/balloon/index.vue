<template>
	<div id="wrapper" :class="{ isLoading }">
		<div id="canvasContainer"></div>
		<div class="animeName">たまこラブストーリー</div>
		<div class="scrollNextIcon">
			<div><span @click="toNextPage()"></span></div>
		</div>
		<p class="loadingText">Loading...</p>
		<div class="preloadMask"></div>
	</div>
</template>

<script>
import MainScene from './src/MainScene.js';
import { preLoadimages } from 'JS/Utils';

export default {
	name: 'container',
	data() {
		return {
			isLoading: true,
		};
	},
	mounted() {
		let containerEle = document.querySelector('#canvasContainer');
		this.scene = new MainScene(containerEle);
		this.isLoading = false;
		this.scene.initEntryAnime();
	},
	methods: {
		toNextPage(){
			window.location.href = '/three-anime-sketches/index/';
		}
	}
};
</script>

<style lang="less">
html,
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	background: #000000;
}

#wrapper {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#wrapper {
	min-height: 100vh;
	position: relative;
	overflow-x: hidden;
	background: #000000;
}

#canvasContainer {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

.preloadMask {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: #000000;
	pointer-events: none;
	opacity: 0;
	transition: opacity 1s ease-out;
}

.loadingText {
	position: absolute;
	z-index: 1;
	width: 100%;
	top: calc(50% - 50px);
	text-align: center;
	letter-spacing: 11px;
	color: #fff;
	opacity: 0;
	transition: opacity 0.5s ease-out, letter-spacing 0.5s ease-out;
	pointer-events: none;
}

.isLoading {
	.loadingText {
		letter-spacing: 10px;
		opacity: 1;
	}
	.preloadMask {
		opacity: 1;
	}
	.animeName{
		opacity: 0;
		top: -20px;
	}
	.scrollNextIcon{
		opacity: 0;
	}
}

.animeName {
	position: fixed;
	font-size: 12px;
	padding: 1px 0px;
	position: absolute;
	top: 20px;
	left: 20px;
	color: #cfcfcf;
	opacity: 1;
	transition: all 1s ease-out;
	&::before {
		content: '';
		position: absolute;
		top: -1px;
		left: 0;
		background: #cfcfcf;
		width: 100%;
		height: 1px;
	}
	&::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		background: #cfcfcf;
		width: 100%;
		height: 1px;
	}
}
.scrollNextIcon {
	position: fixed;
	left: 0px;
	top: 50%;
	transform: translateY(-50%);
	opacity: 1;
	transition: opacity 1s ease-out;
	transition-delay: 1s;
	div {
		span {
			position: absolute;
			top: 0;
			left: 50%;
			width: 24px;
			height: 24px;
			margin-left: 12px;
			border-left: 1px solid rgba(255, 255, 255, 0.5);
			border-bottom: 1px solid rgba(255, 255, 255, 0.5);
			transform: rotate(45deg);
			animation: blinkAnime 2s infinite;
			opacity: 0;
			box-sizing: border-box;
			cursor: pointer;
			&:nth-of-type(1) {
				-webkit-animation-delay: 0s;
				animation-delay: 0s;
			}
		}
	}
}

@keyframes blinkAnime {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
