window.Utils = window.Utils || {};

(function(Utils){
  function createXHR(){
    if(typeof XMLHttpRequest != 'undefined'){
      return new XMLHttpRequest();
    }else if(typeof ActiveXObject != 'undefined'){
      var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'],
        i,
        len;
      for(i=0,len=versions.length;i<len;i++){
        try{
          return new ActiveXObject(versions[i]);
        }catch(ex){

        }
      }
    }else{
      throw new Error('No XHR object available.');
    }
  }

  /*
   * @desc 在url后面添加查询字符串
   */
  function addURLParam(url,data){
    url += (url.indexOf('?') == -1 ? '?':'&');
    url += serialize(data);
    return url;
  }

  function serialize(data){
    var parts = [];
    if(typeof data !== 'object'){
      data={};
    }

    Object.keys(data).map(function(key){
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    });

    return parts.join('&');
  }

  var Method_Map = {
    'post':'post',
    'get':'get'
  };

  var DataType_Map = {
    'json':'json',
    'text':'text',
    'form':'form'
  };


  /*
   * @param type
   * @param url
   */
  function ajax(option){
    var type = Method_Map[option.type]||'get';
    var xhr = createXHR();
    var url = option.url;
    var data = typeof option.data === 'object' ? option.data:{};
    var dataType = DataType_Map[option.dataType]||'text';


    if(type == 'get'){
      addURLParam(url,data);
    }
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if( (xhr.status >=200 && xhr.status <= 300) || xhr.status == 304){
          option.success && option.success(xhr.responseText);
        }else if(xhr.status >= 400 && xhr.status<500){
          option.fail && option.fail(xhr.responseText);
        }else{
          option.error && option.error(xhr.responseText);
        }
      }
    };
    xhr.open(type,url,true);


    if(dataType == DataType_Map['text']){
      xhr.setRequestHeader('Content-Type','text/plain');
      xhr.send(window.JSON.stringify(data));
    }
    if(dataType == DataType_Map['json']){
      xhr.setRequestHeader('Content-Type','application/json');
      xhr.send(window.JSON.stringify(data));
    }
    if(dataType == DataType_Map['form']){
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send(serialize(data));
    }


  }

  Utils.xhrUtil = {
    ajax:ajax,
    addURLParam:addURLParam,
    serialize:serialize
  };
}(window.Utils));


