define(["vue"],function(Vue){
    return {
        props:{
            "callInfo":{
                type:Object,
                default:{}
            }
        },
        template:'\
            <div class="callpanel" :style="panelStyle">\
                <span class="callpanel-close" @click="closeHandler"></span>\
                <div class="callpanel-header">\
                    <span class="callpanel-profile"></span>\
                    <span class="callpanel-name">{{callInfo.name}}</span>\
                </div>\
                <div class="callpanel-content">\
                    <span class="callpanel-callmode"></span>\
                </div>\
                <div class="callpanel-footer"></div>\
            </div>\
        ',
        computed:{
            panelStyle:function(){
                return {
                    left:this.callInfo.posX,
                    top:this.callInfo.posY
                }
            }
        },
        methods:{
            closeHandler:function(){
                this.$emit("closePanel",this.callInfo.id);
            }
        }
    }
});