var BMap = window.BMap;
var document = window.document;

var ICON_MAP = {
    "online": 'images/ic_locate/ic_locate_online.png',// 在线
    "onlineActive": 'images/ic_locate/ic_locate_online_s.png',// 在线,点击显示详细信息
    "calling": 'images/ic_locate/ic_locate_calling.png',// 呼叫中
    "callingActive": 'images/ic_locate/ic_locate_calling_s.png',// 呼叫中,点击显示详细信息
    "offline": 'images/ic_locate/ic_locate_offline.png',// 离线
    "offlineActive": 'images/ic_locate/ic_locate_offline_s.png',// 离线，点击显示详细信息
    "emergencyAlarm": 'images/ic_locate/ic_locate_emergencyalarm.gif',// 紧急告警
    "crossBorderAlarm": 'images/ic_locate/ic_locate_crossborderalarm.gif',// 越界告警
    "offlineAlarm": 'images/ic_locate/ic_locate_offlinealarm.gif',// 离线告警
    "stillAlarm": 'images/ic_locate/ic_locate_stillalarm.gif'// 静止不动告警
};

var COLOR_MAP = {
    "online":"#FFF",
    "calling":"#CCC",
    "emergencyAlarm":"#FF0000",
    "crossBorderAlarm":"#00FF00",
    "offlineAlarm":"#CCC",
    "stillAlarm":"#CCC"
};

var extend = function(target,source){
    var i,len,key,keys;
    if(!source || typeof source !== 'object'){
        return target;
    }
    if(!target || typeof target !== 'object'){
        target = {};
    }
    keys = Object.keys(source);
    for(i=0,len=keys.length;i<len;i++){
        key = keys[i];
        target[key] = source[key];
    }
    return target;
};

var UserMarker = function(lng,lat,options){
    if(typeof lng !== 'number' || typeof lat !== 'number'){
        lng = Number(lng);
        lat = Number(lat);
    }
    if(typeof options !== 'object'){
        options = {};
    }
    this._point = new BMap.Point(lng,lat);
    this._options = extend(options,this.defaultOptions);
};

UserMarker.prototype = new BMap.Overlay();

UserMarker.prototype.defaultOptions = {
    title:'',
    width:'34',
    height:'42',
    state:'online',
    name:"用户"
};

UserMarker.prototype.initialize = function(map){
    this._map = map;
    var markerEl = document.createElement('div');
    markerEl.className = 'mcptt-usermarker';
    markerEl.style.position = 'absolute';
    markerEl.style.width = this._options.width + 'px';
    markerEl.style.height = this._options.height + 'px';
    markerEl.style.backgroundColor = "rgba(255,255,255,0)";
    markerEl.style.padding = '0';
    markerEl.style.margin = '0';
    // 图标
    var iconEl = document.createElement('img');
    var state = this._options.state;
    iconEl.src = ICON_MAP[state] || ICON_MAP["online"];
    markerEl.appendChild(iconEl);

    // 名称
    var nameEl = document.createElement('div');
    nameEl.className = "mcptt-usermarker-name";
    nameEl.textContent = this._options.name;
    nameEl.style.position = 'absolute';
    nameEl.style.bottom = '-16px';
    nameEl.style.left="50%";
    nameEl.style.transform = "translateX(-50%)";
    nameEl.style.whiteSpace = "nowrap";
    nameEl.style.color = "#000";
    nameEl.style.fontFamily = "Microsoft YaHei,Tahoma, Helvetica, Arial";
    nameEl.style.fontSize = "14px";
    markerEl.appendChild(nameEl);

    // 将markerEl添加到覆盖物容器中
    this._map.getPanes().markerPane.appendChild(markerEl);
    this._markerEl = markerEl; 
    this._iconEl = iconEl;
    this._state = state;
    this._nameEl = nameEl;
    return markerEl;
};

UserMarker.prototype.draw = function(){
    var position = this._map.pointToOverlayPixel(this._point);
    this._markerEl.style.left = position.x - this._options.width/2 +'px';
    this._markerEl.style.top = position.y - this._options.height/2 + 'px';
};

UserMarker.prototype.show = function(){
    if(!this._markerEl){return;}
    this._markerEl.style.display = '';
};

UserMarker.prototype.hide = function(){
    if(!this._markerEl){return;}
    this._markerEl.style.display = 'none';
};

UserMarker.prototype.toggle = function(){
    if(!this._markerEl){return;}
    if(this._markerEl.style.display === ''){
        this._markerEl.style.display = 'none';
    }else if(this._markerEl.style.display === 'none'){
        this._markerEl.style.display = '';
    }
};

UserMarker.prototype.setState = function(state){
    
};





