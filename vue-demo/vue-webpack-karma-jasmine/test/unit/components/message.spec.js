import Vue from 'vue';
import Message from '../../../src/app/components/message.vue';

describe('test message.vue',() => {
    it('message should be "Hello world"',() => {
        let vm = new Vue(Message);
        expect(vm.msg).toEqual('Hello world');
    });
});