<template>
<div v-show="detailPlayerFlag">
    <div class="detail_player" :style="{backgroundImage:`url(${audio.imgUrl})`,filter: 'blur(5px)'}"></div>
    <div class="detail_player-content">
        <div class="detail_player-title container" @click="getback()">
            <div class="detail_play-back"></div>
                {{audio.title}}
        </div>
        <div class="detail_player-img">
            <img :src="audio.imgUrl" >
        </div>
        <div class="detail_player-lrc">
            <div class="lrc-content" :style="{marginTop: lrcOffset + 'px' }">
            <p v-for="(item,index) in songLrc"
                :class="{isCurrentLrc:item.seconds >= audio.currentLength}" :key="index">
                {{item.lrcContent}}</p>
            </div>
        </div>
        <div class="detail_player-range container">
            <span class="detail_player-time">{{audio.currentLength | time}}</span>
                <mt-range
                id="range"
                :min="0"
                :max="audio.songLength"
                v-model="audio.currentLength"
                :bar-height="3"
                @click.native="rangeChange($event)" disabled style="width: 80%"></mt-range>
            <span class="detail_player-time">{{audio.songLength | time}}</span>
        </div>
        <div class="detail_player-control player-padding">
            <i class="detail_player-btn play-prev player_btn-sm" @click="prev()"></i>
            <i class="detail_player-btn play-play player_btn-lg" :class="{'play-pause':isPlay}" @click="toggleStatus()"></i>
            <i class="detail_player-btn play-next player_btn-sm" @click="next()"></i>
        </div>
        </div>
    </div>
</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return {
                rangeValue: 0
            }
        },
        filters: {
            time(value){
                var length = Math.floor(parseInt(value));
                var minute = Math.floor(value / 60);
                if (minute < 10) {
                minute = '0' + minute;
                }
                var second = length % 60;
                if (second < 10) {
                second = '0' + second;
                }
                return minute + ':' + second;
            }
        },
        computed: {
            ...mapGetters(['audio', 'detailPlayerFlag', 'isPlay']),
            songLrc(){
                if (this.audio.lrc) {
                var temp = this.audio.lrc.split('\r\n')
                temp = temp.splice(0, temp.length - 1)
                temp = temp.map((value)=> {
                    var time = value.substr(1, 5)
                    var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
                    var lrcContent = value.substr(10)
                    return {
                    seconds,
                    lrcContent
                    }
                })
                return temp;
                }
            },
            lrcOffset(){
                if (this.songLrc) {
                var offset = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length - 2) * (-20)
                return this.audio.currentLength + offset - this.audio.currentLength
                }
            }
        },
        methods: {
            getback() {
                this.$store.commit('showDetailPlayer', this.payload)
            },
            rangeChange(event){
                var offset = event.offsetX
                var rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20
                var clickLength = Math.floor(offset * this.audio.songLength / rangeWidth)
                if (offset < rangeWidth) {
                this.$store.commit('setAudioTime', clickLength)
                this.$store.commit('setCurrent', true)
                }
            },
            toggleStatus(){
                if (this.isPlay) {
                document.getElementById('audioPlay').pause()
                } else {
                document.getElementById('audioPlay').play()
                }
                this.$store.commit('isPlay', !this.isPlay)
            },
            prev(){
                this.$store.dispatch('prev')
            },
            next(){
                this.$store.dispatch('next')
            }
            }
    }
</script>
<style>
    .detail_player {
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;    
        top: 0;
        z-index: 1010;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .detail_player-content {
        height: 100%;
        width: 100%;
        position: fixed;
        left: 0;    
        top: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 1010;
    }
    .detail_player-title {
        display: flex;
        width: 100%;
        height: 43px;
        background: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 43px;
        margin-top: 51px;
       
    }
    .detail_play-back {
        width: 24px;
        height: 43px;
        padding-left: 5px;
        background: url(../assets/back.png) no-repeat center;
    }
    
    .detail_player-img {
        width: 50%;
        margin: 30px auto;
    }
    .detail_player-img img {
        width: 100%;
    }
    .detail_player-control {
        width: 100%;
        height: 100px;
        position: absolute;
        left: 0;
        bottom: 104px;
        display: inline-block;
        display: flex;
    }
    .player-padding {
        padding: 0 20%;
        justify-content: space-around;
    }
    .detail_player-btn{
        width: 74.963px;
        /*padding: 0 5px;*/
    }
    .play-prev {
        background: url("../assets/images/play_prev.png") no-repeat;
        background-size: 60% auto;
        background-position: center
    }
    .play-play {
        background: url("../assets/images/play_play.png") no-repeat;
        background-size: 80% auto;
        background-position: center
    }
    .play-next {
        background: url("../assets/images/play_next.png") no-repeat;
        background-size: 60% auto;
        background-position: center
    }
    .detail_player-time{
        display: block;
        width: 10%;
        height: 30px;
        float: left;
        line-height: 30px;
        color: #fff;
        font-size: 12px;
        text-align: center
    }
    .detail_player-time:nth-of-type(2){
        float: right;
        margin-top: -30px;
    }
</style>