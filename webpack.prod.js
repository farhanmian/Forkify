const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = merge(common,  {
    mode: 'production',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/bundle.js'
	},
	devServer: {
		contentBase: './build'
	},
	plugins: [
        new MiniCssExtractPlugin({})
	],
	module: {
		rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                },
            },
            {
            	test: /\.scss$/,
            	use: [
            		MiniCssExtractPlugin.loader,	//3) Extract css into files
            		'css-loader',	//2) Trun css into comman js
            		'sass-loader'   //1) Trun sass into css
            	]
            }
        ]
	}
})