#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { getDirFromPath } from './lib/helpers.js';
import Watcher from './lib/Watcher.js';
const argv = yargs(hideBin(process.argv)).argv;

try {
	const isWatching = argv?.watch || false;
	const pathToConfig = [process.cwd(), argv?.dir, 'fascio.config.js'].join('/').replace('//', '/');
	const userConfig = await import(pathToConfig);

	userConfig.default({ isWatching, changedFile: null, isFirstPass: true });

	if (isWatching) {
		let dir = `${getDirFromPath(pathToConfig)}/src/**/*`; // TODO: Make this configurable
		const watcher = new Watcher({ dir, callback: userConfig.default, context: { isWatching } });
	}
} catch (error) {
	console.log(chalk.red(`🔴 Error: `) + chalk.white(error.message));
}
