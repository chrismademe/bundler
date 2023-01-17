const Fascio = require('fascio');

/**
 * Fascio will pass your some useful context that you can use to
 * control how and when assets are bundled.
 *
 * @param {boolean} isWatching True when Fascio is run with --watch
 * @param {object} changedFile The file that changed, if any
 * @param {string} changedFile.path The path to the file that changed
 * @param {string} changedFile.type The type of file that changed
 * @param {string} changedFile.name The name of the file that changed
 * @param {boolean} isFirstPass True when Fascio is run for the first time
 */
module.exports = ({ isWatching, changedFile, isFirstPass }) => {
	/**
	 * Everything here will run on both development and production
	 * but only when the file that changed is in the assets folder
	 */
	if (isFirstPass || changedFile?.path.includes('src/assets')) {
		Fascio.copy('example/src/assets', 'example/dist/assets');
	}

	/**
	 * Development
	 * These will only run when Fascio is run with --watch
	 */
	if (isWatching) {
		/**
		 * Only run the SCSS task if the file that changed is a SCSS file
		 */
		if (isFirstPass || changedFile?.type === 'scss') {
			Fascio.scss('example/src/scss/style.scss').write('example/dist/css');
		}

		/**
		 * Only run the JS task if the file that changed is a JS file
		 */
		if (isFirstPass || changedFile?.type === 'js') {
			Fascio.js('example/src/js/main.js').write('example/dist/js');
		}

		return;
	}

	/**
	 * Production
	 * These will only run when Fascio is run without --watch
	 */
	Fascio.scss('example/src/scss/style.scss').minify().write('example/dist/css');
	Fascio.js('example/src/js/main.js').minify().write('example/dist/js');
};
