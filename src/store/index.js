import Vue from 'vue'
import Vuex from 'vuex'
import { Indicator } from 'mint-ui'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        audio: {
            title: '',
            singer: '',
            imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',//默认
            songUrl: '',
            currentLength: 0,
			songLength: 0,
			currentFlag: false

        },
        headNav: 'head-nav1',
        banners: [],
        songList: [],
        rankList: [],
        sheetList: [],
        audioLoadding: false,
        isPlay: true,
        toggleHide: false,
        showPlayer: false,
        detailPlayerFlag: false,
        listenCount: 0,
        listInfo: {
			songList: [],
			songIndex: 0
		}
    },
    getters: {
        audio: state => state.audio,
        headNav: state => state.headNav,
        audioLoadding: state => state.audioLoadding,
        isPlay: state => state.isPlay,
        toggleHide: state => state.toggleHide,
        showPlayer: state => state.showPlayer,
        detailPlayerFlag: state => state.detailPlayerFlag,
        banners: state => state.banners,
        songList: state => state.songList,
        rankList: state => state.rankList,
        sheetList: state => state.sheetList
    },
    
    mutations: {
        setHeadNav(state, nav) {
            state.headNav = nav 
        },
        hide(state, payload) {
            state.toggleHide = !state.toggleHide,
            payload = state.toggleHide
        },
        showDetailPlayer(state,payload) {
           state.detailPlayerFlag = !state.detailPlayerFlag
           payload = state.detailPlayerFlag
        },
        isPlay(state, payload) {
            state.isPlay = !state.isPlay
            payload = state.isPlay 
           
        },
        setAudioTime(state, time){
			state.audio.currentLength = time
		},
        setCurrent(state, flag){
			state.audio.currentFlag = flag
		},
        getSongs(state, banners) {
            state.banners = banners
        },
        getSongList(state, songList) {
            state.songList = songList
        },
        getRank(state, rankList){
            state.rankList = rankList
        },
        getSheet(state, sheetList){
            state.sheetList = sheetList
        },
        toggleAudioLoadding(state, payload) {
            state.audioLoadding = payload
        },
        setListInfo(state,{list, index}) {
            state.listInfo.songList = list
            state.listInfo.songIndex = index 
        },
        setAudio(state, audio){
			if (!state.listenCount) {
				state.showPlayer = true  //首次进入应用时不可打开播放详情
			}
			state.listenCount++
			state.audio = {...(state.audio), ...audio}
		}
        // setHeadTitle(state, title){
		// 	state.head.title = title
		// },

    },
    actions: {
        getSongs({commit, state}) {
            Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				axios.get('/proxy/?json=true').then(({data}) => {
					state.banners = data.banner
                    state.songList = data.data
					commit('getSongs',state.banners)
                    commit('getSongList', state.songList)
               
				}).then(() => {
					Indicator.close()
				})
        },
        getRankList({commit, state}) {
            Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				axios.get('/proxy/rank/list&json=true').then(({data}) => {
					Indicator.close();
				    state.rankList = data.rank.list
                     commit('getRank', state.rankList)
				});
        },
        getSheetList({commit, state}) {
            Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				axios.get('/proxy/plist/index&json=true').then(({data}) => {
					Indicator.close()
					state.sheetList = data.plist.list.info
                    commit('getSheet', state.sheetList)
				})
        },
        getSong({commit, state},hash) {
            commit('toggleAudioLoadding', true)
            axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(({data}) => {
                data = data.data
				const songUrl = data.play_url
				const imgUrl = data.img
				const title = data.audio_name
				const songLength = data.timelength / 1000
				const singer = data.author_name
				const currentLength = 0;
				const lrc = data.lyrics
				const	audio = {songUrl, imgUrl, title, singer, songLength, currentLength}
                commit('setAudio', audio)
                commit('toggleAudioLoadding', false)
                
            })
        },
        next({dispatch, state}){
			var list = state.listInfo.songList
			if (state.listInfo.songIndex == list.length - 1) {
				state.listInfo.songIndex = 0
			} else {
				++state.listInfo.songIndex
			}
			var hash = list[state.listInfo.songIndex].hash
			dispatch('getSong', hash)
		},
        prev({dispatch, state}){
			var list = state.listInfo.songList
			if (state.listInfo.songIndex == 0) {
				state.listInfo.songIndex = list.length
			} else {
				state.listInfo.songIndex--
			}
			var hash = list[state.listInfo.songIndex].hash
			dispatch('getSong', hash)
			dispatch('getLrc', hash)
		}
    }

})
export default store 