define(["vue"],function(Vue){
    return {
        template:'\
            <div class="historyalert">\
                <div class="title">\
                    <span class="close" @click="closeHandler"></span>\
                </div>\
                历史告警\
            </div>\
        ',
        methods:{
            closeHandler:function(){
                this.$emit('close');
            }
        }
    }
});