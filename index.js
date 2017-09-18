var _ = require('lodash');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')
var path = require('path');
var url = require('url');
var proxy = require('proxy-middleware');
var app = express();
var isDeveloping = process.env.NODE_ENV !== 'production';
var port = 3000;

if (isDeveloping) {
	var webpack = require('webpack');
	var webpackMiddleware = require('webpack-dev-middleware');
	var webpackHotMiddleware = require('webpack-hot-middleware');
	var config = require("./webpack.config.js");
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  // app.get('*', function response(req, res) {
    // res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    // res.end();
  // });
} else {
  // app.use(express.static(__dirname + '/dist'));
  // app.get('*', function response(req, res) {
  //   res.sendFile(path.join(__dirname, 'dist/index.html'));
  // });
}

app.set('port', port);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var i = 2;
setInterval(function () {
	i = 1;
}, 10000);
app.use('/api', function (req, res) {
	setTimeout(function () {
		i = i + 2;
		proxy('https://www.quandl.com/api')(req, res);
	}, i * 1000);
});
// app.use('/api', proxy(url.parse('https://www.quandl.com/api')));

app.get('*', function(req, res) {
	res.render('app');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
