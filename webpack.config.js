const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const { isDevelopment } = require('./utils/modes');

const pathToJS = path.join(__dirname, 'src', 'index.tsx');
const pathToHTML = path.join(__dirname, 'public', 'index.html');
const pathToBuild = path.join(__dirname, 'build');

module.exports = {
    entry: {
        index: pathToJS,
    },

    // style of source mapping to enhance the debugging process
    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                    },
                }, ],
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: 'tslint-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [

                    // Inject CSS into the DOM
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDevelopment(),
                        },
                    },

                    // The css-loader interprets @import and url() like import/require() and will resolve them
                    'css-loader',

                    // Loads a Sass/SCSS file and compiles it to CSS
                    'sass-loader',
                ],
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss']
    },
    optimization: {
        nodeEnv: 'production',
        minimizer: [
            // minify JavaScript
            new UglifyJsPlugin(),
            // minify scc
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [

        // interactive treemap visualization of the contents of all bundles
        new BundleAnalyzerPlugin({
            analyzerPort: process.env.VUE_CLI_MODERN_BUILD ? 8888 : 9999 // Prevents build errors when running --modern
        }),

        // Cleaning up the /build folder
        new CleanWebpackPlugin(),

        // simplifies creation of HTML files to serve your webpack bundles
        new HtmlWebpackPlugin({
            template: pathToHTML
        }),

        // extracts CSS into separate files
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'main.css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
        
    ],
    devServer: {
        contentBase: pathToBuild,
        compress: true,
        historyApiFallback: true,
        port: 3000
    },
    output: {
        path: pathToBuild,
        filename: '[name].bundle.js',
        publicPath: '/',
    },
};