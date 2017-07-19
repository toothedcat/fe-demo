<template>
    <div>{{msg}}</div>
</template>
<script>
export default {
    props:['message'],
    data(){
        return {
            msg:this.message||'Hello world'
        };
    }
};
</script>

