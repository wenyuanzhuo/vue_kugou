<template>
  <div class="rank-info-content plist-info">
    <div class="rank-head" @click="getback()">
        <div class="detail_player-back"></div>
    </div>
		<div class="rank-banner-wrap"
		     :style="{backgroundImage: `url(${imgurl})`}">
		</div>
		
		<div class="plist-desp container">
			<p class="plist-desp-p" :class="{'plist-desp-hide': hideDesp }">{{desp}}</p>
			<img src="../assets/images/close_icon.png" alt="" @click="toggleDesp" class="plist-desp-icon" v-if="hideDesp">
			<img src="../assets/images/open_icon.png" alt="" @click="toggleDesp" class="plist-desp-icon" v-else>
		</div>
		<div class="plist-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>
		
		<div class="rank-info-list">
			<mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
				<img src="../assets/images/download_icon.png" width="20" height="20">
			</mt-cell>
		</div>
	</div>
</template>
<script>
    import {PLAY_AUDIO} from '../mixins'
    import { Indicator } from 'mint-ui'
    export default {
      mixins: [PLAY_AUDIO],
      data() {
        return {
          songList: [],
          imgurl: '',
          desp: '',
          hideDesp: false
        }
      },
      created() {
        this.getList()
      },
      methods: {
        getback() {
          this.$router.go(-1)
        },
        getList(){
          Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
          });
          var infoID = this.$route.params.id
          this.$http.get(`/proxy/plist/list/${infoID}?json=true`).then(({data}) => {
            Indicator.close()
            const info = data.info.list
            const list = data.list.list.info
            this.songList = list
            this.imgurl = info.imgurl.replace('{size}', '400')
            this.desp = info.intro
            // this.$store.commit('setHeadTitle', info.specialname)
          });
        },
        toggleDesp(){
          this.hideDesp = !this.hideDesp
        },
      }
    }
</script>
<style scoped>

 .rank-head {
    display: flex;
    width: 100%;
    height: 40px;
    margin-top: -80px;
    z-index: 1100;
  }
  .detail_player-back {
    width: 24px;
    height: 43px;
    margin-top: 40px;
    padding-left: 5px;
    background: url(../assets/back.png) no-repeat center;
    z-index: 1100;
  }
  .rank-banner-wrap {
		height: 290px;
		background-size: 100%;
    position: relative;
    width: 100%;
    margin-top: -40px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .plist-desp-hide {
    height: 0;
    opacity: 0;
    transition: all .5s;
  }
</style>
