(function(e){function t(t){for(var o,s,r=t[0],c=t[1],l=t[2],h=0,d=[];h<r.length;h++)s=r[h],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);u&&u(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,r=1;r<n.length;r++){var c=n[r];0!==i[c]&&(o=!1)}o&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},i={balloon:0},a=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/three-anime-sketches/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var u=c;a.push([0,"chunk-vendors","chunk-common"]),n()})({0:function(e,t,n){e.exports=n("a8d3")},"463a":function(e,t,n){"use strict";var o=n("b2bc"),i=n.n(o);i.a},a8d3:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{isLoading:e.isLoading},attrs:{id:"wrapper"}},[n("div",{attrs:{id:"canvasContainer"}}),n("div",{staticClass:"animeName"},[e._v("たまこラブストーリー")]),n("div",{staticClass:"scrollNextIcon"},[n("div",[n("span",{on:{click:function(t){return e.toNextPage()}}})])]),n("p",{staticClass:"loadingText"},[e._v("Loading...")]),n("div",{staticClass:"preloadMask"})])},a=[],s=(n("c0b6"),n("b0c0"),n("d4ec")),r=n("bee2"),c=n("5a89"),l=(n("ace4"),n("d3b7"),n("cfc3"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),"#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n\tvUv = uv;\n\tgl_Position = vec4(position, 1.0);\n}\n"),u="precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nuniform vec3 uColor;\nuniform float uColorOffset;\nuniform vec2 uOffset;\nuniform float uScale;\n\nvoid main() {\n\tvec2 st = vUv;// [0,1]\n  \tvec3 p = vec3(st - vec2(0.5, 0.5), 0.0) * 2.;// [-1,1]\n\tp.x -= uOffset.x;\n\tp.y -= uOffset.y;\n\tvec3 color = uColor - uColorOffset * p.y;\n\tcolor *= 1.0 - uScale * length(p);\n\tgl_FragColor = vec4(color, 1.0);\n}",h=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(s["a"])(this,e);var o=n.color,i=n.offset;this.uniforms={uTime:{type:"float",value:0},uColor:{type:"vec3",value:o||new c["e"](5010583)},uColorOffset:{type:"float",value:.1},uOffset:{type:"vec2",value:i||new c["B"](.25)},uScale:{type:"float",value:.25}},this.scene=t.scene,this.plane=this.createObj()}return Object(r["a"])(e,[{key:"createObj",value:function(){var e=new c["c"],t=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),n=new Float32Array([0,0,2,0,0,2]);e.setAttribute("position",new c["b"](t,3)),e.setAttribute("uv",new c["b"](n,2));var o=new c["l"](e,new c["t"]({uniforms:this.uniforms,vertexShader:l,fragmentShader:u,side:c["h"],depthTest:!1,depthWrite:!1}));return this.scene.add(o),o}},{key:"render",value:function(e){this.uniforms.uTime.value+=e}},{key:"mesh",get:function(){return this.plane}}]),e}(),d=function(){function e(){Object(s["a"])(this,e),this.velocity=new Array(3),this.position=new Array(3),this.size=1,this.color=[.2+.8*Math.random(),.2+.8*Math.random(),.2+.8*Math.random()],this.alpha=1,this.misc=[Math.random(),Math.random(),Math.random()]}return Object(r["a"])(e,[{key:"setVelocity",value:function(e,t,n){this.velocity[0]=e,this.velocity[1]=t,this.velocity[2]=n}},{key:"setPosition",value:function(e,t,n){this.position[0]=e,this.position[1]=t,this.position[2]=n}},{key:"setSize",value:function(e){this.size=e}},{key:"update",value:function(e){this.position[0]+=this.velocity[0]*e,this.position[1]+=this.velocity[1]*e,this.position[2]+=this.velocity[2]*e}}]),e}(),m="#define GLSLIFY 1\nattribute float aSize;\nattribute vec3 color;\nattribute vec3 miscs;\n\nvarying vec3 vPosition;\nvarying vec3 vColor;\nvarying vec3 vMiscs;\n\nvoid main() {\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\tgl_PointSize = aSize * (1000.0 / - mvPosition.z);\n\t\n\tvPosition = vec3(mvPosition.xyz);\n\tvColor = color;\n\tvMiscs = miscs;\n}",p="// refer: https://www.shadertoy.com/view/4lBXDt\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vPosition;\nvarying vec3 vColor;\nvarying vec3 vMiscs;\n\nuniform sampler2D tNoise;\nuniform float uTime;\nuniform float uSpecularFactor;\nuniform float uAlpha;\nuniform vec3 uDOF;  //x:focus distance, y:focus radius, z:max radius\n\n#define EdgeColor vec4(1., 1., 1., 1.0)\n#define BoundaryColor vec4(.0, .0, .0, 1.0)\n#define SpecularColor vec4(1., 1., 1., 1.0)\n#define BlueColor vec4(0.384, 0.667, 0.655, 1.0)\n\nconst float amplitude = 0.32;\n\nfloat noise2d(vec2 p) {\n\tfloat t = texture2D(tNoise, p).x;\n\tt += 0.5 * texture2D(tNoise, p * 2.0).x;\n\tt += 0.25 * texture2D(tNoise, p * 4.0).x;\n\treturn t / 1.75;\n}\n\nfloat line(vec2 p, vec2 p0, vec2 p1, float width) {\n    vec2 dir0 = p1 - p0;\n    vec2 dir1 = p - p0;\n    float h = clamp(dot(dir1, dir0)/dot(dir0, dir0), 0.0, 1.0);\n    float d = (length(dir1 - dir0 * h) - width * 0.5);\n    return d;\n}\n\nvec4 drawline(vec2 p, vec2 p0, vec2 p1, float width) {\n    float d = line(p, p0, p1, width);\n    d += noise2d(p * vec2(0.2)) * 0.005;\n    float w = fwidth(d) * 1.0;\n    \n    return vec4(EdgeColor.rgb, 1.-smoothstep(-w, w, d));\n}\n\nfloat metaball(vec2 p, float r) {\n\treturn r / dot(p, p);\n}\n\nvec4 balloon(vec2 pos, vec2 start, vec2 end, float radius, vec4 color) {\n    // Line\n    vec2 linePos = pos;\n    linePos.x *= (1.0 + sin(noise2d(pos * 0.005) * pos.y * 8.) * 0.05);\n    vec4 line = drawline(linePos,\n        start * (1.0 + vec2(vMiscs.x * 10. * cos(uTime * 1.4), sin(1.)) * 2. * amplitude), \n        end, 0.015);\n    \n    // Blob shape\n    vec2 c0 = start * (1.0 + vec2(vMiscs.x * 10. * cos(uTime * 1.4), sin(2.4)) * 2.8 * amplitude);\n    vec2 c1 = start * (1.0 + vec2(vMiscs.y * 10. * cos(uTime * 1.4), sin(1.9)) * 0.5  * amplitude);\n    vec2 c2 = start * (1.0 + vec2(vMiscs.z * 10. * sin(uTime * 1.9), cos(2.4)) * 0.3 * amplitude);\n\n\tfloat r = metaball(pos - c0, radius * 1.1) * \n            metaball(pos - c1, radius * 1.3) * \n            metaball(pos - c2, radius * 0.9);\n\n    // Boundary\n    vec2 boundary = vec2(0.45, 0.5);\n\tvec4 c = vec4(0.);\n\t\t\t\n\tvec4 egdeColor = EdgeColor;\n    vec4 boundaryColor = BoundaryColor;\n\tvec4 blobColor = color;\n    \n    r += noise2d(pos * vec2(0.05)) * 0.07;\n\n    if (r < boundary.x) {\n\t\tc = boundaryColor;\n\t\tc.a = 0.;\n\t} else if (r < boundary.y) {\n\t\tc = boundaryColor;\n\t\tc.a = 1.0;\n    } else {\n        c = blobColor;\n        c.a = 1.0;\n    }\n    \n    // Shadow\n    // if(length(pos)< .25) c.rgb *= 1. * cos(pos.y) * length(pos);\n\n    // Add specular\n    vec2 s0 = start * (1.0 + vec2(vMiscs.x * 5. * cos(uTime * 1.4), sin(0.9)) * 4. * amplitude);\n    vec2 s1 = start * (1.0 + vec2(vMiscs.y * 5. * cos(uTime * 1.4), sin(0.88)) * 3.5 * amplitude);\n    float specular = metaball(pos - s0, radius * 0.02) * metaball(pos - s1, radius * 0.08);\n    c += specular * SpecularColor * uSpecularFactor;\n    \n     // Blur the edges\n    float w = 0.05;\n\tif (r > boundary.x - w && r < boundary.x) {\n\t\tc = mix(line, boundaryColor, smoothstep(-w, 0.0, r - boundary.x));\n        c.a = mix(0.0, 1.0, smoothstep(-w, 0.0, r - boundary.x));\n\t}\n\tif (r > boundary.y - w && r < boundary.y + w) {\n\t\tc.rgb = mix(boundaryColor.rgb, blobColor.rgb, smoothstep(-w, w, r - boundary.y));\n\t}\n\n    c.rgb += noise2d(pos * 0.1) * 0.01;\n    // Blob\n    c.rgb = mix(line.rgb, c.rgb, c.a);\n    // Line\n    c.a = max(line.a, c.a);\n    \n    return c;\n}\n\nvoid main() {\n\tvec2 st = (gl_PointCoord - vec2(0.5, 0.5)) * 2.0; //[-1,1]\n\tvec4 fragColor;\n\tvec4 c = balloon(st, vec2(0.01, -0.4), vec2(0.01, 0.95), 0.15, vec4(vColor,1.0));\n\tfragColor.rgb = mix(vec3(0.), c.rgb, c.a);\n\n    if(length(st)< .2) fragColor.rgb *= 1. * cos(st.y) * length(st);\n\n    fragColor.rgb = pow(fragColor.rgb, vec3(1.0/2.2));\n    float alpha = c.a * uAlpha;\n\tgl_FragColor = vec4(fragColor.rgb, alpha);\n}",v=n("dcd8"),f=n.n(v);function b(){return 2*Math.random()-1}var g=function(){function e(t){Object(s["a"])(this,e),this.scene=t.scene,this.isMobile=t.isMobile,this.deltaTime=0,this.particleControl={},this.isMobile?(this.particleControl.particleNum=50,this.particleControl.area=[10,20,5]):(this.particleControl.particleNum=50,this.particleControl.area=[20,20,10]),this.geometry=new c["c"],this.positions=new Float32Array(3*this.particleControl.particleNum),this.colors=new Float32Array(3*this.particleControl.particleNum),this.sizes=new Float32Array(this.particleControl.particleNum),this.miscs=new Float32Array(3*this.particleControl.particleNum),this.initParticle()}return Object(r["a"])(e,[{key:"initParticle",value:function(){var e=this.particleControl,t=e.particleNum,n=e.area;e.particles=new Array(t);for(var o=new c["C"],i=0,a=0;a<t;a++){e.particles[a]=new d;var s=e.particles[a];o.x=.1*b(),o.y=.1*b()-1,o.z=.3*b(),o.normalize(),i=-5*Math.random()-1,o.multiplyScalar(i),s.setVelocity(o.x,o.y,o.z),s.setPosition(b()*n[0],b()*n[1],b()*n[2]/2),s.setSize(4+1*Math.random())}this.geometry.setAttribute("position",new c["b"](this.positions,3)),this.geometry.setAttribute("aSize",new c["b"](this.sizes,1)),this.geometry.setAttribute("color",new c["b"](this.colors,3)),this.geometry.setAttribute("miscs",new c["b"](this.miscs,3));var r=(new c["z"]).load(f.a,(function(e){e.wrapS=c["u"],e.wrapT=c["u"]}));this.uniforms={far:{type:"float",value:n[2]},uTime:{type:"float",value:0},tNoise:{type:"sampler2D",value:r},uSpecularFactor:{type:"float",value:1},uAlpha:{type:"float",value:1},uDOF:{type:"vector3",value:new c["C"](10,4,8)}},this.points=new c["q"](this.geometry,new c["w"]({uniforms:this.uniforms,vertexShader:m,fragmentShader:p,blending:c["f"],side:c["h"],depthWrite:!1,extensions:{derivatives:!0}})),this.scene.add(this.points)}},{key:"repeatPos",value:function(e,t){for(var n=0;n<3;n++){var o=t[n];if(Math.abs(e.position[n])-.5*e.size>o){if(2===n)return;e.position[n]>0?e.position[n]-=2*o:e.position[n]+=2*o,0===n&&(e.position[1]=-o+e.size),e.position[2]=0}}}},{key:"renderParticle",value:function(){for(var e=this.particleControl,t=e.particleNum,n=e.area,o=e.particles,i=0;i<t;i++){var a=o[i];a.update(this.deltaTime),this.repeatPos(a,n),this.positions[3*i]=a.position[0],this.positions[3*i+1]=a.position[1],this.positions[3*i+2]=a.position[2],this.sizes[i]=a.size,this.colors[3*i]=a.color[0],this.colors[3*i+1]=a.color[1],this.colors[3*i+2]=a.color[2],this.miscs[3*i]=a.misc[0],this.miscs[3*i+1]=a.misc[1],this.miscs[3*i+2]=a.misc[2]}this.geometry.attributes["position"].needsUpdate=!0,this.geometry.attributes["aSize"].needsUpdate=!0}},{key:"render",value:function(e){this.deltaTime=e,this.uniforms.uTime.value+=e,this.renderParticle()}},{key:"mesh",get:function(){return this.points}}]),e}(),y=(n("b8bf"),n("4c53"),n("ddb0"),function(e,t){void 0===t&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.enabled=!0,this.target=new c["C"],this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:c["j"].ROTATE,MIDDLE:c["j"].DOLLY,RIGHT:c["j"].PAN},this.touches={ONE:c["y"].ROTATE,TWO:c["y"].DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return u.phi},this.getAzimuthalAngle=function(){return u.theta},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(o),n.update(),r=s.NONE},this.update=function(){var t=new c["C"],i=(new c["r"]).setFromUnitVectors(e.up,new c["C"](0,1,0)),a=i.clone().inverse(),v=new c["C"],f=new c["r"];return function(){var e=n.object.position;return t.copy(e).sub(n.target),t.applyQuaternion(i),u.setFromVector3(t),n.autoRotate&&r===s.NONE&&T(E()),n.enableDamping?(u.theta+=h.theta*n.dampingFactor,u.phi+=h.phi*n.dampingFactor):(u.theta+=h.theta,u.phi+=h.phi),u.theta=Math.max(n.minAzimuthAngle,Math.min(n.maxAzimuthAngle,u.theta)),u.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,u.phi)),u.makeSafe(),u.radius*=d,u.radius=Math.max(n.minDistance,Math.min(n.maxDistance,u.radius)),!0===n.enableDamping?n.target.addScaledVector(m,n.dampingFactor):n.target.add(m),t.setFromSpherical(u),t.applyQuaternion(a),e.copy(n.target).add(t),n.object.lookAt(n.target),!0===n.enableDamping?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,m.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),m.set(0,0,0)),d=1,!!(p||v.distanceToSquared(n.object.position)>l||8*(1-f.dot(n.object.quaternion))>l)&&(n.dispatchEvent(o),v.copy(n.object.position),f.copy(n.object.quaternion),p=!1,!0)}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",re,!1),n.domElement.removeEventListener("mousedown",$,!1),n.domElement.removeEventListener("wheel",ne,!1),n.domElement.removeEventListener("touchstart",ie,!1),n.domElement.removeEventListener("touchend",se,!1),n.domElement.removeEventListener("touchmove",ae,!1),document.removeEventListener("mousemove",ee,!1),document.removeEventListener("mouseup",te,!1),n.domElement.removeEventListener("keydown",oe,!1)};var n=this,o={type:"change"},i={type:"start"},a={type:"end"},s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=s.NONE,l=1e-6,u=new c["x"],h=new c["x"],d=1,m=new c["C"],p=!1,v=new c["B"],f=new c["B"],b=new c["B"],g=new c["B"],y=new c["B"],w=new c["B"],O=new c["B"],C=new c["B"],P=new c["B"];function E(){return 2*Math.PI/60/60*n.autoRotateSpeed}function x(){return Math.pow(.95,n.zoomSpeed)}function T(e){h.theta-=e}function A(e){h.phi-=e}var j=function(){var e=new c["C"];return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),m.add(e)}}(),k=function(){var e=new c["C"];return function(t,o){!0===n.screenSpacePanning?e.setFromMatrixColumn(o,1):(e.setFromMatrixColumn(o,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),m.add(e)}}(),L=function(){var e=new c["C"];return function(t,o){var i=n.domElement;if(n.object.isPerspectiveCamera){var a=n.object.position;e.copy(a).sub(n.target);var s=e.length();s*=Math.tan(n.object.fov/2*Math.PI/180),j(2*t*s/i.clientHeight,n.object.matrix),k(2*o*s/i.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(j(t*(n.object.right-n.object.left)/n.object.zoom/i.clientWidth,n.object.matrix),k(o*(n.object.top-n.object.bottom)/n.object.zoom/i.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function N(e){n.object.isPerspectiveCamera?d/=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*e)),n.object.updateProjectionMatrix(),p=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function S(e){n.object.isPerspectiveCamera?d*=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/e)),n.object.updateProjectionMatrix(),p=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function M(e){v.set(e.clientX,e.clientY)}function z(e){O.set(e.clientX,e.clientY)}function D(e){g.set(e.clientX,e.clientY)}function R(e){f.set(e.clientX,e.clientY),b.subVectors(f,v).multiplyScalar(n.rotateSpeed);var t=n.domElement;T(2*Math.PI*b.x/t.clientHeight),A(2*Math.PI*b.y/t.clientHeight),v.copy(f),n.update()}function Y(e){C.set(e.clientX,e.clientY),P.subVectors(C,O),P.y>0?N(x()):P.y<0&&S(x()),O.copy(C),n.update()}function F(e){y.set(e.clientX,e.clientY),w.subVectors(y,g).multiplyScalar(n.panSpeed),L(w.x,w.y),g.copy(y),n.update()}function _(){}function I(e){e.deltaY<0?S(x()):e.deltaY>0&&N(x()),n.update()}function B(e){var t=!1;switch(e.keyCode){case n.keys.UP:L(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:L(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:L(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:L(-n.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),n.update())}function H(e){if(1==e.touches.length)v.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),n=.5*(e.touches[0].pageY+e.touches[1].pageY);v.set(t,n)}}function U(e){if(1==e.touches.length)g.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),n=.5*(e.touches[0].pageY+e.touches[1].pageY);g.set(t,n)}}function X(e){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,o=Math.sqrt(t*t+n*n);O.set(0,o)}function Z(e){n.enableZoom&&X(e),n.enablePan&&U(e)}function G(e){n.enableZoom&&X(e),n.enableRotate&&H(e)}function V(e){if(1==e.touches.length)f.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);f.set(t,o)}b.subVectors(f,v).multiplyScalar(n.rotateSpeed);var i=n.domElement;T(2*Math.PI*b.x/i.clientHeight),A(2*Math.PI*b.y/i.clientHeight),v.copy(f)}function W(e){if(1==e.touches.length)y.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);y.set(t,o)}w.subVectors(y,g).multiplyScalar(n.panSpeed),L(w.x,w.y),g.copy(y)}function q(e){var t=e.touches[0].pageX-e.touches[1].pageX,o=e.touches[0].pageY-e.touches[1].pageY,i=Math.sqrt(t*t+o*o);C.set(0,i),P.set(0,Math.pow(C.y/O.y,n.zoomSpeed)),N(P.y),O.copy(C)}function K(e){n.enableZoom&&q(e),n.enablePan&&W(e)}function J(e){n.enableZoom&&q(e),n.enableRotate&&V(e)}function Q(){}function $(e){if(!1!==n.enabled){switch(e.preventDefault(),n.domElement.focus?n.domElement.focus():window.focus(),e.button){case 0:switch(n.mouseButtons.LEFT){case c["j"].ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;D(e),r=s.PAN}else{if(!1===n.enableRotate)return;M(e),r=s.ROTATE}break;case c["j"].PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;M(e),r=s.ROTATE}else{if(!1===n.enablePan)return;D(e),r=s.PAN}break;default:r=s.NONE}break;case 1:switch(n.mouseButtons.MIDDLE){case c["j"].DOLLY:if(!1===n.enableZoom)return;z(e),r=s.DOLLY;break;default:r=s.NONE}break;case 2:switch(n.mouseButtons.RIGHT){case c["j"].ROTATE:if(!1===n.enableRotate)return;M(e),r=s.ROTATE;break;case c["j"].PAN:if(!1===n.enablePan)return;D(e),r=s.PAN;break;default:r=s.NONE}break}r!==s.NONE&&(document.addEventListener("mousemove",ee,!1),document.addEventListener("mouseup",te,!1),n.dispatchEvent(i))}}function ee(e){if(!1!==n.enabled)switch(e.preventDefault(),r){case s.ROTATE:if(!1===n.enableRotate)return;R(e);break;case s.DOLLY:if(!1===n.enableZoom)return;Y(e);break;case s.PAN:if(!1===n.enablePan)return;F(e);break}}function te(e){!1!==n.enabled&&(_(e),document.removeEventListener("mousemove",ee,!1),document.removeEventListener("mouseup",te,!1),n.dispatchEvent(a),r=s.NONE)}function ne(e){!1===n.enabled||!1===n.enableZoom||r!==s.NONE&&r!==s.ROTATE||(e.preventDefault(),e.stopPropagation(),n.dispatchEvent(i),I(e),n.dispatchEvent(a))}function oe(e){!1!==n.enabled&&!1!==n.enableKeys&&!1!==n.enablePan&&B(e)}function ie(e){if(!1!==n.enabled){switch(e.preventDefault(),e.touches.length){case 1:switch(n.touches.ONE){case c["y"].ROTATE:if(!1===n.enableRotate)return;H(e),r=s.TOUCH_ROTATE;break;case c["y"].PAN:if(!1===n.enablePan)return;U(e),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case c["y"].DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;Z(e),r=s.TOUCH_DOLLY_PAN;break;case c["y"].DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;G(e),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(i)}}function ae(e){if(!1!==n.enabled)switch(e.preventDefault(),e.stopPropagation(),r){case s.TOUCH_ROTATE:if(!1===n.enableRotate)return;V(e),n.update();break;case s.TOUCH_PAN:if(!1===n.enablePan)return;W(e),n.update();break;case s.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;K(e),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;J(e),n.update();break;default:r=s.NONE}}function se(e){!1!==n.enabled&&(Q(e),n.dispatchEvent(a),r=s.NONE)}function re(e){!1!==n.enabled&&e.preventDefault()}n.domElement.addEventListener("contextmenu",re,!1),n.domElement.addEventListener("mousedown",$,!1),n.domElement.addEventListener("wheel",ne,!1),n.domElement.addEventListener("touchstart",ie,!1),n.domElement.addEventListener("touchend",se,!1),n.domElement.addEventListener("touchmove",ae,!1),n.domElement.addEventListener("keydown",oe,!1),-1===n.domElement.tabIndex&&(n.domElement.tabIndex=0),this.update()});y.prototype=Object.create(c["g"].prototype),y.prototype.constructor=y;var w=function(e,t){y.call(this,e,t),this.mouseButtons.LEFT=c["j"].PAN,this.mouseButtons.RIGHT=c["j"].ROTATE,this.touches.ONE=c["y"].PAN,this.touches.TWO=c["y"].DOLLY_ROTATE};w.prototype=Object.create(c["g"].prototype),w.prototype.constructor=w;var O=n("a1bb"),C=n("11a3"),P=n("6c1a"),E=n("3625"),x="#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",T="#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D tDiffuse;\nuniform vec2 direction;\n\nvarying vec2 vUv;\n\nvec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3333333333333333) * direction;\n  color += texture2D(image, uv) * 0.29411764705882354;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;\n  return color; \n}\n\nvoid main() {\n   gl_FragColor = blur5(tDiffuse, vUv, resolution, direction);\n}",A=(new c["B"],new c["B"],n("11b7")),j=n("495a"),k=n("f705"),L=function(){function e(t,n){Object(s["a"])(this,e),this.container=t,this.width=Object(A["b"])(t),this.height=Object(A["a"])(t),this.clock=new c["d"],this.debug=!0,this.isMobile=Object(A["c"])();var o=this.camera=new c["o"](45,this.width/this.height,.1,500);this.initCameraYPos=0,o.position.set(0,this.initCameraYPos,20);var i=this.renderer=new c["E"]({antialias:!1});i.domElement.id="canvasWebGL",i.setPixelRatio(window.devicePixelRatio),i.setSize(this.width,this.height),i.gammaFactor=2.2,i.setClearColor(16777215,1),t.appendChild(i.domElement),this.initControl(),this.initScene(n)}return Object(r["a"])(e,[{key:"initEntryAnime",value:function(){}},{key:"initControl",value:function(){this.control=new y(this.camera,this.container),this.control.target.y=this.initCameraYPos,this.control.enableZoom=!1,this.control.enablePan=!1,this.control.minAzimuthAngle=-Math.PI/6,this.control.maxAzimuthAngle=Math.PI/6,this.control.minPolarAngle=Math.PI/2,this.control.maxPolarAngle=Math.PI/2,this.control.rotateSpeed=.1}},{key:"initScene",value:function(e){this.scene=new c["v"];this.background=new h(this),this.balloons=new g(this),this.initPostProcessing(),this.debug&&this.initGUI(),this.initEvents(),this.animete(),"function"===typeof e&&e()}},{key:"initPostProcessing",value:function(){this.composer=new O["a"](this.renderer),this.composer.addPass(new C["a"](this.scene,this.camera));var e=this.vignettePass=new P["a"](E["a"]);e.uniforms["offset"].value=1,e.uniforms["darkness"].value=1,this.composer.addPass(e)}},{key:"initGUI",value:function(){var e=this,t=new k["a"],n=this.background.mesh.material,o=this.balloons.mesh.material,i={bgColor:n.uniforms.uColor.value.getHex(),bgColorOffset:n.uniforms.uColorOffset.value,bgCenterX:n.uniforms.uOffset.value.x,bgCenterY:n.uniforms.uOffset.value.y,bgScale:n.uniforms.uScale.value,specularFactor:o.uniforms.uSpecularFactor.value,balloonAlpha:o.uniforms.uAlpha.value,vignetteOffset:this.vignettePass.uniforms.offset.value,vignetteDarkness:this.vignettePass.uniforms.darkness.value};t.close();var a=t.addFolder("Background");a.addColor(i,"bgColor").name("color").onChange((function(e){n.uniforms.uColor.value.setHex(e)})),a.add(i,"bgColorOffset",0,1).step(.01).name("colorOffset").onChange((function(e){n.uniforms.uColorOffset.value=e})),a.add(i,"bgCenterX",-1,1).step(.01).name("centerX").onChange((function(e){n.uniforms.uOffset.value.x=e})),a.add(i,"bgCenterY",-1,1).step(.01).name("centerY").onChange((function(e){n.uniforms.uOffset.value.y=e})),a.add(i,"bgScale",0,2).step(.01).name("scale").onChange((function(e){n.uniforms.uScale.value=1/e})),a.close();var s=t.addFolder("Balloons");s.add(i,"specularFactor",0,1).step(.01).name("specular").onChange((function(e){o.uniforms.uSpecularFactor.value=e})),s.add(i,"balloonAlpha",0,1).step(.01).name("alpha").onChange((function(e){o.uniforms.uAlpha.value=e})),s.close();var r=t.addFolder("Post-processing");r.add(i,"vignetteOffset",0,5).step(.01).name("offset").onChange((function(t){e.vignettePass.uniforms.offset.value=t})),r.add(i,"vignetteDarkness",0,5).step(.01).name("darkness").onChange((function(t){e.vignettePass.uniforms.darkness.value=t})),r.close()}},{key:"initEvents",value:function(){window.addEventListener("resize",this.onWindowResize.bind(this),!1)}},{key:"onWindowResize",value:function(){this.width=window.innerWidth,this.height=window.innerHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(this.width,this.height),this.composer&&this.composer.setSize(this.width,this.height)}},{key:"animete",value:function(){var e=this.clock.getDelta();this.background.render(e),this.balloons.render(e),this.control.update(),j["a"].update(),this.composer.render(),requestAnimationFrame(this.animete.bind(this))}}]),e}(),N={name:"container",data:function(){return{isLoading:!0}},mounted:function(){var e=document.querySelector("#canvasContainer");this.scene=new L(e),this.isLoading=!1,this.scene.initEntryAnime()},methods:{toNextPage:function(){window.location.href="/three-anime-sketches/index/"}}},S=N,M=(n("463a"),n("2877")),z=Object(M["a"])(S,i,a,!1,null,null,null),D=z.exports,R=n("85fe");o["a"].use(R["a"]),new o["a"]({render:function(e){return e(D)}}).$mount("#container")},b2bc:function(e,t,n){},dcd8:function(e,t,n){e.exports=n.p+"img/noise.7c756fce.png"}});