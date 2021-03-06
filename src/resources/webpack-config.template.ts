export const WEBPACK_CONFIG = () => `
const rmrf = require('rimraf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const getPlugins = require('./webpack.plugins');
const getMode = require('./webpack.modes');
const BUILD_FOOLDER = require('./webpack.const').BUILD_FOOLDER;

module.exports = (env, argv) => {
    const isProd = getMode(argv.mode);
    rmrf.sync(BUILD_FOOLDER);
    return {
        entry: './src/index.ts',
        output: {
            path: __dirname + BUILD_FOOLDER,
            filename: '[name].[hash].bundle.js',
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx', '.jsx','.json', ]
        },
        module: {
            rules: [{
                enforce: 'pre',
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'tslint-loader',
            }, {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }, {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: isProd,
                            sourceMap: isProd,
                            url: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isProd
                        }
                    }]
                })
            }]
        },
        plugins: getPlugins(isProd, null),
        optimization: {
            minimize: isProd,
            noEmitOnErrors: true,
            removeAvailableModules: true,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        devtool: isProd ? false : 'source-map',
        devServer: {
            https: true,
            host: '0.0.0.0',
            inline: true,
            historyApiFallback: true,
            contentBase: __dirname + BUILD_FOOLDER
        }
    };
};
`;
