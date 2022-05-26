const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    //Başlangıç javascript dosyaları
    main: "./src/index.js", //Başlangıç javascript dosyası, bu dosya vendor js'i import ediyor
    vendor: "./src/vendor.js", // vendor.js kütüphanelerin vs. importlarını içeriyor ve nadiren değişiyor.
  }, // vendor.js ile importları ayırmamızın sebebi=>main her değiştiğinde main.[contenthash].js dosyasının ismi değiştiğinden ötürü tarayıcı her defasında bu dosyayı indirir
  //main.js kütüphaneleri de içerdiğinden ötürü vendor.js ile kütüphane importlarını ayırmadığımız zaman kullanıcı her güncellemede tüm kütüphaneleri tekrar indirmek zorunda kalır.
  //vendor.js ile importları ayırdığımızda ve importlar değişmediği takdirde vendor.js de değişmediği için kullanıcı kütüphaneleri tekrar indirmek zorunda kalmaz
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          //İşlem arrayin son elemanından başlar. Yani ilk sass-loader çalışır
          //"style-loader", // style-loader performans sebebiyle kullanılmıyor
          MiniCssExtractPlugin.loader, //extract edilen css dosyalarını html'e ekler.
          "css-loader", // 2- css-loader çalışır, css javascripte çevirilir
          "sass-loader", // 1- sass-loader çalışır, sass'i css'e çevirir.
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      //   {
      //     test: /\.(png|jpg)$/,
      //     use: {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[hash].[ext]",
      //         outputPath: "img",
      //       },
      //     },
      //   },
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    //--HtmlWebpackPlugin--
    //webpack'in bizim outputumuza özel index.html oluşturmasını sağlar. contenthash ile oluşan dinamik dosyaları oluşturduğu index.html'e ekler
    new HtmlWebpackPlugin({
      //--template--
      //index.html'i oluştururken template olarak alacağı dosyayı belirler. Bu html template'de main.js, main.css gibi dosyaları import etmemiz gerekmiyor
      template: "index.html",
      minify: true,
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }), //css dosyalarını javascript içine gömmeden dışarı çıkartır
  ],
};
