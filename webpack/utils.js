const path = require('path');
const glob = require('glob');
const ignore = require('./pageignore');

function getFilesByGlob(root, patterns) {
	if (!Array.isArray(patterns)) {
		patterns = [patterns];
	}
	return patterns.reduce((result, pattern) => {
		return result.concat(glob.sync(pattern, { root }));
	}, []);
}

function getEntry(root, patterns) {
	const files = getFilesByGlob(root, patterns);
	return files.reduce((result, file) => {
		const dirname = path.dirname(file);
		const filename = path.basename(file, path.extname(file)); // with suffix
		const key = path
			.join(dirname, filename)
			.replace(root, '')
			.replace(/\\/g, '/');
		const pagename = key.match(/(\w+)(?=\/)/g)[0];
		const flag = ignore.page.find(item => !!item && ~key.indexOf(item));
		if (!flag) {
			result.push({ key, path: file, pagename });
		}
		// skip
		return result;
	}, []);
}

function getPages({ jsEntryPath, jsEntryPatterns, htmlEntryPath, htmlEntryPatterns }) {
	const pages = {};
	const jsEntry = getEntry(jsEntryPath, jsEntryPatterns);
	const htmlEntry = getEntry(htmlEntryPath, htmlEntryPatterns);
	jsEntry.forEach((js, index) => {
		const html = htmlEntry[index];
		pages[html.pagename] = {
			entry: js.path,
			template: html.path,
			filename: html.key + '.html',
			title: html.pagename
		};
	});
	return pages;
}

module.exports = {
	getPages
};
