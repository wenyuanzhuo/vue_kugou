<template>
<div>
    <div class="search-panel">
        <div class="search-input">
            <div class="search-icon"></div>
            <input type="text" v-model="keyword" placeholder="歌手/歌名/拼音"/>
        </div>
        <a href="javascript:;" @click="search" class="search-btn">搜索</a>
    </div>
    
    <div class="search-list" v-show="togglePanel">
      <div class="search-list-title">最近热门</div>
      <mt-cell v-for="(item,index) in hotList" :title="item.keyword" @click.native="replaceInput(index)" :key="index"></mt-cell>
    </div>

    <div class="songs-list" v-show="!togglePanel">
      <div class="search-total">
        共有{{total}}条搜索结果
      </div>
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
        keyword: '',
        hotList: [],
        togglePanel: true,
        total: null,
	      songList: []
      }
    },
    created(){
    	this.getList()
    },
    methods: {
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.get('/aproxy/api/v3/search/hot?format=json&plat=0&count=30').then(({data})=> {
					Indicator.close();
	        this.hotList = data.data.info
        });
      },
      replaceInput(index){
        this.keyword = this.hotList[index]
        this.Search()
      },
      search(){
        this.togglePanel = false
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        })
	      if(this.keyword)
        this.$http.get(`/aproxy/api/v3/search/song?format=json&keyword=${this.keyword}&page=1&pagesize=30&showtype=1`).then(({data})=> {
	        this.songList = data.data.info
	        this.total = data.data.total
          Indicator.close()
        })
      }
    }
  }
</script>
<style>
* {
    box-sizing: border-box;
}
.search-panel {
    height: 55px;
    padding: 10px;
    background-color: #fbfbfb;
}
.search-input {
    /*display: block;*/
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    height: 100%;
    width: 80%;
    border-radius: 5px;
    float: left;
}
.search-btn {
    height: 100%;
    width: 18%;
    float: right;
    background-color: #2ba2fa;
    font-size: 15px;
    line-height: 35px;
    text-align: center;
    color: #ffffff;
    border-radius: 7px;
}
.search-icon {
    height: 100%;
    width: 10%;
    background: url(http://m.kugou.com/v3/static/images/index/search_icon.png) no-repeat center;
    background-size: auto 100%;
    float: left;
}
.search-input input {
    display: inline-block;
    padding: 0 10px 0 0;
    outline: none;
    border: none;
    height: 100%;
    width: 90%;
    
}
.search-list-title {
    display: flex; 
    width: 68px;
    font-size: 16px;
    border-left:4px solid  #2CA2F9;
    margin-left: 10px;
}
</style>