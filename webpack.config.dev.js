const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/templates/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.html'));

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
	devServer:{
		static: {
			directory: './src'
		},
    hot: true,
  },
  entry: {
    index: `${PATHS.src}/js/index.js`,
		post: `${PATHS.src}/js/post.js`,
  },
  output: {
    filename: `js/[name].js`,
    path: PATHS.dist,
		publicPath: '/'
  },
	optimization: {
    splitChunks: {
			chunks: "initial",
			cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
		}
	},
	resolve: {
		alias: {
			'@': path.resolve('./src'),
		},
	},
  module: {
    rules: [
			{
				test: /\.js$/,
				loader: 'esbuild-loader',
				exclude: '/node_modules/'
    	},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
    	},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
						},
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									autoprefixer(),
									cssnano(),
								],
							},
						},
					},
				]
    	},
			{
				test: /\.(woff|woff2)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]',
				},
			},
			{
				test: /(\.(jpe?g|png|webp|gif|svg)|\.svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/img/[name][ext]',
				},
			}
		]
  },
  plugins: [
    new CopyWebpackPlugin({
			patterns: [
				{ from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.dist}/${PATHS.assets}img` },
			]
		}),
    new CleanWebpackPlugin(),
    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
		...PAGES.map((page) => new HtmlWebpackPlugin({
			filename: `./${page}`,
			template: `${PAGES_DIR}/${page}`,
			chunks: [
				page.replace('.html', '')
			],
		})),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].css',
		}),
  ],
}