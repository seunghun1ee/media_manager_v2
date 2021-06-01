const path = require("path");

module.exports = {
    outputDir: path.resolve("../backend/public"),
    devServer: {
        proxy: {
            "/api": {
                target: `${process.env.VUE_APP_API_URL}/api`,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        },
        historyApiFallback: true
    }
}