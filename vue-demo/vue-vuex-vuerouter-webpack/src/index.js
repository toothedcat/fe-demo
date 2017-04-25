import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

// 导入浏览器样式重置文件
import 'assets/reset.css';
import 'assets/common.css';
import 'assets/bootstrap/css/bootstrap.min.css';

// 导入组件
import App from 'app/app.vue';
import Cart from 'app/cart/cart.vue';
import Goods from 'app/goods/goods.vue';

import navigator from 'utils/navigator';

// 定义路由
const routes = [{
    path:'/',
    component:Goods
}, {
    path:'/cart',
    component:Cart
},{
    path:'/goods',
    component:Goods
}];

const router = new VueRouter({
    routes
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

const app = new Vue({
    router,
    template:'\
        <app/>\
    ',
    components:{
        app:App
    }
});
app.$mount('#vue-app');
