define(["vue","./callpanel.js"],function(Vue,CallPanel){
    return {
        template:'\
            <div class="dialoglayer">\
                <call-panel \
                    v-for="callInfo in callList" \
                    :callInfo="callInfo" \
                    @closePanel="closePanelHandler"\
                />\
            </div>\
        ',
        props:["eventBus"],
        data:function(){
            return {
                callList:[]
            }
        },
        mounted:function(){
            this.eventBus.$on('dropDone',this.dropDoneHandler)
        },
        beforeDestroy:function(){
            this.eventBus.$off('dropDone');
        },
        methods:{
            dropDoneHandler:function(data){
                this.callList.push(data);
            },
            closePanelHandler:function(id){
                var index = this.searchById(id);
                this.callList.splice(index,1);
            },
            // 根据id查找其在callList中的位置
            searchById:function(id){
                var index;
                this.callList.forEach(function(callInfo,i){
                    if(callInfo.id === id){
                        index = i;
                        return false;
                    }
                });
                return index;
            }
        },
        components:{
            'call-panel':CallPanel
        }
    }
});