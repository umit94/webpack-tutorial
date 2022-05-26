//package.json için açıklamalar
//
//  "scripts": {
//    webpack-dev-server development için değişiklikleri canlı olarak görebileceğimiz server oluşturur. --open, server ayaga kalktığında tarayıcıda açar
//   "start": "webpack-dev-server --config webpack.dev.js --open",
//   "build": "webpack --config webpack.prod.js"
// },

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "development", //development minify işlemini iptal eder ve output okunaklı olur
  entry: "./src/index.js", //Başlangıç javascript dosyası. Birden fazla başlangıç yapılabilir. Detaylar webpack.common.js'de
  watch: true, //Yapılan değişikliklerin anlık değişimi için. webpack-dev-server kullanırken gerekmez
  output: {
    //--filename--
    //Output javascript dosyasının ismini belirler
    //[contentHash], main.js çıktısına özel hash üretir ve dosya ismine yazar.
    //Bu sayede her yeni versiyonda farklı bir dosya ismi üretilir ve tarayıcının eski main.js'i cache'den çağırması yerine yeni main.js'i alması sağlanır.
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"), //Outputun lokasyonu
  },
  plugins: [
    //--pluginler dosyalar üzerinde işlem yapar. Optimizasyon, değişkenlerin gerekli yerlere yerleştirilmesi(index.html'e js ve css dosyalarının yerleştirilmesi vb) gibi
    //--HtmlWebpackPlugin--
    //webpack'in bizim outputumuza özel index.html oluşturmasını sağlar. contenthash ile oluşan dinamik dosyaları oluşturduğu index.html'e ekler
    new HtmlWebpackPlugin({
      //--template--
      //index.html'i oluştururken template olarak alacağı dosyayı belirler. Bu html template'de main.js, main.css gibi dosyaları import etmemiz gerekmiyor
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      //--loaderlar webpack'in js ve json harici dosyalar üzerinde işlem yapabilmesini sağlar
      {
        test: /\.scss$/,
        use: [
          //İşlem arrayin son elemanından başlar. Yani ilk sass-loader çalışır

          //--style-loader--
          // 3- style-loader çalışır, `javascript dosyalari yuklendikten sonra` javascript dosyasi calistirilarak doma style tagi içerisinde eklenir.
          //javascript dosyalari beklendigi icin style isleminin performansi duser. ayrintilar webpack.common.js'de
          "style-loader",
          "css-loader", // 2- css-loader çalışır, css javascripte çevirilir
          "sass-loader", // 1- sass-loader çalışır, sass'i css'e çevirir.
        ],
      },
    ],
  },
};

// module.exports = {
//   entry: "./src/index.js", //Başlangıç javascript dosyası
//   watch: true, //Yapılan değişikliklerin takibi
//   output: {
//     filename: "custom-file-name.js", //Output javascript dosyasının ismi
//     path: path.resolve(__dirname, "CUSTOMPATH"), //Outputun lokasyonu
//   },
// };
