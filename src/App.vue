<template>
  <div id="app">
    <div class="container">
    <v-head></v-head>
    <div class="main">  
      <router-view></router-view>
    </div>
    <v-play></v-play>
    <div>
    <v-Desc></v-Desc>
    </div>
    </div>
  </div>
</template>

<script>
import {Swipe, SwipeItem} from 'mint-ui'
import {Cell} from 'mint-ui'
import vHead from './components/Head.vue'
import vPlay from './components/Play.vue'
import vDesc from './components/Desc.vue'
export default {
  name: 'app',
  components: {
    vHead,
    vPlay,
    vDesc
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
