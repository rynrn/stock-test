var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');

module.exports = {
	entry: [
		'./src/index.js' // Your appʼs entry point
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: loaders.concat([{ test: /\.js$/, loader: "webpack-strip?strip[]=debug,strip[]=console.log" }])
	},
	plugins: [
		new webpack.DefinePlugin({
				'process.env.NODE_ENV': '"production"'
		})
	]
};
