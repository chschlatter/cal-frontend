const path = require("path");

module.exports = {
  mode: "production", // "production" | "development" | "none"
  // devtool: "inline-source-map",
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "fullcalendar",
    },
    fullcalendar: "./src/fullcalendar.js",
    login: "./src/login.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  /*
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  */
};
