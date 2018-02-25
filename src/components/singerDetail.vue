<template>
  <div>
    <Tabs value="单曲">
      <TabPane label="单曲" name="单曲">
        <div class="song-box" v-for="(item, index) in songs" :key="index" @click="toPlay(item.id, index)">
          <span class="song-name">{{index+1}} &nbsp;&nbsp; {{item.name}}</span>
        </div>
      </TabPane>
      <TabPane label="专辑" name="专辑">
        <div class="two-box" v-for="(item, index) in albums" :key="index" @click="toSongList(item.id, item, 'zx', item.name, item.picUrl)">
          <img :src="item.picUrl" alt="picture">
          <div class="two-des">
            <span class="two-box-name">{{item.name}}</span>
          </div>
        </div>
      </TabPane>
      <TabPane label="MV" name="MV">
        <div class="two-box" v-for="(item, index) in mvs" :key="index">
          <img :src="item.imgurl" alt="picture">
          <div class="two-des">
            <span class="two-box-name">{{item.name}}</span>
            <span>发布于：{{item.publishTime}}</span>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'singerDetail',
  data() {
    return {
      songs: [],
      albums: [],
      mvs: []
    }
  },
  mounted() {
    var _this = this
    axios.get('/artists', {
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      console.log('单曲')
      console.log(res.data)
      _this.songs = res.data.hotSongs
    })
    axios.get('/artist/mv', {
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      console.log('mv')
      console.log(res.data)
      _this.mvs = res.data.mvs
    })
    axios.get('/artist/album', {
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      console.log('专辑')
      console.log(res.data)
      _this.albums = res.data.hotAlbums
    })
  },
  methods: {
    toPlay(id, index) {
      console.log('跳转控制台')
      console.log(id)
      this.$store.commit('setListIndex', index)
      this.$store.commit('setId', id)
      this.$store.commit('setIsPlay', true)
      this.$store.commit('setSongsList', this.songs)
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
.two-box img{
    height: 60px;
}
.song-box{
    height: 40px;
    border-bottom: 1px solid #e8eaec;
    border-top: 1px solid #e8eaec;
    display: flex;
    align-items: center;
    font-size: 16px;
}
.two-box{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e8eaec;
    border-top: 1px solid #e8eaec;
}
.two-des{
    margin-left: 30px;
}
</style>
