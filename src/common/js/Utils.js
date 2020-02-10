function getEleWidth(element) {
    let res;
    if (element.currentStyle) {
        res = element.currentStyle.width; // For IE
    } else {
        res = getComputedStyle(element, false).width;
    }
    // 只取数值
    if (~res.indexOf('px')) res = res.slice(0, -2);
    return res;
}

function getEleHeight(element) {
    let res;
    if (element.currentStyle) {
        res = element.currentStyle.height; // For IE
    } else {
        res = getComputedStyle(element, false).height;
    }
    if (~res.indexOf('px')) res = res.slice(0, -2);
    return res;
}

function isMobile() {
	let e = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
	return e || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
}

function preLoadimage(src) {
	return new Promise(resolve => {
        let image = new Image();
        image.onload = () => {
            resolve(src);
        }
        image.src = src;
    })
}

function preLoadimages(imageList) {
	return Promise.all(imageList.map(src => {
        preLoadimage(src);
    }))
}

function isDevelopment(){
    const searchStr = window.location.search.toLowerCase();
    const baseURL = window.location.origin;
    if (baseURL.match('192.168.') || baseURL.match('127.0.') || baseURL.match('localhost') || baseURL == devDomain) return true;
    if (searchStr.match('debug=true') || searchStr.match('debugmode=true')) return true;
    return false;
}

export {
    getEleWidth,
    getEleHeight,
    isMobile,
    preLoadimages,
    isDevelopment
}