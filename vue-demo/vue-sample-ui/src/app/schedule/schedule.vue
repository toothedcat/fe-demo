<template>
    <div class="schedule">

        <bmap />
    </div>
</template>

<script>
    var bmap = require("./components/bmap.vue");
    module.exports = {
        data:function(){
            return {

            };
        },
        methods:{

        },
        components:{
            bmap:bmap
        }
    };
</script>

<style>

</style>