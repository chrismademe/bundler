const chalk = require('chalk');
const cleanCSS = require('clean-css');
const fs = require('fs-extra');
const sass = require('sass');
const { getFilenameFromPath } = require('../helpers');

/**
 * SASS
 *
 * Watches and compiles SASS files
 * @param {string} src
 * @param {object} options
 * @param {object} options.sass - Options to pass to the sass compiler
 */
module.exports = function (src, options = {}) {
	this.src = src;
	this.options = options;
	this.result = '';

	this.compile = () => {
		console.log(chalk.blue('🟢 Compiling SCSS'));

		try {
			const { css } = sass.compile(this.src, this.options?.sass || {});
			this.result = css.toString();
		} catch (error) {
			console.log(chalk.red(`🔴 Error compiling SCSS: ${error}`));
		}

		return this;
	};

	this.minify = () => {
		try {
			console.log(chalk.blue('📦 Minifying CSS'));
			this.result = new cleanCSS().minify(this.result).styles;
		} catch (error) {
			console.log(chalk.red(`🔴 Error minifying CSS: ${error}`));
		}
		return this;
	};

	/**
	 * Write
	 *
	 * @param {*} dest Path to directory where the file should be written
	 * @returns
	 */
	this.write = (dest = '') => {
		// Get the filename from the src path
		filename = getFilenameFromPath(this.src);

		// Set a default destination if none is provided
		if (dest === '') {
			dest = this.src.replace('src', 'dist');
		}

		// Append the filename to the destination path
		dest = `${dest}/${filename.replace('.scss', '.css')}`;

		try {
			fs.outputFile(dest, this.result);
			return true;
		} catch (error) {
			console.log(chalk.red(`🔴 Error writing CSS file: ${error}`));
		}

		return false;
	};

	return this;
};
