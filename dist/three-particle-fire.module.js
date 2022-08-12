/*!
	* three-particle-fire
	* https://github.com/yomotsu/three-particle-fire
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
var SPRITE_ROW_LENGTH = 4;
var ONE_SPRITE_ROW_LENGTH = 1 / SPRITE_ROW_LENGTH;

var libs = {};
var callbacks = {};

function install(_libs) {

	libs.THREE = _libs.THREE;

	for (var i = 0, l = callbacks['THREE'].length; i < l; i++) {

		callbacks['THREE'][i]();
	}

	delete callbacks['THREE'];
}

function getInstalled(key) {

	return libs[key];
}

function onInstall(key, callback) {

	if (!callbacks[key]) callbacks[key] = [];

	callbacks[key].push(callback);
}

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeGeometryClass() {

	var THREE = getInstalled('THREE');

	return function Geometry(radius, height, particleCount) {
		_classCallCheck$1(this, Geometry);

		var geometry = new THREE.BufferGeometry();

		var halfHeight = height * 0.5;
		var position = new Float32Array(particleCount * 3);
		var random = new Float32Array(particleCount);
		var sprite = new Float32Array(particleCount);

		for (var i = 0; i < particleCount; i++) {

			var r = Math.sqrt(Math.random()) * radius;
			var angle = Math.random() * 2 * Math.PI;
			position[i * 3 + 0] = Math.cos(angle) * r;
			position[i * 3 + 1] = (radius - r) / radius * halfHeight + halfHeight;
			position[i * 3 + 2] = Math.sin(angle) * r;
			sprite[i] = ONE_SPRITE_ROW_LENGTH * (Math.random() * 4 | 0);
			random[i] = Math.random();

			if (i === 0) {

				// to avoid going out of Frustum
				position[i * 3 + 0] = 0;
				position[i * 3 + 1] = 0;
				position[i * 3 + 2] = 0;
			}
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
		geometry.setAttribute('random', new THREE.BufferAttribute(random, 1));
		geometry.setAttribute('sprite', new THREE.BufferAttribute(sprite, 1));
		return geometry;
	};
}

var texture = void 0;

function getTexture() {

	if (!!texture) return texture;

	var THREE = getInstalled('THREE');
	var image = new Image();

	texture = new THREE.Texture();
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.image = image;

	image.onload = function () {

		texture.needsUpdate = true;
	};

	image.src = 'data:image/png;base64,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';

	return texture;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeMaterialClass() {

	var THREE = getInstalled('THREE');

	return function Material(parameters) {
		_classCallCheck(this, Material);

		var uniforms = {
			color: { value: null },
			size: { value: 0.0 },
			map: { value: getTexture() },
			time: { value: 0.0 },
			heightOfNearPlane: { value: 0.0 }
		};

		var material = new THREE.ShaderMaterial({

			uniforms: uniforms,

			vertexShader: ['attribute float random;', 'attribute float sprite;', 'uniform float time;', 'uniform float size;', 'uniform float heightOfNearPlane;', 'varying float vSprite;', 'varying float vOpacity;', 'float PI = 3.14;', 'float quadraticIn( float t ) {', 'float tt = t * t;', 'return tt * tt;', '}', 'void main() {', 'float progress = fract( time + ( 2.0 * random - 1.0 ) );', 'float progressNeg = 1.0 - progress;', 'float ease = quadraticIn( progress );', 'float influence = sin( PI * ease );', 'vec3 newPosition = position * vec3( 1.0, ease, 1.0 );', 'gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );', 'gl_PointSize = ( heightOfNearPlane * size ) / gl_Position.w;', 'vOpacity = min( influence * 4.0, 1.0 ) * progressNeg;', 'vSprite = sprite;', '}'].join('\n'),

			fragmentShader: ['uniform vec3 color;', 'uniform sampler2D map;', 'varying float vSprite;', 'varying float vOpacity;', 'void main() {', 'vec2 texCoord = vec2(', 'gl_PointCoord.x * ' + ONE_SPRITE_ROW_LENGTH + ' + vSprite,', 'gl_PointCoord.y', ');', 'gl_FragColor = vec4( texture2D( map, texCoord ).xyz * color * vOpacity, 1.0 );', '}'].join('\n'),

			blending: THREE.AdditiveBlending,
			depthTest: true,
			depthWrite: false,
			transparent: true
			// fog        : true

		});

		material.color = new THREE.Color(0xff2200);
		material.size = 0.4;

		if (parameters !== undefined) {
			material.setValues(parameters);
		}

		material.uniforms.color.value = material.color;
		material.uniforms.size.value = material.size;

		material.update = function (delta) {

			material.uniforms.time.value = (material.uniforms.time.value + delta) % 1;
		};

		material.setPerspective = function (fov, height) {

			material.uniforms.heightOfNearPlane.value = Math.abs(height / (2 * Math.tan(THREE.MathUtils.degToRad(fov * 0.5))));
		};

		return material;
	};
}

var particleFire = {
	// Geometry,
	// Material,
	install: install
};

onInstall('THREE', function () {

	particleFire.Geometry = makeGeometryClass();
	particleFire.Material = makeMaterialClass();
});

export { particleFire as default };
