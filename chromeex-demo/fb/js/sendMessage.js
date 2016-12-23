function(msg,callback){
    console.log("接收到:"+msg);
    setTimeout(function(){
        callback&&callback("返回信息");
    },1000);
};