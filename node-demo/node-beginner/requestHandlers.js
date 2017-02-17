var exec = require('child_process').exec;

function start(request,response){
    console.log("request handler 'start' was called");

    var body = '\
        <!DOCTYPE html>\
        <html lang="en">\
            <head><meta charset="UTF-8" />\
            <title>Start</title>\
            </head>\
            <body>\
                <form action="/upload" method="post">\
                    <textarea name="text" cols="60" rows="20"></textarea>\
                    <input type="submit" value="Submit text" />\
                </form>\
            </body>\
        </html>\
    ';

    response.writeHead(200,{
        "Content-Type":"text/html"
    });
    response.write(body);
    response.end();
}

function upload(request,response){
    console.log("request handler 'upload' was called");
    response.writeHead(200,{
        "Content-Type":"text/plain"
    });
    response.write("Hello Upload");
    response.end();
}

module.exports = {
    start:start,
    upload:upload
};