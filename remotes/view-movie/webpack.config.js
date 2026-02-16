const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const pkg = require("./package.json");

// Use "container if host", otherwise use something like "remote_home"
const _packageName = "remote_viewmovie";

// 3000 for Host, increment for each remote (this is for local dev)
const _port = 3003;

// This must be set to "/" for host, and "auto" for remotes
const _publicPath = process.env.NODE_ENV === "production" ? "/remotes/view-movie/" : "auto";

module.exports = (env, argv) => {
	return {
		entry: "./src/index.js",
		output: { publicPath: _publicPath },
		mode: process.env.NODE_ENV || "development",
		devServer: { port: _port, open: false, historyApiFallback: true },
		resolve: { extensions: [".js", ".jsx"] },
		module: {
			rules: [
			  {
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
				  presets: ['@babel/preset-react'],
				},
			  }
			],
		},
		plugins: [
			new ModuleFederationPlugin({
				name: _packageName,
				filename: "remote.js",
				exposes: { "./Application": "./src/app" },
				remotes: [],
				shared: {
					"react": { singleton: true, eager: true, requiredVersion: pkg.dependencies["react"] },
					"react-dom": { singleton: true, eager: true, requiredVersion: pkg.dependencies["react-dom"] },
					"react-router": { singleton: true, eager: true, requiredVersion: pkg.dependencies["react-router"] },
					"react-router-dom": { singleton: true, eager: true, requiredVersion: pkg.dependencies["react-router-dom"] },
				},
			}),
			new HtmlWebpackPlugin({
				template: "./public/index.html",
				favicon: './public/favicon.ico',
			}),
		],
	};
};
