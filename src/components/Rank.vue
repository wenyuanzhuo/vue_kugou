<template>
<div class="rank">
    <mt-cell v-for="(item,index) in rankList" :title="item.rankname" :to="`/rank/info/${item.rankid}`" is-link :key="index">
		<img :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
	</mt-cell>
</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        
        computed: {
            ...mapGetters([
                'rankList'
            ])
        },
        created(){
            this.$store.dispatch('getRankList')
        },
    }
</script>
<style>
</style>