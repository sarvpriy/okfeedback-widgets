const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
    // Common configuration options for all entry points
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.ts?$/,
    //             use: 'ts-loader',
    //             include: /\/public\/widgets/,
    //             exclude: /node_modules/
    //         },
    //     ],
    // },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
        }),
    ],
    mode: 'production',
    devtool: 'source-map',
};

const entryPoints = [
    'widget',
    'rating', 
    'developer', 
    'survey',
    'feedback'
];

let configs = entryPoints.map((entry) => {
    console.log(entry)
    return {
        ...commonConfig,
        entry: `./src/${entry}.js`,
        output: {
          filename: `${entry}.bundle.js`,
          path: path.resolve(__dirname, 'dist/v1', entry),
          clean: true,
        }
      }
});

module.exports = configs;
