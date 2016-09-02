/*eslint-disable */

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import Prismic from 'prismic.io';
import apicache from 'apicache';
import bodyParser from 'body-parser';
import _ from 'lodash';
import device from 'express-device';
import request from 'request';
import shrinkRay from 'shrink-ray';

const cache = apicache.middleware;
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3200 : process.env.PORT;
const app = express();

if (isDeveloping) {
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

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));


  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(require('prerender-node'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(device.capture());
  app.use(shrinkRay({brotli: ['quality'], zlib: {level: 9}}));
  express.static.mime.define({'text/css': ['css']});
  express.static.mime.define({'font/truetype': ['ttf']});
  express.static.mime.define({'application/font-woff': ['woff']});
  express.static.mime.define({'application/font-woff2': ['woff2']});
  express.static.mime.define({'font/opentype': ['otf']});

  app.use(express.static(__dirname + '/dist'));


}


app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});