const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: ['babel-polyfill' ,'./src/js/index.js']
	},
	
	devServer: {
		contentBase: './build'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
			}),
		new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery' 
        }),
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
				test: /\.html$/,
				use: 'html-loader'
			},
            {
            	test: /\.(jpg|png|svg)$/,
            	exclude: /node_modules/,
            	use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'img'
					}
				}

            	
            },
            
        ]
	}
}