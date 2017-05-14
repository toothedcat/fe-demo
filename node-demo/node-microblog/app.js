const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const http = require('http');
const app = express();


app.use(methodOverride('_method'));
app.use(express.static(__dirname+'/public'));
if(process.env.NODE_ENV === 'develop'){
    app.use(errorHandler);
}
app.set('views','/views');
app.set('view engine','ejs');
app.use(expressLayouts);
app.use(router);


const server = http.createServer(app);
server.listen(3000,(err) => {
    if(err){
        console.log(err.stack);
    }else{
        console.log('Express server listening on port %d in %s mode',
            server.address().port,app.get('env'));
    }
});