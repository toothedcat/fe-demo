import Vue from 'vue';
import VueRouter from 'vue-router';

import Button from '@/docs/components/button.md';
import GetStarted from '@/docs/getstarted.md';
import Tutorial from '@/docs/tutorial.md';

const router = new VueRouter({
    routes:[{
        path:'/',
        component:GetStarted
    },{
        path:'/getstarted',
        component:GetStarted
    },{
        path:'/tutorial',
        component:Tutorial
    },{
        path:'/components',
        children:[{
            path:'/button',
            component:Button
        }]
    }]
});

export default router;