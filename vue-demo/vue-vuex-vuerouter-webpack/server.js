const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');
var ip = 'localhost';
var port = 3001;

var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: false,
    stats: { 
        colors: true,
        errors: true,
        errorDetails:true
    }
});
server.listen(port, ip, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://'+ip+':' + port);
});