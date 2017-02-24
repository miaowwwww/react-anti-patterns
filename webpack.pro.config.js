var webpack = require('webpack');
var webpackMd5Hash = require('webpack-md5-hash');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',

	entry: {
		main: './src/index.js',
		vendor: ['react', 'react-dom']
	},
	
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name][hash:6].js',
		chunkFilename: 'js/[name][chunkhash:6].js',
		sourceMapFilename: '[name][hash:6].map'
	},

	module: {
		rules: [
			{
				test: /\.less?$/,
				use: extractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?module', 'postcss-loader', 'less-loader'],
					publicPath: "../"
				})
			},
			{
				test: /\.js?$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['es2015', { modules: false }], 'react', 'stage-0'],
						plugins: ['syntax-dynamic-import']
					}
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: ['url-loader?limit=40000&name=images/[name][hash:6].[ext]']
			}
		]
	},

	plugins: [
		new cleanWebpackPlugin(['dist'], {
			root: '',
			verbose: true,
			dry: false,
			exclude: []
		}),
		new htmlWebpackPlugin({
			filename: 'index.html',
			title: 'anti-patterns-react'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: {
					plugins: [
						autoprefixer({ 
							browsers: ['last 4 versions'],
							flexbox: false 
						})
					]
				}
			}
		}),
		new webpackMd5Hash(),
		new extractTextPlugin({
			filename: 'style/index-[contenthash:6].css',
			allChunks: true
		})
	]
}