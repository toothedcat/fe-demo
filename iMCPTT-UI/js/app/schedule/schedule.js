define(["vue","./bmap/bmap.js","./leftpanel/leftpanel.js",
    "./bottompanel/bottompanel.js","./dialoglayer/dialoglayer.js"],
    function(Vue,BMap,LeftPanel,BottomPanel,DialogLayer){

    return {
        template:'\
            <div class="schedule"  @dragover="allowDropHandler" @drop="dropHandler">\
                <bmap />\
                <left-panel @dragover="notAllowDropHandler" />\
                <bottom-panel @dragover="notAllowDropHandler" />\
                <dialog-layer :eventBus="eventBus" />\
            </div>\
        ',
        data:function(){
            return {
                eventBus:new Vue()
            };
        },
        components:{
            "bmap":BMap,
            "left-panel":LeftPanel,
            "bottom-panel":BottomPanel,
            "dialog-layer":DialogLayer
        },
        methods:{
            allowDropHandler:function(e){
                e.preventDefault();
            },
            notAllowDropHandler:function(e){
                e.stopPropagation();
            },
            dropHandler:function(e){
                e.preventDefault();
                var name = e.dataTransfer.getData('name');
                var id = e.dataTransfer.getData('id');
                var data = {
                    id:id,
                    name:name||'',
                    posX:e.clientX,
                    posY:e.clientY
                };
                this.eventBus.$emit("dropDone",data);
            }
        }
    };
});