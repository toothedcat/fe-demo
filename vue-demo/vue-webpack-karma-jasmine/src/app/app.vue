<template>
    <div>
        <h1>{{title}}</h1>
        <custom-message :message="message"></custom-message>
    </div>
</template>
<script>
    import Message from './components/message.vue';
    export default {
        data(){
            return {
                title:'七步诗',
                message:'煮豆燃豆萁，豆在釜中泣，本是同根生，相煎何太急'
            };
        },
        components:{
            'custom-message':Message
        },
        mounted(){
            this.title = '七步诗 曹植';
        },
        methods:{
            setMessage(msg){
                this.message = msg;
            }
        }
    };
</script>

