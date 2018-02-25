<template>
  <div class="container">
    <div class="bigBox">
      <img v-lazyload="biaoshen.coverImgUrl" alt="pic">
      <span class="flash">每天更新</span>
      <div class="list">
        <span v-for="(list, index) in biaoshen.tracks" :key="index" v-if="index < 3" class="musicList">
          {{index + 1}}.   {{list.name}}    -{{list.ar[0].name}}
        </span>
      </div>
    </div>
    <div class="bigBox">
      <img v-lazyload="xinge.coverImgUrl" alt="pic">
      <span class="flash">，每天更新</span>
      <div class="list">
        <span v-for="(list, index) in xinge.tracks" :key="index" v-if="index < 3" class="musicList">
          {{index + 1}}.   {{list.name}}    -{{list.ar[0].name}}
        </span>
      </div>
    </div>
    <div class="bigBox">
      <img v-lazyload="yuanchuang.coverImgUrl" alt="pic">
      <span class="flash">每天更新</span>
      <div class="list">
        <span v-for="(list, index) in yuanchuang.tracks" :key="index" v-if="index < 3" class="musicList">
          {{index + 1}}.   {{list.name}}    -{{list.ar[0].name}}
        </span>
      </div>
    </div>
    <div class="bigBox">
      <img v-lazyload="zanshang.coverImgUrl" alt="pic">
      <span class="flash">每天更新</span>
      <div class="list">
        <span v-for="(list, index) in zanshang.tracks" :key="index" v-if="index < 3" class="musicList">
          {{index + 1}}.   {{list.name}}    -{{list.ar[0].name}}
        </span>
      </div>
    </div>
    <div class="bigBox">
      <img v-lazyload="rege.coverImgUrl" alt="pic">
      <span class="flash">每天更新</span>
      <div class="list">
        <span v-for="(list, index) in rege.tracks" :key="index" v-if="index < 3" class="musicList">
          {{index + 1}}.   {{list.name}}    -{{list.ar[0].name}}
        </span>
      </div>
    </div>
    <div class="bigBox">
      <img v-lazyload="geshou.coverImgUrl" alt="pic">
      <span class="flash">每天更新</span>
      <div class="list">
        <span v-for="(list, index) in geshou.tracks" :key="index" v-if="index < 3" class="musicList">
          {{index + 1}}.   {{list.name}}    -{{list.ar[0].name}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default{
  name: 'rank',
  mounted() {
    this.getAllContents()
  },
  computed: {
    ...mapGetters([
      'biaoshen',
      'xinge',
      'yuanchuang',
      'zanshang',
      'rege',
      'geshou'
    ])
  },
  methods: {
    getAllContents() {
      var _this = this
      axios.get('/top/list', {
        params: {
          idx: 3
        }
      }).then(res => {
        console.log('飙升榜')
        console.log(res.data)
        _this.$store.commit('setbiaoshen', res.data.playlist)
      })
      axios.get('/top/list', {
        params: {
          idx: 0
        }
      }).then(res => {
        console.log('新歌榜')
        _this.$store.commit('setxinge', res.data.playlist)
      })
      axios.get('/top/list', {
        params: {
          idx: 2
        }
      }).then(res => {
        console.log('网易原创榜')
        _this.$store.commit('setyuanchuang', res.data.playlist)
      })
      axios.get('/top/list', {
        params: {
          idx: 4
        }
      }).then(res => {
        console.log('歌手榜')
        _this.$store.commit('setgeshou', res.data.playlist)
      })
      axios.get('/top/list', {
        params: {
          idx: 17
        }
      }).then(res => {
        console.log('赞赏榜')
        _this.$store.commit('setzanshang', res.data.playlist)
      })
      axios.get('/top/list', {
        params: {
          idx: 1
        }
      }).then(res => {
        console.log('热歌榜')
        _this.$store.commit('setrege', res.data.playlist)
      })
    }
  }
}
</script>

<style scoped>
img{
  height: 130px;
}
.bigBox{
  display: flex;
  position: relative;
  border-top: 0.5px solid #ece6e6;
  border-bottom: 0.5px solid #ece6e6;
}
.flash{
  position: absolute;
  bottom: 8px;
  left: 6px;
  font-size: 120%;
  color: white;
}
.musicList{
  font-size: 14px;
}
.list{
  align-self: center;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
