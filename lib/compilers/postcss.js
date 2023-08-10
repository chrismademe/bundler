import chalk from 'chalk';
import esbuild from 'esbuild';
import postcss from 'esbuild-postcss';

/**
 * PostCSS
 *
 * Compile PostCSS
 * @param {string} src
 * @param {object} options
 */
export default function (src, options = {}) {
	this.src = src;
	this.options = options;

	this.compile = async () => {
		console.log(chalk.blue(`🟢 Compiling PostCSS from ${this.src}`));

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
					postcss(this.options?.extensions || ['.postcss', '.css']),
				],
			});
		} catch (error) {
			console.log(chalk.red(`🔴 Error compiling PostCSS: ${error}`));
		}
	};

	return this;
}
