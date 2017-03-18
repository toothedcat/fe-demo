import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

// 导入浏览器样式重置文件
import 'assets/reset.css';

// 导入组件
import Login from 'app/login/main.vue';
import Cluster from 'app/cluster/main.vue';
import Group from 'app/group/main.vue';
import User from 'app/user/main.vue';

import navigator from 'utils/navigator';

// 定义路由
var routes = [{
    path:'/',
    component:Login
}, {
    path:'/cluster',
    component:Cluster
},{
    path:'/group',
    component:Group
},{
    path:'/user',
    component:User
}];

var router = new VueRouter({
    routes:routes
});

router.beforeEach((to, from, next) => {
    next();
});

// 监听页面跳转事件
navigator.$on('navigate', (path) => {
    router.push({
        path:path
    });
});

var app = new Vue({
    router:router
});
app.$mount('#vue-app');
