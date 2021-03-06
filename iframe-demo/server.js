﻿var express = require('express');
var path = require('path');

var app = express();

app.configure(function () {
    app.use(express.bodyParser({}));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'react'
    }));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    // app.use(express.static(path.join(__dirname, 'hps/Webcontent')));
});

var port = 3000;
app.listen(port);
console.log('Listening on port ' + port + '...');