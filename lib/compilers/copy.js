import chalk from 'chalk';
import fse from 'fs-extra';

/**
 * Javascript Compiler
 *
 * Compiles and bundles Javascript files using esbuild
 *
 * @param {*} src - The input file(s) to copy
 * @param {object} options - Options
 * @param {string} options.dest - Where to output files
 * @returns
 */
export default function (src, options) {
	this.src = src;
	this.options = options;

	this.compile = () => {
		let dest = this.options?.dest || null;
		if (!dest) {
			dest = src.replace('src', 'dist');
		}

		console.log(chalk.blue(`📂 Copying files from ${chalk.white(src)} to ${chalk.white(dest)}`));

		fse.copy(src, dest, (err) => {
			if (err) {
				console.log(chalk.red(`🔴 Error copying files`));
				console.log(err);
			}
		});
	};

	return this;
}
