<template>
  <div class="rank-info-content">
      <div class="rank-head" @click="getback()">
          <div class="detail_player-back"></div>
      </div>
      <div class="rank-banner-wrap" :style="{backgroundImage:'url('+ imgurl +')'}">
        <div class="rank-status container">
			  	<!--<p>上次更新时间：{{getToday()}}</p>-->
			  </div>
      </div>
      <div class="rank-info-list">
        <mt-cell v-for="( item ,index) in songList" :title="item.filename"  @click.native="playAudio(index)" :key="index" >
          <span class="rank-index"></span>
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
        data() {
          return {
              imgurl: '',
              songList: ''
          }
        },
        created() {
          this.getList()
        },
        methods: {
          getback() {
            this.$router.go(-1)
          },
          getList() {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'snake'
            })
            var infoID = this.$route.params.id;
            this.$http.get(`/proxy/rank/info/?rankid=${infoID}&page=1&json=true`).then(({data}) => {
              Indicator.close()
              const {info, songs} = data
              const {banner7url, rankname} = info
              const {list} = songs
              this.imgurl = banner7url.replace('{size}', '400')
              this.songList = list
              // this.$store.commit('setHeadTitle', rankname)
            })
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
    height: 200px;
    margin-top: -40px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;

  }
</style>
