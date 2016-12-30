define(["vue"],function(Vue){
    return {
        template:'\
            <div class="realmonitor">\
                <div class="title">\
                    <span class="close" @click="closeHandler"></span>\
                </div>\
                实时监控\
            </div>\
        ',
        methods:{
            closeHandler:function(){
                this.$emit('close');
            }
        }
    }
});