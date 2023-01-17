const chalk = require('chalk');
const handler = require('serve-handler');
const http = require('http');

module.exports = (options = {}) => {
	const server = http.createServer((request, response) => {
		return handler(request, response, {
			public: options.public,
		});
	});

	server.listen(options.port, () => {
		console.log(`Running Dev Server at ${chalk.green(`http://localhost:${options.port}`)}`);
	});

	return server;
};
