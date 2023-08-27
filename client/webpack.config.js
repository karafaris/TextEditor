const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Exporting a function that returns the webpack configuration object
module.exports = () => {
  return {
    mode: "development", // Setting the mode to development
    entry: {
      main: "./src/js/index.js", // Entry points for the application
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js", // Output filename for bundled scripts
      path: path.resolve(__dirname, "dist"), // Output directory path
    },
    plugins: [
      // Adding HTMLWebpackPlugin to generate an HTML file with injected scripts
      new HtmlWebpackPlugin({
        template: "./index.html", // Template HTML file
        title: "JATE", // Title of the generated HTML page
      }),
      // Adding WebpackPwaManifest to generate a manifest file for the PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "JATE", // Name of the PWA
        description: "Just another text editor", // Description of the PWA
        background_color: "#225ca3", // Background color for the PWA
        theme_color: "#225ca3", // Theme color for the PWA
        start_url: "/", // Start URL for the PWA
        publicPath: "/", // Public path for assets
        icons: [
          {
            src: path.resolve("src/images/logo.png"), // Path to the PWA icon
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join("assets", "icons"), // Destination directory for icons
          },
        ],
      }),
      // Adding InjectManifest plugin to inject the service worker into the build
      new InjectManifest({
        swSrc: "./src-sw.js", // Source path of the service worker
        swDest: "src-sw.js", // Destination path of the injected service worker
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], // Adding CSS loaders
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Adding Babel loader for JavaScript files
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};

