
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        healthAdmin: './index.css.js'
    },
    output: {
        path: './build',
        filename: '[name].js'
    },
    module: {
        loaders: [
           {
               test: /\.css$/, loader: ExtractTextPlugin.extract( "style-loader", "css-loader" )
           },
           { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url?limit=8192' },
           // { test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/, loader: 'url?limit=8192' },
        ]
    },
    plugins: [
         new ExtractTextPlugin("styles.css"),
    ]

};
//var webpack = require('webpack');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
//module.exports = {
//    entry: {
//        healthAdmin: './index.css.js'
//    },
//    output: {
//        path: './build',
//        filename: '[name].js'
//    },
//    module: {
//        loaders: [
//            {
//                test: /\.css$/, loader: ExtractTextPlugin.extract({
//                    fallbackLoader: "style-loader",
//                    loader: "css-loader"
//                })
//            }
//        ]
//    },
//    plugins: [
//        new ExtractTextPlugin("styles.css")
//    ]
//}