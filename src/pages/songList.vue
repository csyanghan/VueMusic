<template>
  <div class="songList">
    <div class="header">
      <div class="back" @click="goback()">
        <Icon type="ios-arrow-left" size=32></Icon>
      </div>
      <div class="title">
        <h1>{{type}}</h1>
      </div>
      <router-link to="/player">
        <div class="listing">
          <Icon type="ios-search" size=32 color="black"></Icon>
        </div>
      </router-link>
    </div>
    <div class="list-top">
      <div class="list-top-after" :style="{backgroundImage: 'url('+coverImgUrl+')'}"></div>
      <div class="msg-box">
        <div class="msg-img">
          <img :src="coverImgUrl" alt="">
        </div>
        <div class="msg-txt">
          <h1>{{name}}</h1>
          <div v-if="avatarUrl && type === '歌单'">
            <img :src="avatarUrl" class="author-ava" alt="">
            <span class="author-name">{{nickname}}</span>
          </div>
          <div v-if="nickname && type === '专辑'">
            <span class="author-name">歌手:{{nickname}}</span>
            <h2 class="pubTime">发行时间:{{date}}</h2>
          </div>
        </div>
      </div>
      <div class="choose-box">
        <div>
        <Icon type="android-favorite-outline" size=24></Icon>
        <span>{{collectCount}}</span>
        </div>
        <div>
        <Icon type="chatbox-working" size=24></Icon>
        <span>{{commentCount}}</span>
        </div>
        <div>
        <Icon type="android-share-alt" size=24></Icon>
        <span>{{shareCount}}</span>
        </div>
        <div>
        <Icon type="ios-cloud-download-outline" size=24></Icon>
        <span>下载</span>
        </div>
      </div>
    </div>
    <div class="list-title">
      <div class="loading-con" v-if="!songList">
        <Spin >
          <Icon type="load-a" size=48 class="loading"></Icon>
          <div :style="{'color': 'red'}">Loading</div>
        </Spin>
      </div>
      <div class="list" v-for="(item, index) in songList" :key="index" @click="toPlay(item.id,index)">
        <div class="index-num">
          <span>{{index+1}}</span>
        </div>
        <div class="song-title">
          <div class="song-mes">
          <h4 class="song-name">{{item.name}}</h4>
          <h4 class="song-des">{{item.ar[0].name+(item.ar[1]?'/'+item.ar[1].name:'')+(item.al?'-'+item.al.name:'')}}</h4>
          </div>
          <div class="song-icon">
          <Icon type="android-more-vertical" size=38></Icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      type: '',
      name: '',          // 歌单标题
      artist: '',        // 作者
      coverImgUrl: null, // 封面图片
      collectCount: 0,   // 收藏数
      commentCount: 0,   // 评论数
      shareCount: 0,     // 转发数
      avatarUrl: null,   // 作者头像
      nickname: '',      // 作者昵称
      songList: null,    // 歌单数据
      date: ''           // 歌单发行时间
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.name = this.$route.query.name || ''
      this.coverImgUrl = this.$route.query.picUrl || null
      if (this.$route.query.type === 'tj') {
        this.type = '歌单'
        this.getPlayListDetail()
      } else if (this.$route.query.type === 'zx') {
        this.type = '专辑'
        this.getAlbum()
      }
    }
  },
  methods: {
    // 获取歌单数据
    getPlayListDetail() {
      var _this = this
      axios.get('/playlist/detail', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        console.log('获取歌单信息成功')
        console.log(res.data.playlist)
        _this.collectCount = res.data.playlist.subscribedCount
        _this.commentCount = res.data.playlist.commentCount
        _this.shareCount = res.data.playlist.shareCount
        _this.name = res.data.playlist.name
        _this.coverImgUrl = res.data.playlist.coverImgUrl
        _this.avatarUrl = res.data.playlist.creator.avatarUrl
        _this.nickname = res.data.playlist.creator.nickname
        _this.songList = res.data.playlist.tracks
        _this.$store.commit('setSongsList', _this.songList)
      })
    },
    // 专辑数据
    getAlbum() {
      var _this = this
      axios.get('/album', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        console.log('获取专辑的详细信息')
        console.log(res.data)
        _this.collectCount = res.data.album.info.likedCount
        _this.commentCount = res.data.album.info.commentCount
        _this.shareCount = res.data.album.info.shareCount
        _this.name = res.data.album.name
        _this.coverImgUrl = res.data.album.picUrl
        _this.songList = res.data.songs
        _this.$store.commit('setSongsList', _this.songList)
        _this.nickname = res.data.album.artist.name
        let _date = new Date(res.data.album.publishTime)
        _this.date = _date.getFullYear() + _date.getMonth() + _date.getDay()
      })
    },
    // 后退
    goback() {
      this.$router.go(-1)
    },
    // 跳转到播放器
    toPlay(id, index) {
      console.log('跳转控制台')
      console.log(id)
      this.$store.commit('setListIndex', index)
      this.$store.commit('setId', id)
      this.$store.commit('setIsPlay', true)
      // this.$router.push({
      //   path: `/player/${id}`,
      //   query: {
      //     index
      //   }
      // })  不需要跳转，按照手机上的是下面的一个控制台在播放，点击控制台才跳转到播放页面
    }
  }
}
</script>

<style scoped>
.header{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.list-top{
  width: 100%;
  /* padding-top: 55px; */
  background: rgba(0,0,0,0.2)
}
.list-top-after{
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
  height: 265;
  background-position: center top;
  background-size: 100%;
  background-attachment: fixed;
  filter: blur(30px);
}
.title h1{
  color: black;
}
.msg-box{
  display: flex;
  height: 210px;
  justify-content: space-around;
  align-items: center;
}
.msg-img{
  display: flex;
  justify-content: center;
  width: 60%;
  height: 70%
}
.msg-img img{
  width: 80%;
}
.msg-txt{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h1{
  color: white;
}
.msg-txt img{
  border-radius: 50%;
  width: 24px;
}
.author-name{
  font-size: 16px;
}
.choose-box{
  display: flex;
  justify-content: space-around;
}
.choose-box span{
  font-size: 18px;
}
@keyframes loading-ani {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.loading{
  animation: loading-ani 1s linear infinite;
  color: red;
}
.list-title{
  border-top: 1px solid gray;
}
.list{
  height: 48px;
  line-height: 48px;
  display: flex;
}
.index-num{
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.song-title{
  border-bottom: 1px solid gray;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.song-mes{
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.song-mes h4{
  height: 50%;
  display: flex;
  align-items: center;
}
.song-name{
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  font-family: Arial, Helvetica, sans-serif;
}
.song-des{
  font-weight: normal;
  font-size: 10px;
}
.song-icon{
  padding-right: 10px;
}
</style>
