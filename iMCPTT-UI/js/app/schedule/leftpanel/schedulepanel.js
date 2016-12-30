define(["vue","js/components/tree/tree.js"],function(Vue,Tree){
    return {
        template:'<div class="tree">\
            <tree :tree-data="treeData"></tree>\
        </div>',
        data:function(){
            var treeData = {
                name:'root',
                checked:true,// 是否被选中
                open:true,// 是否展开
                children:[{
                    name:'湖南铁路公安',
                    children:[{
                        name:'长沙南所',
                        children:[{
                            name:'开福警务区',
                            children:[{
                                name:'警员A'
                            },{
                                name:'警员B'
                            },{
                                name:'警员C'
                            },{
                                name:'警员D'
                            },{
                                name:'警员E'
                            }]
                        }]
                    },{
                        name:'邵阳南所'
                    },{
                        name:'湘潭北所'
                    }]
                }]
            };
            return {
                'treeData':treeData
            };
        },
        components:{
            tree:Tree
        }
    };
});