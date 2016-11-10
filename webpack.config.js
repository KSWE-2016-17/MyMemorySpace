let CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        javascript: "./src/js/main.js",
        html: "./src/html/index.html"
    },
    output: {
        path: "./dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: [
                        "es2015",
                        "stage-0"
                    ]
                }
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "assets",
                to: "assets"
            }
        ])
    ]
};
