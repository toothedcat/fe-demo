define(["vue","./currentalert.js","./historyalert.js","./realmonitor.js"],
    function(Vue,CurrentAlert,HistoryAlert,RealMonitor){
    return {
        template:'\
            <div class="bottompanel" @dragover="dragoverHandler">\
                <div class="bottompanel-content" v-if="isExpanded">\
                    <keep-alive>\
                        <component :is="currentView" @close="closeHandler"></component>\
                    </keep-alive>\
                </div>\
                <div class="bottompanel-switch" v-else>\
                    <span class="bottompanel-switch-tab"\
                        v-bind:class="{\'bottompanel-switch-tab-active\':tabActive===1?true:false}"\
                        @click="tabClickHandler(1)">\
                        当前告警\
                    </span>\
                    <span class="bottompanel-switch-tab"\
                        v-bind:class="{\'bottompanel-switch-tab-active\':tabActive===2?true:false}"\
                        @click="tabClickHandler(2)">\
                        历史告警\
                    </span>\
                    <span class="bottompanel-switch-tab"\
                        v-bind:class="{\'bottompanel-switch-tab-active\':tabActive===3?true:false}"\
                        @click="tabClickHandler(3)">\
                        实时监控\
                    </span>\
                </div>\
            </div>\
        ',
        data:function(){
            return{
                isExpanded:false,
                tabActive:1,
                currentView:'current-alert'
            };
        },
        methods:{
            tabClickHandler:function(tab){
                this.tabActive = tab;
                if(tab === 1){
                    this.isExpanded = true;
                    this.currentView = 'current-alert';
                }else if(tab === 2){
                    this.isExpanded = true;
                    this.currentView = 'history-alert';
                }else if(tab === 3){
                    this.isExpanded = true;
                    this.currentView = 'real-monitor';
                }
            },
            closeHandler:function(){
                this.isExpanded = false;
            },
            dragoverHandler:function(e){
                this.$emit("dragover",e);
            }
        },
        components:{
            'current-alert':CurrentAlert,
            'history-alert':HistoryAlert,
            'real-monitor':RealMonitor
        }
    };
});