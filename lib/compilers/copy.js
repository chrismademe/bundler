const chalk = require('chalk');
const fs = require('fs-extra');

/**
 * Javascript Compiler
 *
 * Compiles and bundles Javascript files using esbuild
 *
 * @param {*} src - The input file(s) to compile
 * @param {*} dest - The output file to write to
 * @returns
 */
module.exports = function (src, dest) {
	this.src = src;
	this.dest = dest;
	this.result = '';

	this.compile = () => {
		console.log(chalk.blue(`📂 Copying files from ${chalk.white(src)} to ${chalk.white(dest)}`));

		fs.copy(src, dest, (err) => {
			if (err) {
				console.log(chalk.red(`🔴 Error copying files`));
				console.log(err);
			}
		});

		return this;
	};

	return this;
};
