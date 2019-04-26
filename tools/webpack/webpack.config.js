const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ '.js', '.ts' ],
    alias: {
      types: path.resolve(process.cwd(), 'src/app/types.ts'),
      config: path.resolve(process.cwd(), 'src/app/config/'),
      modules: path.resolve(process.cwd(), 'src/app/modules/'),
      helpers: path.resolve(process.cwd(), 'src/app/helpers/'),
      utils: path.resolve(process.cwd(), 'src/app/utils/'),
      engine: path.resolve(process.cwd(), 'src/app/engine/'),
      objects: path.resolve(process.cwd(), 'src/app/objects/'),
      components: path.resolve(process.cwd(), 'src/app/components/'),
      stores: path.resolve(process.cwd(), 'src/app/stores/'),
      lib: path.resolve(process.cwd(), 'src/app/lib/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts|js$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin([
      { from: 'src/lib/assets', to: './lib/assets' },
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000
  },
  stats: {
    warnings: false
  }
}

