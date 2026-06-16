const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const fs = require("fs");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  const copyPatterns = [
    { from: "public/manifest.json", to: "manifest.json" },
  ];

  // Only copy icons if the folder exists and has files
  const iconsDir = path.resolve(__dirname, "public/icons");
  if (fs.existsSync(iconsDir) && fs.readdirSync(iconsDir).length > 0) {
    copyPatterns.push({ from: "public/icons", to: "icons" });
  }

  const plugins = [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CopyWebpackPlugin({ patterns: copyPatterns }),
  ];

  if (isProd) {
    plugins.push(
      new InjectManifest({
        swSrc: "./src/service-worker.js",
        swDest: "service-worker.js",
      })
    );
  }

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "[name].[contenthash].js" : "[name].js",
      clean: true,
      publicPath: "/",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" },
        },
      },
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@store": path.resolve(__dirname, "src/store"),
        "@services": path.resolve(__dirname, "src/services"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@pages": path.resolve(__dirname, "src/pages"),
      },
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        { test: /\.(png|svg|jpg|jpeg|gif|ico)$/i, type: "asset/resource" },
      ],
    },
    plugins,
    devServer: { port: 3000, hot: true, historyApiFallback: true, open: true },
    devtool: isProd ? "source-map" : "eval-source-map",
  };
};
