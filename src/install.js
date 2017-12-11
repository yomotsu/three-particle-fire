const libs = {};
const callbacks = {};

export function install( _libs ) {

	libs.THREE = _libs.THREE;

	for ( let i = 0, l = callbacks[ 'THREE' ].length; i < l; i ++ ) {

		callbacks[ 'THREE' ][ i ]();

	}

	delete callbacks[ 'THREE' ];

}

export function getInstalled( key ) {

	return libs[ key ];

}

export function onInstall( key, callback ) {

	if ( ! callbacks[ key ] ) callbacks[ key ] = [];

	callbacks[ key ].push( callback );

}
