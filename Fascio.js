import copy from './lib/compilers/copy.js';
import js from './lib/compilers/javascript.js';
import postcss from './lib/compilers/postcss.js';
import react from './lib/compilers/react.js';
import scss from './lib/compilers/scss.js';
import svelte from './lib/compilers/svelte.js';
import vue from './lib/compilers/vue.js';
import Watcher from './lib/Watcher.js';

const compilers = {
	copy,
	js,
	postcss,
	react,
	scss,
	svelte,
	vue,
};

class Fascio {
	/**
	 * SASS
	 *
	 * @param {mixed} src
	 * @param {object} options
	 * @param {string} options.output
	 * @param {boolean} options.minify
	 */
	static scss = async (src, options = {}) => {
		return await compilers.scss(src, options).compile();
	};

	/**
	 * PostCSS
	 *
	 * @param {mixed} src
	 * @param {object} options
	 * @param {array} options.extensions
	 */
	static postcss = async (src, options = {}) => {
		return await compilers.postcss(src, options).compile();
	};

	/**
	 * JS
	 *
	 * @param {string} src
	 * @param {object} options
	 * @param {string} options.dest
	 */
	static js = async (src, options = {}) => {
		return await compilers.js(src, options).compile();
	};

	/**
	 * Svelte
	 *
	 * @param {string} src
	 * @param {object} options
	 * @param {string} options.dest
	 */
	static svelte = async (src, options = {}) => {
		return await compilers.svelte(src, options).compile();
	};

	/**
	 * Vue
	 *
	 * @param {string} src
	 * @param {object} options
	 * @param {string} options.dest
	 */
	static vue = async (src, options = {}) => {
		return await compilers.vue(src, options).compile();
	};

	/**
	 * Vue
	 *
	 * @param {string} src
	 * @param {object} options
	 * @param {string} options.dest
	 */
	static react = async (src, options = {}) => {
		return await compilers.react(src, options).compile();
	};

	/**
	 * Copy
	 *
	 * @param {string} src
	 * @param {object} options
	 */
	static copy = async (src, options) => {
		return await compilers.copy(src, options).compile();
	};
}

export { Watcher };
export default Fascio;
