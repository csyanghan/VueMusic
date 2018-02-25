<template>
  <div class="container">
    <Tabs value="单曲">
      <TabPane label="单曲" name="单曲">
        <div class="song-box" v-for="(item, index) in songs" :key="index" @click="toPlay(item.id, index)">
          <span class="song-name">{{item.name}}</span>
          <span class="song-des">{{item.artists[0].name+(item.artists[1]?'/'+item.artists[1].name:'')+(item.album?'-'+item.album.name:'')}}</span>
        </div>
      </TabPane>
      <TabPane label="歌手" name="歌手">
        <div class="artist-box" v-for="(item, index) in artists" :key="index" @click="toSingerDetail(item.id)">
          <img :src="item.img1v1Url" alt="picture">
          <span class="artist-name">{{item.name}}</span>
        </div>
      </TabPane>
      <TabPane label="专辑" name="专辑">
        <div class="two-box" v-for="(item, index) in albums" :key="index" @click="toSongList(item.id, item, 'zx', item.name, item.artist.picUrl)">
          <img :src="item.artist.picUrl" alt="picture">
          <div class="two-des">
            <span class="two-box-name">{{item.name}}</span>
            <span class="name-time">
            <span >{{item.artist.name}}</span>
            <span >{{stTime(item.publishTime)}}</span>
            </span>
          </div>
        </div>
      </TabPane>
      <TabPane label="歌单" name="歌单">
        <div class="two-box" v-for="(item, index) in playlists" :key="index" @click="toSongList(item.id, item, 'tj', item.name, item.coverImgUrl)">
          <img :src="item.coverImgUrl" alt="picture">
          <div class="two-des">
            <span class="two-box-name">{{item.name}}</span>
            <span class="name-time">
            <span >{{item.trackCount}}首 订阅{{item.bookCount}} 播放{{item.playCount}}次 </span>
            </span>
          </div>
        </div>
      </TabPane>
      <TabPane label="MV" name="MV">
        <div class="two-box" v-for="(item, index) in mvs" :key="index">
          <img :src="item.cover" alt="picture">
          <div class="two-des">
            <span class="two-box-name">{{item.briefDesc}}</span>
            <span class="name-time">
            <span >{{ChangeTime(item.duration)}} - {{item.artistName}}</span>
            </span>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'result',
  data() {
    return {
      playlists: [], // 歌单
      artists: [],   // 歌手
      albums: [],     // 专辑
      mvs: [],       // mv
      songs: []      // 歌曲
    }
  },
  mounted() {
    this.getResult()
  },
  methods: {
    getResult() {
      var _this = this
      axios.get('/search/suggest', {
        params: {
          keywords: this.$route.query.keywords
        }
      }).then(res => {
        console.log(res.data.result)
        _this.playlists = res.data.result.playlists
        _this.albums = res.data.result.albums
        _this.artists = res.data.result.artists
        _this.songs = res.data.result.songs
        _this.mvs = res.data.result.mvs
      })
    },
    toPlay(id, index) {
      console.log('跳转控制台')
      console.log(id)
      this.$store.commit('setListIndex', index)
      this.$store.commit('setId', id)
      this.$store.commit('setIsPlay', true)
      this.$store.commit('setSongsList', this.songs)
    },
    stTime(time) {
      var stTime = new Date(time)
      return stTime
    },
    ChangeTime(num) {
      let changeInt = parseInt(num / 1000)
      let fen = parseInt(changeInt / 60)
      let miao = changeInt % 60
      if (miao < 10) {
        miao = '0' + miao.toString()
      } else {
        miao.toString()
      }
      fen.toString()
      return fen + ':' + miao
    },
    toSingerDetail(id) {
      this.$router.push({
        path: '/singerDetail',
        query: {
          id: id
        }
      })
    },
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
.song-box{
    display: flex;
    flex-direction: column;
    height: 48px;
    border-top: 1px solid #e9eaec;
}
.song-name{
    height: 32px;
    font-size: 14px;
    padding: 8px 4px 4px;
}
.song-des{
    height: 16px;
    font-size: 12px;
    padding: 0 4px 4px;
}
.artist-box{
    display: flex;
    height: 48px;
    border-bottom: 1px solid #e9eaec;
}
.artist-box img{
    height: 100%;
}
.artist-name{
    padding-left: 8px;
    display: flex;
    align-items: center;
    font-size: 15px;
}
.two-box{
    height: 48px;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    flex-wrap: nowrap;
}
.two-box img{
    height: 100%;
}
.two-des{
    margin-left: 8px;
    display: flex;
    flex-direction: column;
}
.two-box-name{
    font-size: 14px;
    margin-top: 2px;
}
</style>
