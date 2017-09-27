<template>
    <div class="singer_list">
        <mt-cell v-for="(item,index) in list" :to="`/singer/info/${item.singerid}`" is-link :title="item.singername" :key="index">
            <img :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
        </mt-cell>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui'
    export default {
        data(){
            return {
                list: [],
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList(){
            Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
            });
            var singerID = this.$route.params.id
            this.$http.get(`/proxy/singer/list/${singerID}?json=true`).then(({data})=> {
                Indicator.close()
                this.list = data.singers.list.info
                  
                })
            }
        }
    }
</script>
<style>


</style>
