var webpackConfig,
    path = require('path'),
    webpack = require('webpack'),
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    TransferWebpackPlugin = require('transfer-webpack-plugin'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    CleanWebpackPlugin = require("clean-webpack-plugin");

/* entry */
  var entry = {
    bll:"./src/main.jsx",
    vendor:['react','react-dom']
  };

  var entryHot = {
    bll:[
      "webpack-dev-server/client?http://localhost:3001", // WebpackDevServer host and port
      "webpack/hot/only-dev-server", // "only" prevents reload on syntax errors
      "./src/main.jsx"
    ],
    vendor:['react','react-dom']
  };
/* entry */

/* resolve */
  var resolve = {
    extensions:["",".js",".jsx"],
    alias:{
      'laydate':path.join(__dirname,'lib/laydate/laydate.js'),
      "css":path.join(__dirname,"src/css"),
      "app":path.join(__dirname,"src/app")
    }
  };
/* resolve */

/* output */
  //生产环境
  var outputProd = {
    path:__dirname+"/dist",
    filename:"js/[name].[chunkhash:8].min.js",
    chunkFilename:"other.[id].min.js"
  };
  //react热插拔
  var outputHot = {
    path:__dirname+"/build",
    filename:"js/[name].[chunkhash:8].js",
    chunkFilename:"other.[id].js"
  };
  //开发测试环境
  var outputDev = {
    path:__dirname+"/build",
    filename:"js/[name].[chunkhash:8].js",
    chunkFilename:"other.[id].js"
  };
/* output */

/* loaders */
  var babelLoader = {
    test: /\.jsx?$/,
    loader: 'babel',
    exclude: /node_modules/,
    query: {
      presets: ['react', 'es2015']
    }
  };
  var babelLoaderHot = {
    test: /\.jsx?$/,
    loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
    exclude: /node_modules/
  };
  var lessLoader = {
    test: /\.(less|css)$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader",{
      publicPath:'../'
    }),
    exclude: /node_modules/
  };
  var urlLoader = {
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader',
    exclude: /node_modules/,
    query: {
      limit: 1024,
      name:'images/[name].[hash:8].[ext]'
    }
  };
  var exportLoader = {
    test:require.resolve("./lib/laydate/laydate.js"),
    loader:"exports-loader?laydate"
  };
/* loaders */

/* plugins */
  //代码压缩与混淆
  var ugligyJsPlugin = new UglifyJsPlugin({
    compress:{
      warnings:false
    }
  }),
  //提取css文件
  extractTextPlugin = new ExtractTextPlugin("css/styles.[chunkhash:8].css"),
  extractTextPluginProd = new ExtractTextPlugin("css/styles.[chunkhash:8].min.css"),
  //提取公用组件
  commonsChunkPluginDev = new CommonsChunkPlugin({
    name:"vendor",
    filename:"js/libs.[chunkhash:8].js",
    minChunks: Infinity
  }),
  commonsChunkPluginHot = new CommonsChunkPlugin({
    name:"vendor",
    filename:"js/libs.[hash:8].js",
    minChunks: Infinity
  }),
  commonsChunkPluginProd = new CommonsChunkPlugin({
    name:"vendor",
    filename:"js/libs.[chunkhash:8].min.js",
    minChunks: Infinity
  }),
  //将$,jQuery,window.jQuery变量导入到所有模块中
  providePlugin = new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery",
     "window.jQuery": "jquery"
  }),
  //拷贝文件
  transferWebpackPlugin = new TransferWebpackPlugin([{
    from:'lib/laydate/skins',
    to:'js/skins'
  },{
    from:'lib/laydate/need',
    to:'js/need'
  }]),
  //生成HTML文件
  htmlWebpackPlugin = new HtmlWebpackPlugin({
    title:'webpack打包测试',
    template:'src/index.ejs',
    minify:false,
    //favicon:'src/images/favicon.ico',
    chunksSortMode:function(a,b){
      var orderMap = {
        'vendor':1,
        'bll':2
      };
      var aName = a.names[0];
      var bName = b.names[0];
      return orderMap[aName]&&orderMap[bName]? orderMap[aName]-orderMap[bName] : -1;
    }
  }),
  cleanWebpackPluginDev = new CleanWebpackPlugin(['build'],{
    root:path.resolve(__dirname),
    verbose:true
  }),
  cleanWebpackPluginProd = new CleanWebpackPlugin(['dist'],{
    root:path.resolve(__dirname),
    verbose:true
  }),
  definePlugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }
  }),
  hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
/* plugins */

console.log(process.env.NODE_ENV)


if(process.env.NODE_ENV == "production"){
  webpackConfig={
    entry:entry,
    output:outputProd,
    resolve:resolve,
    module: {
      loaders:[babelLoader,lessLoader,urlLoader,exportLoader]
    },
    plugins:[
      ugligyJsPlugin,extractTextPluginProd,commonsChunkPluginProd,
      providePlugin,transferWebpackPlugin,htmlWebpackPlugin,
      cleanWebpackPluginProd,definePlugin
    ]
  };
}else if(process.env.NODE_ENV == "develop-hot"){
  webpackConfig={
    devtool:"inline-source-map",
    debug:true,
    entry:entryHot,
    output:outputHot,
    resolve:resolve,
    module: {
      loaders:[babelLoaderHot,lessLoader,urlLoader,exportLoader]
    },
    plugins:[
      extractTextPlugin,commonsChunkPluginHot,
      providePlugin,transferWebpackPlugin,htmlWebpackPlugin,
      hotModuleReplacementPlugin
    ]
  };
}else{
  webpackConfig={
    entry:entry,
    output:outputDev,
    resolve:resolve,
    module: {
      loaders:[babelLoader,lessLoader,urlLoader,exportLoader]
    },
    plugins:[
      extractTextPlugin,commonsChunkPluginDev,
      providePlugin,transferWebpackPlugin,htmlWebpackPlugin,
      cleanWebpackPluginDev
    ]
  };
}


module.exports = webpackConfig;