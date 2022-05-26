const { merge } = require("webpack-merge"); //Ortak config ile prod configini merge etmek için import ettik
const common = require("./webpack.common"); //Ortak configi merge etmek için import ettik
const path = require("path");
module.exports = merge(common, {
  mode: "production",
  output: {
    //--filename--
    //Output javascript dosyasının ismini belirler
    //[contentHash], main.js çıktısına özel hash üretir ve dosya ismine yazar.
    //Bu sayede her yeni versiyonda farklı bir dosya ismi üretilir ve tarayıcının eski main.js'i cache'den çağırması yerine yeni main.js'i alması sağlanır.
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"), //Outputun lokasyonu
    assetModuleFilename: "./public/img/[name].[hash].[ext]",
    clean: true, //build edilirken eski dosyaları siler
  },
});
