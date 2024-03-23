import chalk from 'chalk';
import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';

import { getFilenameFromPath } from '../helpers.js';

/**
 * Svelte Compiler
 *
 * Compiles and bundles Svelte files using esbuild
 *
 * @param {*} src - The input file(s) to compile
 * @param {*} dest - The output file to write to
 * @param {*} options
 * @returns
 */
export default function (src, options = {}) {
	this.src = src;
	this.options = options;
	this.meta = null;

	this.compile = async () => {
		console.log(chalk.cyan(`📦 Bundling Svelte from ${this.src}`));

		// Set a default destination if none is provided
		let dest = this.options?.dest || null;
		if (!dest) {
			// Remove the filename from the path because esbuild wants an output directory
			let filename = getFilenameFromPath(this.src);
			let pathWithoutFilename = this.src.replace(filename, '');
			dest = pathWithoutFilename.replace('src', 'dist');
		}

		try {
			let result = await esbuild.build({
				bundle: true,
				mainFields: ['svelte', 'browser', 'module', 'main'],
				conditions: ['svelte', 'browser'],
				format: 'esm',
				minify: this.options?.minify || false,
				entryPoints: [this.src],
				plugins: [sveltePlugin()],
				outdir: dest,
				metafile: true,
			});

			this.meta = {
				src: this.src,
				dest,
				inputs: result.metafile.inputs,
				outputs: result.metafile.outputs,
				errors: result.errors.length ? result.errors : null,
				warnings: result.warnings.length ? result.warnings : null,
			};
		} catch (error) {
			console.log(chalk.red(`🔴 Error compiling Svelte: ${error}`));
			this.meta = {
				src: this.src,
				dest,
				inputs: null,
			};
		}
	};

	return this;
}
