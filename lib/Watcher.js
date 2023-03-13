import chalk from 'chalk';
import chokidar from 'chokidar';
import { getFilenameFromPath, getExtensionFromFilename } from './helpers.js';

class Watcher {
	constructor(args) {
		/**
		 * Callback to pass to the watcher when something changes
		 */
		this.callback = args.callback;

		/**
		 * Context to pass to the callback
		 */
		this.context = args.context;

		/**
		 * Directory to watch
		 */
		this.dir = args.dir;

		/**
		 * Options to pass to the Chkoidar
		 */
		this.options = { persistent: true, ...args.options };

		/**
		 * Events to watch for
		 */
		this.watchEvents = ['add', 'change', 'unlink', 'addDir', 'unlinkDir'];

		/**
		 * Run the watcher!
		 */
		this.init();
	}

	init() {
		this.watcher = chokidar.watch(this.dir, this.options);

		this.watcher.on('error', (error) => {
			console.log(chalk.red(`🔴 Error: ${error}`));
		});

		this.watcher.on('ready', () => {
			console.log(chalk.blue('👀 Watching for changes...'));

			this.watchEvents.forEach((event) => {
				this.watcher.on(event, (path) => {
					const fileName = getFilenameFromPath(path);
					const fileType = getExtensionFromFilename(fileName);
					this.callback({
						...this.context,
						changedFile: {
							name: fileName,
							type: fileType,
							path,
						},
						isFirstPass: false,
					});
				});
			});
		});
	}
}

export default Watcher;
