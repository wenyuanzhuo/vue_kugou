import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Detail from '@/components/Detail'
import Rank from '@/components/Rank'
import Plist from '@/components/Plist'
import Singer from '@/components/Singer'
import PlistInfo from '@/components/PlistInfo'
import RankInfo from '@/components/RankInfo'
import SingerList from '@/components/SingerList'
import SingerInfo from '@/components/SingerInfo'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/rank/info/:id',
      name: 'RankInfo',
      component: RankInfo
    },
    {
      path: '/plist',
      name: 'Plist',
      component: Plist
    },
    {
      path: '/plist/info/:id',
      name: 'PlistInfo',
      component: PlistInfo
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/singer/list/:id',
      name: 'SingerList',
      component: SingerList
    },
    {
      path: '/singer/info/:id',
      name: 'SingerInfo',
      component: SingerInfo
    },
  ]
})
export default router