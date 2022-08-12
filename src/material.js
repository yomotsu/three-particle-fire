import { ONE_SPRITE_ROW_LENGTH } from './constants.js';
import { getInstalled } from './install.js';
import { getTexture } from './texture.js';

export default function makeMaterialClass() {

	const THREE = getInstalled( 'THREE' );

	return class Material {

		constructor( parameters ) {

			const uniforms = {
				color            : { value: null },
				size             : { value: 0.0 },
				map              : { value: getTexture() },
				time             : { value: 0.0 },
				heightOfNearPlane: { value: 0.0 }
			};

			const material = new THREE.ShaderMaterial({

				uniforms      : uniforms,

				vertexShader  : [
					'attribute float random;',
					'attribute float sprite;',
					'uniform float time;',
					'uniform float size;',
					'uniform float heightOfNearPlane;',

					'varying float vSprite;',
					'varying float vOpacity;',

					'float PI = 3.14;',

					'float quadraticIn( float t ) {',

						'float tt = t * t;',
						'return tt * tt;',

					'}',

					'void main() {',

						'float progress = fract( time + ( 2.0 * random - 1.0 ) );',
						'float progressNeg = 1.0 - progress;',
						'float ease = quadraticIn( progress );',
						'float influence = sin( PI * ease );',

						'vec3 newPosition = position * vec3( 1.0, ease, 1.0 );',
						'gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );',
						'gl_PointSize = ( heightOfNearPlane * size ) / gl_Position.w;',

						'vOpacity = min( influence * 4.0, 1.0 ) * progressNeg;',
						'vSprite = sprite;',

					'}'
				].join( '\n' ),

				fragmentShader: [
					'uniform vec3 color;',
					'uniform sampler2D map;',

					'varying float vSprite;',
					'varying float vOpacity;',

					'void main() {',

						'vec2 texCoord = vec2(',
							'gl_PointCoord.x * ' + ONE_SPRITE_ROW_LENGTH + ' + vSprite,',
							'gl_PointCoord.y',
						');',

						'gl_FragColor = vec4( texture2D( map, texCoord ).xyz * color * vOpacity, 1.0 );',

					'}'
				].join( '\n' ),

				blending   : THREE.AdditiveBlending,
				depthTest  : true,
				depthWrite : false,
				transparent: true,
				// fog        : true

			} );

			material.color = new THREE.Color( 0xff2200 );
			material.size = 0.4;

			if ( parameters !== undefined ) {
				material.setValues( parameters );
			}

			material.uniforms.color.value = material.color;
			material.uniforms.size.value = material.size;

			material.update = function( delta ) {

				material.uniforms.time.value = ( material.uniforms.time.value + delta ) % 1;

			}

			material.setPerspective = function( fov, height ) {

				material.uniforms.heightOfNearPlane.value = Math.abs( height / ( 2 * Math.tan( THREE.MathUtils.degToRad( fov * 0.5 ) ) ) );

			}

			return material;

		}

	}

}
