const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { isDevelopment } = require('./src/utils/modes');

const PATH_TO_INDEX = path.join(__dirname, 'src', 'index.tsx');
const PATH_TO_HTML = path.join(__dirname, 'public', 'index.html');
const PATH_TO_BUILD = path.join(__dirname, 'build');

const config = {
    entry: {
        index: PATH_TO_INDEX,
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

        // Cleaning up the /build folder
        new CleanWebpackPlugin(),

        // simplifies creation of HTML files to serve your webpack bundles
        new HtmlWebpackPlugin({
            template: PATH_TO_HTML
        }),

        // extracts CSS into separate files
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'main.css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        /**
         * A secure webpack plugin that supports dotenv and other environment variables
         * and only exposes what you choose and use.
         * 
         * https://github.com/mrsteele/dotenv-webpack
         */
        new Dotenv(),
        
    ],
    devServer: {
        contentBase: PATH_TO_BUILD,
        compress: true,
        historyApiFallback: true,
        port: 3000
    },
    output: {
        path: PATH_TO_BUILD,
        filename: '[name].bundle.js',
        publicPath: '/',
    },
};

module.exports = (env) => {
    if (env && env.ANALYZE_BUNDLE) {
        config.plugins = [
            // interactive tree map visualization of the contents of all bundles
            new BundleAnalyzerPlugin({
                analyzerPort: 3001 // Prevents build errors when running --analyze:bundle
            }),
        ].concat(config.plugins);
    }
    return  config
};