var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
module.exports = function (config) {
    config.set({
        basePath: '', // 基于此路径进行其他匹配
        frameworks: ['jasmine'],// 使用的测试框架
        files: [ // 测试文件匹配
            'test/unit/**/*.spec.js'
        ],
        exclude: [ // 被排除在外的文件
        ],
        preprocessors: { // 进行预处理
            'test/unit/**/*.spec.js':['webpack']
        },
        webpack:webpackConfig,
        reporters: ['progress','coverage'],
        coveragReporter:{
            type:['html'],
            dir:'coverage/'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    });
};
