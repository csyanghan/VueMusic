import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 歌单推荐
const songList = () => import('./../pages/songList')
// 歌手页面
const singer = () => import('./../components/singer')
const singerDetail = () => import('./../components/singerDetail')
// 排行榜
const rank = () => import('./../components/rank')
// 推荐
const recommend = () => import('./../pages/recommend')
// 搜索
const search = () => import('./../components/search')
const result = () => import('./../components/result')
// 播放器组件
const player = () => import('./../components/player')
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/songList/:id',
      name: 'songList',
      component: songList
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/player',
      name: 'player',
      component: player
    },
    {
      path: '/search/result',
      name: 'result',
      component: result
    },
    {
      path: '/singerDetail',
      name: 'singerDetail',
      component: singerDetail
    }
  ]
})
