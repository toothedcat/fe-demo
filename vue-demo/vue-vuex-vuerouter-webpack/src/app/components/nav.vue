<style lang="less">
    .item-count{
        color: #fff;
        background-color: #d9534f;
    }
</style>
<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a class="navbar-brand"
                   href="#"
                   v-link="{ path: '/' }">Shopping Cart</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/goods" tag="li" active-class="active">
                        <a href="#!"> 
                            商品 
                            <span class="sr-only">(current)</span>
                        </a>
                    </router-link>
                    <router-link to="/cart" tag="li" active-class="active">
                        <a href="#!"> 
                            购物车 
                            <span class="badge item-count" v-if="totalItem">{{totalItem}}</span>
                        </a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        computed:{
            totalItem(){
                return 3;
            }
        }
    }
</script>