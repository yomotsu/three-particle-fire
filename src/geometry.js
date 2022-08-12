import { ONE_SPRITE_ROW_LENGTH } from './constants.js';
import { getInstalled } from './install.js';

export default function makeGeometryClass() {

	const THREE = getInstalled( 'THREE' );

	return class Geometry {

		constructor( radius, height, particleCount ) {

			const geometry = new THREE.BufferGeometry();

			const halfHeight = height * 0.5;
			const position = new Float32Array( particleCount * 3 );
			const random   = new Float32Array( particleCount );
			const sprite   = new Float32Array( particleCount );

			for ( let i = 0; i < particleCount; i ++ ) {

				const r     = Math.sqrt( Math.random() ) * radius;
				const angle = Math.random() * 2 * Math.PI;
				position[ i * 3 + 0 ] = Math.cos( angle ) * r;
				position[ i * 3 + 1 ] = ( radius - r ) / radius * halfHeight + halfHeight;
				position[ i * 3 + 2 ] = Math.sin( angle ) * r;
				sprite[ i ] = ONE_SPRITE_ROW_LENGTH * ( ( Math.random() * 4 )|0 );
				random[ i ] = Math.random();

				if ( i === 0 ) {

					// to avoid going out of Frustum
					position[ i * 3 + 0 ] = 0;
					position[ i * 3 + 1 ] = 0;
					position[ i * 3 + 2 ] = 0;

				}

			}

			geometry.setAttribute( 'position', new THREE.BufferAttribute( position, 3 ) );
			geometry.setAttribute( 'random', new THREE.BufferAttribute( random, 1 ) );
			geometry.setAttribute( 'sprite', new THREE.BufferAttribute( sprite, 1 ) );
			return geometry;

		}

	}

}
