<template>
<div class="container">
  <div class="swiper">
      <Carousel autoplay loop v-model="valuepic">
        <CarouselItem v-for="(item, index) in banners" :key="index">
          <a :href="item.url">
            <img :src="item.pic">
          </a>
        </CarouselItem>
      </Carousel>
  </div>
  <div class="recommend-menu">
  <div class="recommend-item" @click="slideTo(1)">
    <img src="./fm.png" alt="私人FM">
    <h4>私人FM</h4>
  </div>
  <div class="recommend-item" @click="slideTo(2)">
    <img src="./recommend.png" alt="每日歌曲推荐">
    <h4>每日歌曲推荐</h4>
  </div>
  <div class="recommend-item" @click="slideTo(3)">
    <img src="./top.png" alt="云音乐热歌榜">
    <h4>云音乐热歌榜</h4>
  </div>
  </div>
  <div class="recommend-songList">
    <h2 class="title">推荐歌单</h2>
    <div class="list-wipper">
      <div class="item-1-3" v-for="(item, index) in reSongList" :key="index" @click="toSongList(item.id, item, 'tj', item.name, item.picUrl)"
      v-if=" index<=5 ">
        <img v-lazyload="item.picUrl" alt=" ">
        <h3 class="item-title">{{item.name}}</h3>
      </div>
    </div>
  </div>
  <div class="recommend-newSongsList">
    <h2 class="title">最新音乐</h2>
    <div class="list-wipper">
      <div class="item-1-3" v-for="(item, index) in newSongsList" :key="index" @click="toSongList(item.song.album.id, item, 'zx', item.name, item.picUrl)"
      v-if=" index<=5 ">
        <img v-lazyload="item.song.album.picUrl" alt=" ">
        <h3 class="item-title">{{item.name}}</h3>
        <span class="artist-name">{{item.song.artists[0].name}}</span>
      </div>
    </div>
  </div>
  <div class="recommend-private">
    <h2 class="title">独家放送</h2>
    <div class="list-wipper">
      <div class="item-1-2" v-for="(item, index) in privateList" :key="index" @click="toSongList(item.id, item, 'dj', item.name, item.picUrl)"
      v-if=" index>=1 && index <=2">
        <img v-lazyload="item.picUrl" alt=" ">
        <h3 class="item-title">{{item.name}}</h3>
      </div>
      <div class="item-1" v-for="(item, index) in privateList" :key="index" v-if=" index===0">
        <img :src="item.picUrl" alt=" ">
        <h3 class="item-title">{{item.name}}</h3>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default{
  name: 'recommend',
  data () {
    return {
      banners: [],      // 轮播图地址
      valuepic: 0,      // 第一张轮播图
      reSongList: [],   // 推荐歌单
      privateList: [],  // 独家放送
      newSongsList: []  // 最新音乐
    }
  },
  mounted () {
    this.getBanner()
    this.getreSongList()
    this.getNewSongs()
    this.getPrivate()
  },
  methods: {
    // 获取轮播图banner
    getBanner() {
      axios.get('/banner').then(res => {
        var _this = this
        console.log('获取banner成功')
        console.log(res.data.banners)
        _this.banners = res.data.banners
      })
    },
    // 获取推荐歌单数据
    getreSongList() {
      axios.get('/personalized').then(res => {
        var _this = this
        console.log('获取推荐歌单数据成功')
        console.log(res.data.result)
        _this.reSongList = res.data.result
      })
    },
    // 获取最新音乐
    getNewSongs() {
      axios.get('/personalized/newsong').then(res => {
        var _this = this
        console.log('获取最新音乐')
        console.log(res.data.result)
        _this.newSongsList = res.data.result
      })
    },
    // 独家放送
    getPrivate() {
      axios.get('/personalized/privatecontent').then(res => {
        var _this = this
        console.log('独家放送')
        console.log(res.data.result)
        _this.privateList = res.data.result
      })
    },
    //  跳转到歌单
    toSongList(id, obj, type, name, picUrl) {
      this.$router.push({
        path: `/songList/${id}`,
        query: {
          type: type,
          name: (name || ''),
          picUrl: (picUrl || null)
        }
      })
    }
  }
}
</script>

<style scoped>
.swiper img{
  width: 100%;
}
.container .recommend-menu{
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eee;
}
.container .recommend-menu .recommend-item{
  flex: 1;
  text-align: center;
  padding: 5px 15px 0 0;
}
.container .recommend-menu .recommend-item img{
  width: 45%;
  height: auto;
}
.container .recommend-menu .recommend-item h4{
  font-size: 12px;
}
.container  .title{
  font-size: 15px;
  padding-left: 10px;
  border-left: 2px solid #D23023;
  margin: 15px 0 15px 0;
}
.container .list-wipper{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  flex: 1;
}
.container .item-1-3,
.container .item-1-2
{
  display: inline-block;
  margin-bottom: 10px;
  height: auto;
}
.item-1-3{
  width: 33%;
}
.item-1-2{
  width: 50%;
}
.item-1{
  width: 100%
}
.item-1-3 img,
.item-1-2 img,
.item-1 img
{
  width: 100%;
  height: auto;
}
</style>
