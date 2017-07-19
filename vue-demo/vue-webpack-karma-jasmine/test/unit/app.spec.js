import Vue from 'vue';
import App from '../../src/app/app.vue';

describe('test app.vue',() => {
    it('title should be 七步诗 曹植 after component mounted',() => {
        let vm = new Vue(App).$mount();
        expect(vm.title).toEqual('七步诗 曹植');
    });
});