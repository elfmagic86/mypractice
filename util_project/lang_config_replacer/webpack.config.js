const path = require('path');

module.exports = {
	// devtool: "source-map", //only dev

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
		extensions: [".ts", ".js"]
	},
};
