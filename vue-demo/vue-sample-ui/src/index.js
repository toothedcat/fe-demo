var Vue = require("vue");
var VueRouter = require("vue-router");
Vue.use(VueRouter);

// 导入浏览器样式重置文件
require("assets/reset.css");

var Login = require("app/login/login.vue");
var Schedule = require("app/schedule/schedule.vue");

// 定义路由
var routes = [{
    path:"/",
    component:Login
}, {
    path:"/schedule",
    component:Schedule
}];

var router = new VueRouter({
    routes:routes
});

router.beforeEach(function(to, from, next){
    next();
});

// 监听页面跳转事件
var navigator = require("utils/navigator");
navigator.on("navigate", function(path){
    router.push({
        path:path
    });
});

var app = new Vue({
    router:router
});
app.$mount("#vue-app");
