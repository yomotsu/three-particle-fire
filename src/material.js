import { ONE_SPRITE_ROW_LENGTH } from './constants.js';
import { getInstalled } from './install.js';
import getTexture from './texture.js';

export default function makeMaterialClass() {

	const THREE = getInstalled( 'THREE' );

	const Material = function Material( parameters ) {

		const uniforms = {
			color            : { type: "c", value: null },
			size             : { type: "f", value: 0.0 },
			texture          : { type: "t", value: getTexture() },
			time             : { type: "f", value: 0.0 },
			heightOfNearPlane: { type: "f", value: 0.0 }
		};

		THREE.ShaderMaterial.call( this, {

			uniforms      : uniforms,

			vertexShader  : [
				'attribute float randam;',
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

					'float progress = fract( time + ( 2.0 * randam - 1.0 ) );',
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
				'uniform sampler2D texture;',

				'varying float vSprite;',
				'varying float vOpacity;',

				'void main() {',

					'vec2 texCoord = vec2(',
						'gl_PointCoord.x * ' + ONE_SPRITE_ROW_LENGTH + ' + vSprite,',
						'gl_PointCoord.y',
					');',

					'gl_FragColor = vec4( texture2D( texture, vec2( texCoord ) ).xyz * color * vOpacity, 1.0 );',

				'}'
			].join( '\n' ),

			blending   : THREE.AdditiveBlending,
			depthTest  : true,
			depthWrite : false,
			transparent: true,
			// fog        : true

		} );

		this.color = new THREE.Color( 0xff2200 );
		this.size  = 0.4;
		this.setValues( parameters );

		this.uniforms.color.value = this.color;
		this.uniforms.size.value  = this.size;

	}

	Material.prototype = Object.create( THREE.ShaderMaterial.prototype );

	Material.prototype.update = function( delta ) {

		this.uniforms.time.value = ( this.uniforms.time.value + delta ) % 1;

	}

	Material.prototype.setPerspective = function( fov, height ) {

		this.uniforms.heightOfNearPlane.value = Math.abs( height / ( 2 * Math.tan( THREE.Math.degToRad( fov * 0.5 ) ) ) );

	}

	return Material;

}
