'use strict';

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LZMACompressionPlugin from 'lzma-compression-webpack-plugin';

const nodeModulesPath = path.join(__dirname, './node_modules');
const appModulesPath = path.join(__dirname, './app');
const cssModulesPath = path.join(__dirname, './app/css');

let webpackConfig = {
  context: appModulesPath,
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: 'http://localhost:3000'
  },
  resolve: {
    root: [
      __dirname,
      nodeModulesPath,
      appModulesPath,
      cssModulesPath
    ],
    modulesDirectories: [
      nodeModulesPath,
      appModulesPath,
      cssModulesPath
    ],
    alias: {
      'cssuseragent': 'cssuseragent',
      marionette: 'backbone.marionette',
      'backbone.radio': 'backbone.radio',
      'backbone.validation': 'backbone.validation/dist/backbone-validation',
      jquery: 'jquery/dist/jquery',
      bootstrap: path.join(appModulesPath, 'utils/bootstrap.min.js'),
      ga: path.join(appModulesPath, 'utils/googleAnalytics.js'),
      channels: path.join(appModulesPath, 'utils/event_channels'),
      constants: path.join(appModulesPath, 'constants'),
      Handlebars: 'handlebars'
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'lodash'
    }),
    new HtmlWebpackPlugin({
      title: 'Responsive Digital - Responsive Web Application, Design & Development New York',
      template: 'index.ejs',
      inject: true
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-2')
          ],
          plugins: [
            require.resolve('babel-plugin-add-module-exports')
          ]
        }
      },
      {
        test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader?helperDirs[]=" + path.join(__dirname, '/app/utils/handlebars_helpers')
      },

      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=1000&minetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?limit=10!img?minimize"},

    ],
    postLoaders: [],
    preLoaders: []
  },
  postcss: (bundler) => {
    return {
      load: [require('postcss-import')({addDependencyTo: bundler})],
      compile: [
        require('precss')(),
        require('autoprefixer')({browsers: 'last 2 versions'}),
      ],
      minimize: [
        require('cssnano')({
          safe: false,
          autoprefixer: true,
          discardComments: {
            removeAll: true
          },
          calc: true,
          colormin: true,
          convertValues: true,
          core: true,
          discardDuplicates: true,
          discardEmpty: true,
          discardOverridden: true,
          discardUnused: false, // is the cause of font face hell <3
          filterOptimiser: true,
          functionOptimiser: true,
          mergeIdents: true,
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifyParams: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeUrl: false,
          orderedValues: true,
          reduceBackgroundRepeat: true,
          reduceIdents: true,
          reduceInitial: true,
          reducePositions: true,
          reduceTimingFunctions: true,
          reduceTransforms: true,
          svgo: false,
          uniqueSelectors: true,
          zindex: true
        })
      ]
    }
  }
};


switch(process.env.NODE_ENV) {

  case 'production':
    webpackConfig.entry = [
      'bootstrap-loader',
      path.join(__dirname, 'webpack.utils.js'),
      path.join(__dirname, 'app/main.js')
    ];
    webpackConfig.output.publicPath = '/';
    webpackConfig.output.filename = '[name]-[hash].js';
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
      new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          properties: true,
          sequences: true,
          dead_code: true,
          conditionals: true,
          comparisons: true,
          evaluate: true,
          booleans: true,
          unused: true,
          loops: true,
          unsafe: true,
          hoist_funs: true,
          cascade: true,
          if_return: true,
          join_vars: true,
          drop_console: false,
          drop_debugger: false,
          hoist_vars: true,
          negate_iife: true,
          side_effects: true,
          collapse_vars: true,
          pure_getters: true,
          pure_funcs: false,
          keep_fargs: true,
        },
        mangle: {
          toplevel: true,
          sort: true,
          eval: true,
          properties: true
        },
        comments: false,
        stats: 0,
        'mangle-props': true,
        'mangle-regex ': true,
        'pure-funcs': true

      }),
      new LZMACompressionPlugin({
        asset: '[path][query]',
        algorithm: 'lzma',
        test: /\.js$/,
        threshold: 10240,
        lzmaMode: 9
      })
    );

    webpackConfig.module.loaders.push(
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]_[hash:base64:5]',
          'postcss-loader?pack=minimize',
          'postcss-loader?pack=compile',
          'postcss-loader?pack=load',
          'sass'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]_[hash:base64:5]',
          'postcss-loader?pack=minimize',
          'postcss-loader?pack=compile',
          'postcss-loader?pack=load'
        ],
      },
      {test: /\.(jpe?g|png|gif|mp4|ogv|webm|pdf)/, exclude: /(fonts)/, loaders: ['file-loader', 'img?minimize']},
    );
    webpackConfig.imagemin = {
      gifsicle: {interlaced: false},
      jpegtran: {
        optimize: true,
        progressive: true,
        arithmetic: false
      },
      optipng: {optimizationLevel: 7},
      svgo: {
        plugins: [
          {cleanupAttrs: true}, //cleanup attributes from newlines, trailing and repeating spaces
          {removeDoctype: true}, //remove doctype declaration
          {removeXMLProcInst: true}, //remove XML processing instructions
          {removeComments: true}, //remove comments
          {removeMetadata: true}, //remove <metadata>
          {removeTitle: true}, //remove <title> (disabled by default)
          {removeDesc: true}, //remove <desc> (only non-meaningful by default)
          {convertColors: {shorthex: true}}, //convert colors (from rgb() to #rrggbb, from #rrggbb to #rgb)
          {convertPathData: true}, //convert Path data to relative or absolute whichever is shorter, convert one segment to another, trim useless delimiters, smart rounding and much more
          {removeUselessDefs: true}, //remove elements of <defs> without id
          {removeEditorsNSData: true}, // remove editors namespaces, elements and attributes
          {removeEmptyAttrs: true}, //remove empty attributes
          {removeHiddenElems: false}, // remove hidden elements
          {removeEmptyText: true}, //remove empty Text elements
          {removeEmptyContainers: true},//remove empty Container elements
          {removeViewBox: true},// remove viewBox attribute when possible (disabled by default)
          {cleanUpEnableBackground: true},//remove or cleanup enable-background attribute when possible
          {convertStyleToAttrs: false}, //convert styles into attributes
          {convertTransform: true},//collapse multiple transforms into one, convert matrices to the short aliases and much more
          {removeUnknownsAndDefaults: true},//remove unknown elements content and attributes, remove attrs with default values
          {removeNonInheritableGroupAttrs: true},//remove non-inheritable group's "presentation" attributes
          {removeUselessStrokeAndFill: true}, //remove useless stroke and fill attrs
          {removeUnusedNS: true}, //remove unused namespaces declaration
          {cleanupIDs: true}, //remove unused and minify used IDs
          {cleanupNumericValues: true}, // round numeric values to the fixed precision, remove default 'px' units
          {moveElemsAttrsToGroup: true}, // move elements attributes to the existing group wrapper
          {moveGroupAttrsToElems: false},// move some group attributes to the content elements
          {collapseGroups: true}, //collapse useless groups
          {removeRasterImages: true},// remove raster images (disabled by default)
          {mergePaths: true}, //merge multiple Paths into one (can mess with animations)
          {convertShapeToPath: false}, //convert some basic shapes to path
          {sortAttrs: false}, //sort element attributes for epic readability (disabled by default)
          {transformsWithOnePath: true}, //apply transforms, crop by real width, center vertical alignment and resize SVG with one Path inside (disabled by default)
          {removeDimensions: false},// remove width/height attributes if viewBox is present (disabled by default)
          {removeAttrs: false}, // remove attributes by pattern (disabled by default)
          {addClassesToSVGElement: false},// add classnames to an outer <svg> element (disabled by default)
          {removeStyleElement: false} //remove <style> elements (disabled by default)
        ]
      }
    };
    break;
  case 'development':
    webpackConfig.entry = [
      'webpack-hot-middleware/client?reload=true',
      'bootstrap-loader',
      path.join(__dirname, 'app/main.js')
    ],
      webpackConfig.watch = true;
    webpackConfig.devtool = 'cheap-module-source-map';
    webpackConfig.output.publicPath = 'http://0.0.0.0:3200/';
    webpackConfig.module.loaders.push(
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]&sourceMap',
          'sass?sourceMap',
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
        ],
      },
      {test: /\.(jpe?g|png|mp4|ogv|webm|pdf|gif)/, loader: "file-loader?limit=10"}
    );

    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new webpack.HotModuleReplacementPlugin()
    );
    break;
}

module.exports = webpackConfig;