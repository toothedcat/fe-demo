define(["vue","./schedulepanel.js","./historypanel.js","./logpanel.js"],
    function(Vue,SchedulePanel,HistoryPanel,LogPanel){
    return {
        template:'\
            <div :class="leftpanelCls" @dragover="dragoverHandler">\
                <div class="leftpanel-header">Mary</div>\
                <div class="leftpanel-switch">\
                    <span class="leftpanel-switch-tab"\
                        v-bind:class="{\'leftpanel-switch-tab-active\':tabActive===1?true:false}"\
                        @click="tabClickHandler(1)">\
                        调度\
                    </span>\
                    <span class="leftpanel-switch-tab"\
                        v-bind:class="{\'leftpanel-switch-tab-active\':tabActive===2?true:false}"\
                        @click="tabClickHandler(2)">\
                        历史\
                    </span>\
                    <span class="leftpanel-switch-tab"\
                        v-bind:class="{\'leftpanel-switch-tab-active\':tabActive===3?true:false}"\
                        @click="tabClickHandler(3)">\
                        消息\
                    </span>\
                </div>\
                <div class="leftpanel-content">\
                    <keep-alive>\
                        <component :is="currentView"></component>\
                    </keep-alive>\
                </div>\
                <div class="leftpanel-callpanel">呼叫面板</div>\
                <div class="leftpanel-footer">\
                    <span class="leftpanel-bottomswitch"></span>\
                    <span class="leftpanel-toggle" @click="toggleHandler"></span>\
                </div>\
            </div>\
        ',
        data:function(){
            return {
                currentView:'schedule-panel',
                tabActive:1,
                isExpanded:true
            }
        },
        methods:{
            tabClickHandler:function(tab){
                this.tabActive = tab;
                if(tab === 1){
                    this.currentView = 'schedule-panel';
                }else if(tab === 2){
                    this.currentView = 'history-panel';
                }else if(tab === 3){
                    this.currentView = 'log-panel';
                }
            },
            toggleHandler:function(){
                this.isExpanded = !this.isExpanded;
            },
            dragoverHandler:function(e){
                this.$emit("dragover",e);
            }
        },
        computed:{
            leftpanelCls:function(){
                return {
                    "leftpanel":true,
                    "leftpanel-collapse":!this.isExpanded
                };
            }
        },
        components:{
            'schedule-panel':SchedulePanel,
            'history-panel':HistoryPanel,
            'log-panel':LogPanel
        }
    }
});