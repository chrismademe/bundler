const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const compilers = {
	scss: require('./lib/compilers/scss'),
	js: require('./lib/compilers/javascript'),
	copy: require('./lib/compilers/copy'),
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
	 * JS
	 *
	 * Watches and compiles Javascript files
	 *
	 * @param {string} src
	 * @param {object} options
	 * @param {string} options.dest
	 */
	static js = (src, options = {}) => {
		if (!options?.dest) {
			options.dest = src.replace('src', 'dist');
		}
		return compilers.js(src, options.dest, options).compile();
	};

	/**
	 * Copy
	 *
	 * Copies files from one location to another
	 * @param {string} src
	 * @param {string} dest
	 */
	static copy = (src, dest = '') => {
		if (!dest) {
			options.dest = src.replace('src', 'dist');
		}
		return compilers.copy(src, dest).compile();
	};
}

module.exports = Fascio;
