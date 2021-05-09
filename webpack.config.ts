/*********************************************************************************************************************/
/**********                                             Webpack                                             **********/
/*********************************************************************************************************************/

import Webpack from 'webpack';
import WebpackDev from 'webpack-dev-server';
import Autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import fs from 'fs';
import path from 'path';

const useBabel = true;

const useBabelInDevelopment = false;

const stylesheets = ['./src/styles/index.scss'];

const sourceMapsInProduction = false;

const mode = process.env.NODE_ENV ?? 'development';
const isProduction = mode === 'production';
const isDevelopment = !isProduction;

export interface Configuration extends Webpack.Configuration, WebpackDev.Configuration {}

const config: Configuration = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        bundle: [...stylesheets, './src/main.ts'],
    },
    resolve: {
        extensions: ['.mjs', '.js', '.ts'],
        mainFields: ['browser', 'module', 'main'],
    },
    output: {
        path: path.resolve(__dirname, 'public/build'),
        publicPath: '/build/',
        filename: '[name].js',
        chunkFilename: '[name].[id].js',
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    Autoprefixer(),
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        hot: true,
        stats: 'none',
        contentBase: 'public',
        watchContentBase: true,
    },
    target: isDevelopment ? 'web' : 'browserslist',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    devtool: isProduction && !sourceMapsInProduction ? false : 'source-map',
    stats: {
        chunks: false,
        chunkModules: false,
        modules: false,
        assets: true,
        entrypoints: false,
    },
};

/*********************************************************************************************************************/
/**********                                             Advanced                                            **********/
/*********************************************************************************************************************/

if (isProduction) {
    config.plugins?.push(new CleanWebpackPlugin());

    config.optimization?.minimizer?.push(
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                map: sourceMapsInProduction ? { inline: false, annotation: true } : false,
            },
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {
                            removeAll: !sourceMapsInProduction,
                        },
                    },
                ],
            },
        }),
    );

    if (config.optimization === undefined) {
        config.optimization = {};
    }

    config.optimization.minimize = true;
}

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
const tsconfig = fs.existsSync(tsconfigPath) ? require(tsconfigPath) : {};

if ('compilerOptions' in tsconfig && 'paths' in tsconfig.compilerOptions) {
    const aliases = tsconfig.compilerOptions.paths;

    for (const alias in aliases) {
        const paths = aliases[alias].map((p: string) => path.resolve(__dirname, p));

        const wpAlias = alias.replace(/(\\|\/)\*$/, '');
        const wpPaths = paths.map((p: string) => p.replace(/(\\|\/)\*$/, ''));

        if (config.resolve && config.resolve.alias) {
            if (!(wpAlias in config.resolve.alias) && wpPaths.length) {
                (config.resolve.alias as any)[wpAlias] = wpPaths.length > 1 ? wpPaths : wpPaths[0];
            }
        }
    }
}

if (useBabel && (isProduction || useBabelInDevelopment)) {
    const loader = {
        loader: 'babel-loader',
        options: {
            sourceType: 'unambiguous',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        debug: false,
                    },
                ],
            ],
            plugins: [
                [
                    '@babel/plugin-proposal-decorators',
                    {
                        legacy: true,
                    },
                ],
                ['@babel/plugin-proposal-class-properties'],
                [
                    '@babel/plugin-transform-runtime',
                    {
                        corejs: 3,
                    },
                ],
            ],
        },
    };

    config.module?.rules?.unshift({
        test: /\.(?:m?js|ts)$/,
        include: [path.resolve(__dirname, 'src'), path.resolve('node_modules')],
        exclude: [/node_modules[/\\](css-loader|core-js|webpack|regenerator-runtime)/],
        use: loader,
    });
}

export default config;
