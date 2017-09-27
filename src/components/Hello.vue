<template>
  <div class="Hello">
    <mt-swipe :auto="5000">
        <mt-swipe-item v-for="(banner, index) in banners" :key="index">
          <img :src="banner.imgurl"/>
        </mt-swipe-item>
    </mt-swipe>
    <v-cell></v-cell>
  </div>
</template>

<script>
import {Swipe, SwipeItem} from 'mint-ui'
import {mapGetters} from 'vuex'
// import {Cell} from 'mint-ui'
import vCell from '@/components/Cell.vue'
export default {
  name: 'Hello',
  // data () {
  //   return {
  //     // banners: this.$store.state.banners
  //       banners: [],
  //       songList: []
  //   }
  // },
  computed: {
    ...mapGetters([
      'banners'
    ])
  },
  created(){
    // this.getSongs()
    this.$store.dispatch('getSongs')
  },
  // methods: {
  //   getSongs(){
  //     Indicator.open({
	// 				text: '加载中...',
	// 				spinnerType: 'snake'
	// 			});
  //     this.$http.get('/proxy/?json=true').then(({data}) => {
  //       this.banners = data.banner
  //       this.songList = data.data 
  //     }).then(() => {
  //       Indicator.close()
  //     })
  //   }
  // },
  components: {
    vCell
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.mint-swipe{
  height: 141px;
  font-size: 14px;
}
.mint-swipe img {
  height: auto;
  max-width: 100%;
  vertical-align: top;
}
</style>
