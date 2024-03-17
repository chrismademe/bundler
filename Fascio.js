import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import copy from './lib/compilers/copy.js';
import js from './lib/compilers/javascript.js';
import postcss from './lib/compilers/postcss.js';
import scss from './lib/compilers/scss.js';
import Watcher from './lib/Watcher.js';

const argv = yargs(hideBin(process.argv)).argv;

const compilers = {
	scss: scss,
	postcss: postcss,
	js: js,
	copy: copy,
};

class Fascio {
	/**
	 * SASS
	 *
	 * Watches and compiles SASS files
	 * @param {mixed} src
	 * @param {object} options
	 * @param {string} options.output
	 * @param {boolean} options.minify
	 */
	static scss = (src, options = {}) => {
		return compilers.scss(src, options).compile();
	};

	/**
	 * PostCSS
	 *
	 * Watches and compiles PostCSS files
	 * @param {mixed} src
	 * @param {object} options
	 * @param {array} options.extensions
	 */
	static postcss = (src, options = {}) => {
		return compilers.postcss(src, options).compile();
	};

	/**
	 * JS
	 *
	 * Watches and compiles Javascript files
	 *
	 * @param {string} src
	 * @param {object} options
	 * @param {string} options.dest
	 */
	static js = (src, options = {}) => {
		return compilers.js(src, options).compile();
	};

	/**
	 * Copy
	 *
	 * Copies files from one location to another
	 * @param {string} src
	 * @param {object} options
	 */
	static copy = (src, options) => {
		return compilers.copy(src, options).compile();
	};
}

export { Watcher };
export default Fascio;
