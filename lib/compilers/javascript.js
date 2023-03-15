import chalk from 'chalk';
import esbuild from 'esbuild';
import { getFilenameFromPath } from '../helpers.js';

/**
 * Javascript Compiler
 *
 * Compiles and bundles Javascript files using esbuild
 *
 * @param {*} src - The input file(s) to compile
 * @param {*} dest - The output file to write to
 * @param {*} options
 * @returns
 */
export default function (src, options = {}) {
	this.src = src;
	this.options = options;

	this.compile = async () => {
		console.log(chalk.blue(`📦 Bundling Javascript from ${this.src}`));

		// Set a default destination if none is provided
		let dest = this.options?.dest || null;
		if (!dest) {
			// Remove the filename from the path because esbuild wants an output directory
			let filename = getFilenameFromPath(this.src);
			let pathWithoutFilename = this.src.replace(filename, '');
			dest = pathWithoutFilename.replace('src', 'dist');
		}

		try {
			await esbuild.build({
				bundle: true,
				minify: this.options?.minify || false,
				entryPoints: [this.src],
				outdir: dest,
			});
		} catch (error) {
			console.log(chalk.red(`🔴 Error compiling Javascript: ${error}`));
		}
	};

	return this;
}
