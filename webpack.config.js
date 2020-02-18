'use strict';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


//entry говорит о том какой модуль собирать
//output куда выводить

module.exports = {
    entry: "./js/entry",
    output: {
        // пустой path - значит в ту же директорию.
        path: __dirname + "/diste",
        filename: "build.js"
    },
    // optimization: {
    //     minimizer: [new UglifyJsPlugin()]
    // },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['@babel/preset-env']
    //                 }
    //             }
    //         }
    //     ]
    // },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    }
};