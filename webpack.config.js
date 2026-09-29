const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const pages = ['index', 'o-firmie', 'oferta', 'kontakt', 'zapytaj', '404'];

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      main: './src/app.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      publicPath: '',
      clean: true,
    },
    devtool: isProd ? false : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                // Ścieżki ../img/... zostają — pliki kopiujemy do dist/img
                url: false,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: { comments: false },
            compress: { drop_console: true },
          },
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                // Bootstrap ma URL-encoded SVG w data: — svgo ich nie parsuje
                svgo: false,
              },
            ],
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'img', to: 'img' },
          { from: 'robots.txt', to: 'robots.txt' },
          { from: 'sitemap.xml', to: 'sitemap.xml' },
        ],
      }),
      ...pages.map(
        (name) =>
          new HtmlWebpackPlugin({
            template: `./${name}.html`,
            filename: `${name}.html`,
            inject: 'body',
            scriptLoading: 'defer',
            minify: isProd
              ? {
                  collapseWhitespace: true,
                  removeComments: true,
                  removeRedundantAttributes: true,
                  removeScriptTypeAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  useShortDoctype: true,
                  minifyCSS: true,
                  minifyJS: true,
                }
              : false,
          })
      ),
    ],
    resolve: {
      extensions: ['.js'],
    },
    performance: {
      hints: false,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 8080,
      hot: true,
      open: true,
      watchFiles: ['*.html', 'css/**/*', 'js/**/*', 'src/**/*'],
    },
  };
};
