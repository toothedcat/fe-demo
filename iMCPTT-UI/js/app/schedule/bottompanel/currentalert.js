define(["vue"],function(Vue){
    var Table = {
        props:['tableData'],
        template:'\
            <table class="mt-table">\
                <thead>\
                    <tr>\
                        <th>警务区</th>\
                        <th>告警对象</th>\
                        <th>告警类型</th>\
                        <th>告警时间</th>\
                        <th>操作</th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <tr v-for="row in tableData">\
                        <td>{{row.area}}</td>\
                        <td>{{row.obj}}</td>\
                        <td :class="{error:row.type==1,warn:row.type==2,normal:row.type==3}">{{row.type}}</td>\
                        <td>{{row.time}}</td>\
                        <td>\
                            <span>确认</span>\
                            <span>呼叫</span>\
                            <span>发消息</span>\
                            <span>上拉视频</span>\
                        </td>\
                    <tr>\
                </tbody>\
            </table>\
        ',
        computed:{

        }
    };
    var tableData = [{
        area:'湘潭北所',
        obj:'警员A',
        type:1,// 1-紧急告警 2-越界告警 3-长时间不动
        time:'12/19 10:36'
    },{
        area:'湘潭北所',
        obj:'警员B',
        type:2,// 1-紧急告警 2-越界告警 3-长时间不动
        time:'12/19 10:36'
    },{
        area:'湘潭北所',
        obj:'警员C',
        type:3,// 1-紧急告警 2-越界告警 3-长时间不动
        time:'12/19 10:36'
    },{
        area:'湘潭北所',
        obj:'警员D',
        type:0,// 1-紧急告警 2-越界告警 3-长时间不动
        time:'12/19 10:36'
    }]
    return {
        template:'\
            <div class="currentalert">\
                <div class="title">\
                    <span class="title-text">当前告警(3)</span>\
                    <span class="close" @click="closeHandler"></span>\
                </div>\
                <alert-table :tableData=tableData></alert-table>\
            </div>\
        ',
        data:function(){
            return {
                tableData:tableData
            };
        },
        methods:{
            closeHandler:function(){
                this.$emit('close');
            }
        },
        components:{
            'alert-table':Table
        }
    }
});