import { ONE_SPRITE_ROW_LENGTH } from './constants.js';
import { getInstalled } from './install.js';

export default function makeGeometryClass() {

	const THREE = getInstalled( 'THREE' );

	const Geometry = function Geometry( radius, height, particleCount ) {

		THREE.BufferGeometry.call( this );

		const halfHeight = height * 0.5;
		const position = new Float32Array( particleCount * 3 );
		const randam   = new Float32Array( particleCount );
		const sprite   = new Float32Array( particleCount );

		for ( let i = 0; i < particleCount; i ++ ) {

			const r     = Math.sqrt( Math.random() ) * radius;
			const angle = Math.random() * 2 * Math.PI;
			position[ i * 3 + 0 ] = Math.cos( angle ) * r;
			position[ i * 3 + 1 ] = ( radius - r ) / radius * halfHeight + halfHeight;
			position[ i * 3 + 2 ] = Math.sin( angle ) * r;
			sprite[ i ] = ONE_SPRITE_ROW_LENGTH * ( ( Math.random() * 4 )|0 );
			randam[ i ] = Math.random();

			if ( i === 0 ) {

				 // to avoid going out of Frustum
				position[ i * 3 + 0 ] = 0;
				position[ i * 3 + 1 ] = 0;
				position[ i * 3 + 2 ] = 0;

			}

		}

		this.addAttribute( 'position', new THREE.BufferAttribute( position, 3 ) );
		this.addAttribute( 'randam', new THREE.BufferAttribute( randam, 1 ) );
		this.addAttribute( 'sprite', new THREE.BufferAttribute( sprite, 1 ) );

	}

	Geometry.prototype = Object.create( THREE.BufferGeometry.prototype );

	return Geometry;

}
