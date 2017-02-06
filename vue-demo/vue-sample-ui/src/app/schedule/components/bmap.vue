<template>
    <div id="b-map"></div>
</template>

<script>

    module.exports = {
        data:function(){
            return {};
        },
        mounted:function(){
            var BMap = window.BMap;
            var map = new BMap.Map("b-map");
        }
    };
</script>

<style>
    #b-map{
        width: 1000px;
        height: 600px;
    }
</style>

