import chalk from 'chalk';
import esbuild from 'esbuild';
import fse from 'fs-extra/esm';
import UglifyJS from 'uglify-js';

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
		console.log(chalk.blue(`📦 Bundling Javascript`));

		// Set a default destination if none is provided
		let dest = this.options?.dest || null;
		if (!dest) {
			dest = this.src.replace('src', 'dist');
		}

		await esbuild.buildSync({
			bundle: true,
			minify: this.options?.minify || false,
			entryPoints: [this.src],
			outdir: dest,
		});
	};

	return this;
};
