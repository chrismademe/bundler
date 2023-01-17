#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const { getDirFromPath } = require('./lib/helpers');
const Watcher = require('./lib/Watcher');

try {
	const isWatching = argv?.watch || false;
	const pathToConfig = [process.cwd(), argv?.dir, 'fascio.config.js'].join('/').replace('//', '/');
	const userConfig = require(pathToConfig);

	userConfig({ isWatching, changedFile: null, isFirstPass: true });

	if (isWatching) {
		let dir = `${getDirFromPath(pathToConfig)}/src/**/*`; // TODO: Make this configurable
		const watcher = new Watcher({ dir, callback: userConfig, context: { isWatching } });
	}
} catch (error) {
	console.log(chalk.red(`🔴 Error: `) + chalk.white(error.message));
}
