<template>
   <div class="plist">
		<mt-cell v-for="(item,index) in sheetList" :title="item.specialname" 
        :to="`/plist/info/${item.specialid}`" is-link  :key="index">
			<img  :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
		</mt-cell>
	</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'plist',
        computed: {
            ...mapGetters([
                'sheetList'
            ])
        },
        created(){
            this.$store.dispatch('getSheetList')
        },
    }
</script>
<style>
   
</style>