import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import babel       from 'rollup-plugin-babel';
import pkg from './package.json';

const license = `/*!
	* ${ pkg.name }
	* https://github.com/${ pkg.repository }
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */`

export default {
	input: 'src/three-particle-fire.js',
	output: [
		{
			format: 'umd',
			name: 'particleFire',
			file: 'dist/three-particle-fire.js',
			banner: license
		},
		{
			format: 'es',
			file: 'dist/three-particle-fire.module.js',
			banner: license
		}
	],
	indent: '\t',
	sourceMap: false,
	plugins: [
		nodeResolve( {
			jsnext: true,
			browser: true,
			preferBuiltins: false
		} ),
		commonjs( {
			include: [ 'node_modules/**' ],
			exclude: [],
			sourceMap: true,
		} ),
		babel( {
			exclude: 'node_modules/**',
			presets: [
				[ 'env', {
					targets: {
						browsers: [ 'last 2 versions' ]
					},
					loose: true,
					modules: false
				} ]
			]
		} )
	]
};
