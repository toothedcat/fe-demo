<template>
    <div class="login">
        <div class="login-header">iMCPTT调度系统</div>
        <div class="login-body">
            <div class="login-box">
                <input type="text" placeholder="账号或手机号">
                <br/>
                <input type="password" placeholder="密码">
                <br/>
                <button @click="loginClickHandler">登录</button>
            </div>
        </div>
        <div class="login-footer">
        深圳市国创通信技术有限公司保留所有权
        </div>
    </div>
</template>

<script>
var navigator = require("utils/navigator");
module.exports = {
    data:function(){
        return {

        };
    },
    methods:{
        loginClickHandler:function(){
            navigator.fire("navigate", "schedule");
        }
    }
};
</script>

<style>
    .login{
        width: 100%;
        height: 100%;
        min-width: 1200px;
        position: relative;
    }
    .login-header{
        width:100%;
        height: 100px;
        background-color: #ddd;
    }
    .login-body{
        position: absolute;
        left: 0;
        right: 0;
        top: 100px;
        bottom: 60px;
        background-color: #ccc;
    }
    .login-box{
        width: 300px;
        height: 300px;
        position: absolute;
        right: 50px;
        top: 200px;
    }
    .login-footer{
        height: 60px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #008888;
    }
</style>