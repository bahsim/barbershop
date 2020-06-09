const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const config = require('../config')

const appPort = process.env.APP_PORT 	|| config.appPort;
const appMode = process.env.NODE_ENV 	|| config.appMode;

if (appMode === 'development') {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackConfig = require('../webpack.config');
	const webpackCompiler = webpack(webpackConfig);

	app.use(
		webpackDevMiddleware(webpackCompiler, {
			noInfo: true,
			publicPath: webpackConfig.output.publicPath
		})
	);
}

app.use(bodyParser.json());
app.use(express.static(config.pathStatic));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, '..','/client/index.html'))
});

app.listen(appPort, (error) => {
	if (error)
		return console.error(error);

	console.log("Server started on port", appPort);
});
