<template>
  <div class="rank-info-content plist-info">
     <div class="rank-head" @click="getback()">
          <div class="detail_player-back"></div>
      </div>
    <div class="rank-banner-wrap" :style="{backgroundImage:'url('+ imgurl +')'}">
    </div>

    <div class="plist-desp container">
      <p class="plist-desp-p" :class="{'plist-desp-hide': hideDesc }">{{desc}}</p>
      <img src="../assets/images/close_icon.png" @click="toggleDesc" class="plist-desp-icon" v-if="hideDesc">
      <img src="../assets/images/open_icon.png" @click="toggleDesc" class="plist-desp-icon" v-else>
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
    import { Indicator } from 'mint-ui'
    import { PLAY_AUDIO } from '../mixins'
    export default {
      mixins: [PLAY_AUDIO],
      data(){
         return {
          imgurl: '',
          songList: [],
          desc: '',
          hideDesc: true,
       
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
          var infoID = this.$route.params.id;
          this.$http.get(`/proxy/singer/info/${infoID}&json=true`).then(({data})=> {
            Indicator.close()
            console.log(data)
            const info = data.info
            const songList = data.songs.list
            this.imgurl = info.imgurl.replace('{size}', '400')
            this.desc = info.intro
            this.songList = songList
            
          });
        },
        toggleDesc(){
          this.hideDesc = !this.hideDesc
        }
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
    position: relative;
    width: 100%;
    height: 290px;
    margin-top: -40px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;

  }
  .plist-desp{
    width: 330px;

  }
  .plist-desp p{
    font-size: 15px;
  }
  .plist-desp img {
    position: absolute;
    right: 10px;
    top: 300px;
  }
  .plist-desp-hide {
    height: 35px;
    opacity: 0;
    transition: all .5s;
  }
</style>
