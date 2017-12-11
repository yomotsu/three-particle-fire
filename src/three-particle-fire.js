import makeGeometryClass from './geometry.js';
import makeMaterialClass from './material.js';
import { install, onInstall } from './install.js';

const particleFire = {
	// Geometry,
	// Material,
	install
};

onInstall( 'THREE', () => {

	particleFire.Geometry = makeGeometryClass();
	particleFire.Material = makeMaterialClass();

} );

export default particleFire;
