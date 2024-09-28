import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin, {
  loader as _loader,
} from "mini-css-extract-plugin";

export const devtool = "inline-source-map";
export const entry = {
  main: "./src/pages/index.js",
};
export const output = {
  path: resolve(__dirname, "dist"),
  filename: "main.js", // Esto también puedes nombrarlo como quieras, pero vamos a ceñirnos a 'main.js'
  publicPath: "",
  clean: true,
};
export const target = ["web", "es5"];
export const stats = { children: true };
export const mode = "development";
export const devServer = {
  static: resolve(__dirname, "./dist"), // especifica una carpeta desde donde servir la aplicación y su contenido
  compress: true, // esto acelerará la carga de archivos en el modo de desarrollo
  port: 8080, // abrirá tu página en localhost:8080 (puedes usar otro puerto)
  open: true, // se abrirá automáticamente en el navegador después de ejecutar npm run dev
};
export const module = {
  rules: [
    // esto es un array de reglas
    // añádele un objeto que contenga reglas para Babel
    {
      // una expresión regular que busca todos los archivos js
      test: /\.js$/,
      // todos los archivos deben ser procesados por babel-loader
      loader: "babel-loader",
      // excluye la carpeta node_modules, no necesitamos procesar archivos en ella
      exclude: "/node_modules/",
    },
    {
      test: /\.css$/,
      use: [
        _loader,
        {
          loader: "css-loader",
          options: { importLoaders: 1 },
        },
        "postcss-loader",
      ],
    },
    {
      // la regla para procesar archivos
      test: /\.(png|svg|jpeg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
      type: "asset/resource",
    },
  ],
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html", // ruta al archivo index.html
  }),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin(),
];
