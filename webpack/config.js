const path = require('path');
const utils = require('./utils');

// Port
const DEF_PORT = '8080';
const URL_PREFIX = '/three-anime-sketches/';
const PORT = process.env.PORT || DEF_PORT;

// Path
const ENV = (process.env.NODE_ENV || 'production').trim();
const isProduction = ENV === 'production';
const BASE_PATH = path.dirname(__dirname);
const SRC_PATH = path.resolve(BASE_PATH, 'src');

module.exports = {
	env: ENV,
	isProduction: isProduction,
	port: PORT,
	publicPath: URL_PREFIX,
	// Alias
	alias: {
		'@': path.join(SRC_PATH),
		LIB: path.join(SRC_PATH, 'libs'),
		COMMON: path.join(SRC_PATH, 'common'),
		IMG: path.join(SRC_PATH, 'common', 'images'),
		CSS: path.join(SRC_PATH, 'common', 'style'),
		JS: path.join(SRC_PATH, 'common', 'js'),
		COMPONENTS: path.join(SRC_PATH, 'common', 'components')
	},
	// Pages
	pages: utils.getPages({
		jsEntryPath: path.join(SRC_PATH, 'pages/'),
		jsEntryPatterns: [`/*/app/index.js`, `/*/index.js`],
		htmlEntryPath: path.join(SRC_PATH, 'pages/'),
		htmlEntryPatterns: [`/*/views/*.html`, `/*/index.html`]
	}),
	path: {
		src: SRC_PATH
	}
};
