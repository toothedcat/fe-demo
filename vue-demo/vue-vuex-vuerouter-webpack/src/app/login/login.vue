<template>
    <div>{{message}}</div>
</template>

<script>
    var vm = {
        data:function(){
            for(let i=0;i<100;i++){
                console.log(i);
            }
            class Test{
                send(){
                    console.log('send')
                }
            };
            new Test().send();
            function *g(){
                yield 'hello';
                yield 'world'
            };
            let obj = {};
            obj.iterator = g();
            for(let i of obj){
                console.log(i)
            }
            return {message:'login'};
        }
    }
    export default vm;
</script>

<style>
</style>