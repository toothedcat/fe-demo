window.onload = function(){
    alert("haha");
    var script = document.createElement("script");
    script.src="./sendMessage.js";
    var heads = document.getElementsByTagName("head");
    if(heads.length){
        heads[0].appendChild(script);
    }
    else{
        document.documentElement.appendChild(script);
    }
};

document.onclick = function(){
    var script = document.createElement("script");
    script.src="./sendMessage.js";
    var heads = document.getElementsByTagName("head");
    if(heads.length){
        heads[0].appendChild(script);
    }
    else{
        document.documentElement.appendChild(script);
    }
}
