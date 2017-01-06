
var ModalTrigger = function(Dialog){
    var modalEl = window.document.querySelector('.vue-modal');
    this.vm = new Vue({
        el:modalEl,
        template:'\
            <div :class="modalCls">\
                <custom-dialog />\
            </div>\
        ',
        data:{
            active:false
        },
        computed:{
            modalCls:function(){
                return {
                    "mt-modal":true,
                    "mt-modal-active":this.active
                };
            }
        },
        components:{
            'custom-dialog':Dialog
        },
        methods:{
            show:function(Dialog){
                this.$options.components['custom-dialog'] = Dialog;
                this.active = true;
            },
            hide:function(){
                this.active = false;
            },
            close:function(){

            }
        }
    });
};


ModalTrigger.prototype.show = function(){
    this.vm.show();
};

ModalTrigger.prototype.hide = function(){
    this.vm.hide();
};

ModalTrigger.prototype.close = function(){
    this.vm.$destroy();
};

