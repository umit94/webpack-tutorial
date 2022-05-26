const { merge } = require("webpack-merge"); //Ortak config ile dev configini merge etmek için import ettik
const common = require("./webpack.common"); //Ortak configi merge etmek için import ettik
module.exports = merge(common, {
  mode: "development", //development minify işlemini iptal eder ve output okunaklı olur
  optimization: {
    runtimeChunk: "single", //tekrar bakılacak
  },
});
