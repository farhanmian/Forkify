const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common,  {
    mode: 'development',
	
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/bundle.[contentHash].js'
	},
	devServer: {
		contentBase: './build'
    },
    module: {
        rules: [
            {
            	test: /\.scss$/,
            	use: [
            		'style-loader',	//3) Inject style into DOM
            		'css-loader',	//2) Trun css into comman js
            		'sass-loader'   //1) Trun sass into css
            	]
            }
        ]
    }
	
	
})