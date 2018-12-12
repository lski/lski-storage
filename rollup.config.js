import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { plugin as analyze } from 'rollup-plugin-analyzer'
import pkg from './package.json';

const input = './src/index.ts';
const extensions = ['.js', '.ts'];

export default [{
		input,
		output: {
			file: pkg.main,
			format: 'cjs'
		},
		plugins: [
			babel({
				runtimeHelpers: true,
				extensions
			}),
			resolve({ extensions }),
			analyze()
			//typescript()
		]
	},
	{
		input,
		output: {
			file: pkg.module,
			format: 'esm'
		},
		plugins: [
			babel({
				runtimeHelpers: true,
				extensions
			}),
			resolve({ extensions }),
			analyze()
			// typescript()
		]
	}
];