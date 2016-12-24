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
        bll:[__dirname + '/src/index.js'],
        vendor:['vue','vue-router',"jquery"]//第三方模块
    };
/* entry */

/* resolve */
    var resolve = {
        extensions:["",".js",".vue"],
        alias: {
            src:path.join(__dirname, "src"),
            app:path.join(__dirname, "src/app"),
            assets:path.join(__dirname, "src/assets"),
            utils:path.join(__dirname, "src/utils"),
            models:path.join(__dirname, "src/models"),
            vue:"vue/dist/vue.js"
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
  //开发服务器
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
      presets: ["es2015"]
    }
  };
  var babelLoaderHot = {
    test: /\.jsx?$/,
    loaders: ["es2015"],
    exclude: /node_modules/
  };
  var vueLoader = {
    test:/\.vue$/,
    loader:"vue",
    exclude: /node_modules/
  }
  var cssLoader = {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap",{
      publicPath:'../'
    }),
    exclude: /node_modules/
  };
  var urlLoader = {
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader',
    exclude: /node_modules/,
    query: {
      limit: 8192,
      name:'images/[name].[hash:8].[ext]'
    }
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
  commonsChunkPlugin = new CommonsChunkPlugin({
    name:"vendor",
    filename:"js/libs.[chunkhash:8].js",
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
  //拷贝ico文件
  transferIcoWebpackPlugin = new TransferWebpackPlugin([{
    from:'src/assets/images/ico',
    to:'images/ico'
  }]),
  //生成HTML文件
  htmlWebpackPlugin = new HtmlWebpackPlugin({
    title:'MCPTT调度台',
    template:'src/index.ejs',
    minify:false,
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



if(process.env.NODE_ENV == "production"){
  webpackConfig={
    entry:entry,
    output:outputProd,
    resolve:resolve,
    module: {
      loaders:[babelLoader,vueLoader,cssLoader,urlLoader]
    },
    plugins:[
      ugligyJsPlugin,extractTextPluginProd,commonsChunkPluginProd,
      providePlugin,transferIcoWebpackPlugin,htmlWebpackPlugin,
      cleanWebpackPluginProd,definePlugin
    ]
  };
}else if(process.env.NODE_ENV == "develop"){
  webpackConfig={
    entry:entry,
    output:outputHot,
    resolve:resolve,
    module: {
      loaders:[babelLoaderHot,vueLoader,cssLoader,urlLoader]
    },
    plugins:[
      extractTextPlugin,commonsChunkPlugin,
      providePlugin,transferIcoWebpackPlugin,htmlWebpackPlugin,
      hotModuleReplacementPlugin
    ],
    devtool: 'source-map'
  };
}else{
  webpackConfig={
    entry:entry,
    output:outputDev,
    resolve:resolve,
    module: {
      loaders:[babelLoader,vueLoader,cssLoader,urlLoader]
    },
    plugins:[
      extractTextPlugin,commonsChunkPlugin,
      providePlugin,transferIcoWebpackPlugin,htmlWebpackPlugin,
      cleanWebpackPluginDev
    ]
  };
}


module.exports = webpackConfig;

