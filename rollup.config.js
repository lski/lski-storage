import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
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
			resolve({ extensions }),
			typescript()
		]
	},
	{
		input,
		output: {
			file: pkg.module,
			format: 'esm'
		},
		plugins: [
			resolve({ extensions }),
			typescript()
		]
	},
	{
		input,
		output: {
			file: pkg.browser,
			format: 'umd',
			name: 'lski.storage'
		},
		plugins: [
			resolve({ extensions }),
			typescript(),
			terser()
		]
	}
];