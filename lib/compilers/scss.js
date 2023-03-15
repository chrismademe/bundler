import chalk from 'chalk';
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import sassGlob from 'esbuild-sass-glob';
import fse from 'fs-extra';
import { getFilenameFromPath } from '../helpers.js';

/**
 * SASS
 *
 * Watches and compiles SASS files
 * @param {string} src
 * @param {object} options
 * @param {object} options.sass - Options to pass to the sass compiler
 */
export default function (src, options = {}) {
	this.src = src;
	this.options = options;

	this.compile = async () => {
		console.log(chalk.blue(`🟢 Compiling SCSS from ${this.src}`));

		// Set a default destination if none is provided
		let dest = this.options?.dest || null;
		if (!dest) {
			dest = this.src.replace('src', 'dist');
		}

		try {
			await esbuild.build({
				entryPoints: [this.src],
				minify: this.options?.minify || false,
				outdir: dest,
				plugins: [
					sassPlugin({
						precompile: this.options?.glob && this.sassGlob,
					}),
				],
			});
		} catch (error) {
			console.log(chalk.red(`🔴 Error compiling SCSS: ${error}`));
		}
	};

	this.sassGlob = (source, pathname) => {
		return sassGlob(source, pathname);
	};

	return this;
}
