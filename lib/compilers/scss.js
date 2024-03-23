import chalk from 'chalk';
import esbuild from 'esbuild';
import sassGlob from 'esbuild-sass-glob';
import { sassPlugin } from 'esbuild-sass-plugin';

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
	this.meta = null;

	this.compile = async () => {
		console.log(chalk.cyan(`🟢 Compiling SCSS from ${this.src}`));

		// Set a default destination if none is provided
		let dest = this.options?.dest || null;
		if (!dest) {
			dest = this.src.replace('src', 'dist');
		}

		try {
			let result = await esbuild.build({
				entryPoints: [this.src],
				minify: this.options?.minify || false,
				outdir: dest,
				plugins: [
					sassPlugin({
						precompile: this.options?.glob && this.sassGlob,
					}),
				],
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
			console.log(chalk.red(`🔴 Error compiling SCSS: ${error}`));
			this.meta = {
				src: this.src,
				dest,
				inputs: null,
				errors: [error],
				warnings: null,
			};
		}
	};

	this.sassGlob = (source, pathname) => {
		return sassGlob(source, pathname);
	};

	return this;
}
