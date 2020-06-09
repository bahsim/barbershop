module.exports = {

  mode: 'production',

	entry: {
    index: [ __dirname + '/client/index.js' ]
	},

  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    publicPath: '/'
  },

	plugins: [],

	module: {
    rules: [
      {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }, {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        'test': /\.(jsx?)$/,
        'loaders': ['babel-loader'],
        'exclude': [/node_modules/]
      }
		]
  }

}
