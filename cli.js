#!/usr/bin/env node

const chokidar = require('chokidar');
const chalk = require('chalk');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const { getDirFromPath } = require('./lib/helpers');
const devServer = require('./lib/dev-server');

try {
	const isWatching = argv?.watch || false;
	const isServing = argv?.serve || false;
	const watchEvents = ['add', 'change', 'unlink', 'addDir', 'unlinkDir'];
	const pathToConfig = [process.cwd(), argv?.dir || '', 'fascio.config.js'].join('/');
	const userConfig = require(pathToConfig);

	userConfig(isWatching);
	devServer({ public: argv?.dir || '.', port: argv?.port || 3000, autoRefresh: isWatching });

	if (isWatching) {
		let dir = `${getDirFromPath(pathToConfig)}/src/**/*`; // TODO: Make this configurable
		const watcher = chokidar.watch(dir, {
			persistent: true,
		});

		watcher.on('error', (error) => {
			console.log(chalk.red(`🔴 Error: ${error}`));
		});

		watcher.on('ready', () => {
			console.log(chalk.blue('👀 Watching for changes...'));

			watchEvents.forEach((event) => {
				watcher.on(event, () => {
					userConfig(isWatching);
				});
			});
		});
	}
} catch (error) {
	console.log(chalk.red(`🔴 Error: `) + chalk.white(error.message));
}
