module.exports = {
	mode:'development',
	entry:'./src/main.js',
	output: {
		path: __dirname + '/dist/',
		filename: 'bundle.js'
	},
	module:{
		rules:[
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}