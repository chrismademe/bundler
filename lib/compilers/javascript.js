const chalk = require('chalk');
const esbuild = require('esbuild');
const fs = require('fs-extra');
const UglifyJS = require('uglify-js');

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
module.exports = function (src, dest, options = {}) {
	this.src = src;
	this.dest = dest;
	this.options = options;
	this.result = '';

	this.compile = () => {
		console.log(chalk.blue(`🟢 Bundling Javascript`));

		let compiledFiles = [];

		let result = esbuild.buildSync({
			bundle: true,
			minify: false,
			entryPoints: [src],
			write: false,
			outdir: '<stdout>',
		});

		for (let out of result.outputFiles) {
			compiledFiles.push(new TextDecoder('utf-8').decode(out.contents));
		}

		this.result = compiledFiles.join('\n');
		return this;
	};

	this.minify = () => {
		console.log(chalk.blue('📦 Minifying Javascript'));
		const result = UglifyJS.minify(this.result);
		this.result = result.code;
		return this;
	};

	this.write = () => {
		return fs.outputFile(dest, this.result);
	};

	return this;
};
