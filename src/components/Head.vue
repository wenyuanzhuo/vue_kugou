<template>
<div>
    <div class="logo-container">
        <div class="head-logo" @click="rebtn">
            
                <a href="#">
                    <img src="http://m.kugou.com/v3/static/images/index/logo.png">
                </a>
           
        </div>
        <div class="head-search" @click="search">
            <img src="http://m.kugou.com/v3/static/images/index/search.png">
        </div>
    </div>
    <v-headnav></v-headnav>
</div>
</template>
<script>
    import vHeadnav from './Headnav.vue'
    export default {
        name: 'Head',
        components: {
            vHeadnav
        },
        methods: {
            search () {
                this.$router.push({path: '/detail'})
            },
            rebtn () {
                this.$router.push({path: '/'})
            }
        }
    }
</script>
<style>
.container {
    width: 100%;
}
.logo-container {
    box-sizing: border-box;
    padding: 10px;
    background-color: #2CA2F9;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1050;
    display: flex;
    
}

.head-logo {
    height: 100%;
}
a {
    text-decoration: none !important;
}
.head-logo img {
    height: 100%;
}

.head-search {
    position: absolute;
    right: 10px;
    height: 100%;
}
.head-search img {
    height: 28px;
}

</style>