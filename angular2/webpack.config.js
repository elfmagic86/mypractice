var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

// Webpack Config
var webpackConfig = {
  entry: {
    'main': './src/main.browser.ts',
    // keep polyfills
    'polyfills': './src/polyfills.browser.ts',
    // and vendor files separate
    'vendor': './src/vendor.browser.ts'
  },
  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
      path.resolve(__dirname, './src'),
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity }),
  ],
  module: {
    // TODO loaders대신 use 사용형태로 변경하자
    rules: [
      {
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
        },
        'angular2-template-loader',
        'angular2-router-loader'
        ]
      },
      /*
       * to string and css loader support for *.css files (from Angular components)
       * Returns file content as string
       */
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
      /*
       * to string and sass loader support for *.scss files (from Angular components)
       * Returns compiled css content as string
       *
       */
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
        // TODO angular2-webpack-starter에서는 common에서는 제외시키고, 필요한데서 다시 include하는 방식을 사용함.
        // exclude: [path.resolve(__dirname, './src'), path.resolve(__dirname, './styles')]
      },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  }
};

// Our Webpack Defaults
var defaultConfig = {
  devtool: 'source-map',

  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    // TODO If Webpack should resolve extension-less files for styles and HTML, add .css and .html to the list.
    extensions: ['.ts', '.js']
  },
  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
};

// TODO multi? dev/prod, client/server
module.exports = [
  webpackMerge(defaultConfig, webpackConfig)
];
