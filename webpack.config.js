// webpack.config.js
module.exports = {
    // mode: process.env.NODE_ENV || 'development',
    mode: process.env.NODE_ENV || "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    resolve: {
        modules: ["node_modules"],
    },
};
