const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/templates/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

const pathToSpriteIcons = path.resolve(__dirname, 'src/assets/img/icons/sprite');

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: `${PATHS.src}/js/index.js`,
  },
  output: {
    filename: `js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
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
				loader: 'handlebars-loader'
    	},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
    	}, 
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			},
			{
				test: /(\.(jpe?g|png|webp|gif)|\.svg)$/,
				exclude: [pathToSpriteIcons],
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						context: 'src/',
						esModule: false,
					},
				},
			},
			{
				test: /\.svg$/,
				include: [
					pathToSpriteIcons,
				],
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {

						},
					},
					'svg-transform-loader',
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{
									removeViewBox: false,
								},
								{
									removeDimensions: true,
								},
								{
									removeAttrs: {
										attrs: '(stroke|fill)',
									},
								},
							],
						},
					},
				],
			},
		]
  },
  plugins: [
    new CopyWebpackPlugin({
			patterns: [
				{ from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.dist}/${PATHS.assets}img` },
				{ from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.dist}/${PATHS.assets}fonts` },
			]
		}),
    new CleanWebpackPlugin(),
    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page}`
    }))
  ],
}