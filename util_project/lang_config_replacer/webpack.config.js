const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

var config = {
	target: 'node',
	entry: path.join(__dirname, 'src/bin/index.ts'),
	output: {
		filename: 'lang_replacer.js',
		path: path.join( __dirname, 'dist')
	},
	module: {
		rules:[{
			test: /\.tsx?$/,
			include: path.resolve(__dirname, "src/"),
			use: "awesome-typescript-loader", // Change here
			exclude: /node_modules/,
		}],
	},
	resolve: {
		extensions: [".ts", ".js"],
		plugins: [new TsconfigPathsPlugin({/* options: see below */})]
	},

};

//only dev
// if 
config.devtool =  "eval";
config.optimization = {
	minimize: false,
};

module.exports = config;
