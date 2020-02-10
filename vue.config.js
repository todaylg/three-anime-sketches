const path = require('path');
const webpackConfig = require('./webpack/config');

module.exports = {
    publicPath: webpackConfig.publicPath,
    pages: webpackConfig.pages,
    productionSourceMap: false,
    chainWebpack: config => {
        config.module
        .rule('glsl')
        .test(/\.(glsl|fs|vs)$/)
        .use('raw-loader')
            .loader('raw-loader')
            .end()
        config.module
			.rule('glslify')
			.test(/\.(glsl|fs|vs)$/)
			.use('glslify-loader')
			.loader('glslify-loader')
			.end();
        config.module
        .rule('hdr')
        .test(/\.hdr$/)
        .use('url-loader')
            .loader('url-loader')
            .end()
    },
    configureWebpack: config => {
        config.resolve = {
            modules: [webpackConfig.path.src, path.resolve(__dirname, '../src/pages'), 'node_modules'],
            extensions: ['.glsl', '.fs', '.vs', '.js', '.vue', '.css', '.scss', '.png', '.jpg', '.jpeg', '.hdr', '.ico'],
            alias: webpackConfig.alias
        }
    }
} 