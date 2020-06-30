import Vue from 'vue';
import App from './index.vue';
import VueObserveVisibility from 'vue-observe-visibility';

Vue.use(VueObserveVisibility);

new Vue({
	render: h => h(App)
}).$mount('#container');
