<template>
<div class="cell">
<mt-cell v-for="(song,index) in songList" :title="song.filename" :key="index" @click.native="playAudio(index)">

  <img  src="../assets/images/download_icon.png" width="24" height="24">
</mt-cell>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import { PLAY_AUDIO } from '../mixins'
import {Cell} from 'mint-ui'
    export default {
        mixins: [PLAY_AUDIO],
        name: 'Cell',
        computed: {
            ...mapGetters([
            'songList'
            ])
        },
        created(){
            this.$store.dispatch('getSongs')
        },
    }
</script>
<style >
     .mint-cell-wrapper {
         font-size: 14px;
    }
     .mint-cell-title {
        padding:  0 10px;
        position: relative;
    }
     .mint-cell-text{
        position: absolute;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        left: 0;

    }

</style>