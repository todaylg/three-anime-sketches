<template>
	<div id="wrapper" class="isLoading">
		<div id="canvasContainer"></div>
		<div class="animeName">冴えない彼女の育てかた</div>
		<div class="scrollNextIcon">
			<div><span @click="toPrePage()"></span></div>
		</div>
		<p class="loadingText">Loading...</p>
	</div>
</template>

<script>
import MainScene from './src/MainScene.js';
export default {
	name: 'container',
	mounted() {
		let containerEle = document.querySelector('#canvasContainer');
		this.scene = new MainScene(containerEle, () => {
			document.querySelector('#wrapper').classList.remove('isLoading');
		});
	},
	methods: {
		toPrePage(){
			window.location.href = './index';
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
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;
	background: #000000;
}

#canvasContainer {
	width: 100%;
	height: 100%;
}

.isLoading{
	.loadingText {
		letter-spacing: 10px;
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

.loadingText {
    position: absolute;
    z-index: 1;
    width: 100%;
    top: calc(50% - 50px);
    text-align: center;
    letter-spacing: 11px;
    color: #fff;
    opacity: 0;
    transition: opacity .5s ease-out, letter-spacing .5s ease-out;
    pointer-events: none;
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
	transition-delay: 1.5s;
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
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	opacity: 1;
	transition: opacity 1s ease-out;
	transition-delay: 1.5s;
	div {
		span {
			position: absolute;
			top: 0;
			left: 50%;
			width: 24px;
			height: 24px;
			margin-left: 12px;
			border-left: 1px solid rgba(0, 0, 0, 1);
			border-bottom: 1px solid rgba(0, 0, 0, 1);
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
