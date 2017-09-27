<template>
<div class="audio-view" :class="{'audio_panel_hide':toggleHide}">
    <audio :src="audio.songUrl" autoplay id="audioPlay" @timeupdate="change()" @ended="next()" @error="next()"></audio>
    <div class="audio-panel-control" @click="togglePanel" :class="{'toggleContral':toggleHide}">
        <mt-spinner type="snake" :size="27" v-show="audioLoadding"></mt-spinner>
    </div>

    <div class="audio-panel">
      <img  class="player-img" :src="audio.imgUrl" @click="showDetailPlayer()"/>
      <div class="play-status" @click="showDetailPlayer()">
          <p class="play-title">{{audio.title}}</p>
          <p class="play-singer">{{audio.singer}}</p>
      </div>
    </div>
    <div class="player-controls">
        <span class="player-Play" @click="toggleStatus()" :class="{'player-Pause': isPlay}"></span>
        <span class="player-nextSong" @click="next()"></span>
    </div>

</div>
</template>
<script type="es6">
    import {mapGetters} from 'vuex'
    export default {
        computed:{
             ...mapGetters([ 'audioLoadding', 'isPlay','toggleHide','showPlayer','audio'])
        },
        methods: {
            togglePanel () {
                this.$store.commit('hide', this.payload)
            },
            showDetailPlayer () {
                // if(this.showPlayer) {
                    this.$store.commit('showDetailPlayer', this.payload )
                // }
            },
            toggleStatus() {
                // 点击放歌(isPlay为true)
                // 再点击停止(isplay为false 这只是控制图标变化)真正的停止是audio停止
                // if(this.isPlay){
                //     // audio开始
                // }else{
                //     // audio停止
                // }
                // isplay状态的改变
                // this.$store.commit()
                if(this.payload) {
                    document.getElementById('audioPlay').play();
                }{
                    document.getElementById('audioPlay').pause();
                }
                this.$store.commit('isPlay', !this.payload);
            },
            change(){
                var time = document.getElementById('audioPlay').currentTime
                if (this.audio.currentFlag) {
                document.getElementById('audioPlay').currentTime = this.audio.currentLength;
                this.$store.commit('setCurrent', false);
                } else {
                this.$store.commit('setAudioTime', time);
                }
            },
            next() {
                this.$store.dispatch('next');
            }
        }
    }
</script>
<style>
    .audio-view{
        height: 110px;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        /*background-color: #ccc;*/
        transition: all .5s;
    }
    .audio_panel_hide{
        bottom: -65px;
    }
    /*.toggleContral {
        background: rgba(0,0,0,.8) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAABfVBMV…vm3PAR9J25tvCL9PJqx/SauSfcP3sLWvxSp4yi5dBpv8f+A04Jm11/0N4OAAAAAElFTkSuQmCC) no-repeat center;
        background-size: 25px !important;
    }*/
    .audio-panel-control {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-left: 10px;
        background:rgba(0,0,0,.8) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAABj1BMVEW7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7twwokJAAAAhHRSTlMAAQIDBAUGBwgMDg8QERITFRYXGxweHyEiJCYnKCkqLC0zNDY4Oj0+P0JDREVHS01PUlhZWltfY2dpamtucHJ1eXt8fX+Cg4WGh4iJio6VmJmam5ydnp+lp6ytsLK1uLm7vsDEy87P0NHS09XX2drd3t/g4eLj5+jp7/Dx9PX29/j6/f6x+3sqAAAB6UlEQVQ4y33U6VsSURTH8S9CEi2WWJlhm20OSbaZbWZBRWh72UrQCqVCYgUyA1j5+8N7MQgzMHRezbnP57lnZu45F9rhN5LZkimzlE1G/XjFYKqsdpRTg12iP16XlubO7A8RGpm8vyzVE/1uciCnjTfHHAsn0lIu4iTjVRXHO3aOrqjqWDPqer2tq/yOtBrGZhIx9dTrO/wvZTbLBXNKe3+q/53yQQBuaWU73jHwS3GAcF0xesWUGmHgnt73JPR9UQoCZRm9DZOqBDD0w/cfE6hogqQe21nsdtj542/ssx8WNE9GlwC4+FeFoRYZM1UZAeCyMqzqOACLkopDbSI9BOCkSlgaBiCpNhozJW2cA+CQLKQ9APgetZBNrtlb7pWwZNfF96SJbHK1WfaILFZ1qpn5nklS8ayLEFOJjFqpjeQizChDUq9aue95F+Gt5jFU3do+noVOEqppgkBFU46OeeEmTKsSgJQW+xzowfdp53EVlALCDV3peaQzdv8QlzXcgxys2X1IMK9v3s26e3mzn4mY+rTTg+z63JoLMNa1NNpFDhe0brjmtDa7xX0B3Ky75hRGv0ql6wPtN5n5KeU79g4mGtLvD3fOR4+evnD34x+pkQh2lQ+n1hz3z9pc2Ht0o8lsyZLVeY/9AynyoZEC07FKAAAAAElFTkSuQmCC) no-repeat center;
        background-size: 25px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    .audio-panel{
        margin-top: 10px;
        width: 100%;
        height: 64px;
        /*background-color:green;*/
        display: flex;
        background-color: rgba(0,0,0,0.8);
    }
    .player-img{
        margin: auto 7px;
        
        height: 50px;
        width: 50px;
    }
    .play-status{
        
        margin:auto 4px;
        height: 46px;
        width: 56%;
    }
    .play-status p {
        text-align: left;
        color: #fff;
    }
    .play-title{
        font-size: 15px;
        line-height: 16px;
    }
    .play-singer{
        font-size: 14px;
        line-height: 14px;
    }
    .player-controls{
        height: 50px;
        width: 108px;
        position: absolute;
        right: 7px;
        bottom: 7px;
        display: flex;
    }
    .player-Play{
        display: block;
        width: 50%;
        height: 100%;
        background: url(../assets/pause.png) no-repeat center;
        -webkit-background-size: auto 75%;
        background-size: auto 75%;
    
    }
    .player-nextSong {
        display: block;
        width: 50%;
        height: 100%;
        background: url(../assets/nextsong.png) no-repeat center;
        -webkit-background-size: auto 50%;
        background-size: auto 50%;
    }
    .player-Pause{
        background: url(../assets/play.png) no-repeat center;
        background-size: auto 75%;
    }


</style>