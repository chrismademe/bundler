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
	this.meta = null;

	this.compile = async () => {
		let dest = this.options?.dest || null;
		if (!dest) {
			dest = src.replace('src', 'dist');
		}

		console.log(chalk.cyan(`📂 Copying files from ${chalk.white(src)} to ${chalk.white(dest)}`));

		this.meta = {
			src: this.src,
			dest,
		};

		try {
			await fse.copy(src, dest);
			console.log(chalk.green(`✅ Files copied successfully`));
		} catch (err) {
			console.log(chalk.red(`🔴 Error copying files: ${err.message}`));
			this.meta.errors = [err];
		}
	};

	return this;
}
