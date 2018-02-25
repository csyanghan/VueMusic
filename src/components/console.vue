<template>
  <div class="container" v-show="cPlay" ref="console">
      <div class="console">
          <div class="mes" @click="toplayer">
              <div class="cover">
                  <img v-console="picUrl" alt="picCover">
              </div>
              <div class="nameMes">
                  <span class="title">{{title}}</span>
                  <span class="artist">{{artist}}</span>
              </div>
          </div>
          <div class="myaudio">
              <audio :src="songUrl" ref="myAudio" autoplay @play="onplay" @timeupdate="upDateTime" @ended="getEnd">没想到你的浏览器不支持audio标签</audio>
          </div>
          <div class="control">
              <div class="circle" @click="playOrPause">
                <i-circle :percent="curPercent()" stroke-color="red" :stroke-width="sWidth" :trail-color="tColor" :size="cSize">
                  <div v-if="!curPlay">
                    <Icon type="ios-play-outline" :size=25></Icon>
                  </div>
                  <div v-else>
                    <Icon type="ios-pause-outline" color="red" size=25></Icon>
                  </div>
                </i-circle>
              </div>
              <div class="list"><Icon type="android-menu" size=40></Icon></div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: 'console',
  data() {
    return {
      picUrl: null,
      title: '',
      artist: '',
      songUrl: null,
      tColor: 'gray',
      curTime: 0,
      duration: 0,
      sWidth: 3,
      cSize: 40,
      int: 0
    }
  },
  computed: mapGetters({
    curId: 'id',
    curPlay: 'isPlay',
    songslist: 'songsList',
    index: 'listIndex',
    curTimeChange: 'curTime',
    seekingTime: 'seekingTime',
    cPlay: 'cPlay'
  }),
  directives: {
    console: {
      inserted: function(el, binding) {
        if (binding.value === null) {
          el.src = 'http://img5.imgtn.bdimg.com/it/u=2713254137,1958499634&fm=27&gp=0.jpg'
        } else {
          el.src = binding.value
        }
      },
      update: function(el, binding) {
        if (binding.value === null) {
          el.src = 'http://img5.imgtn.bdimg.com/it/u=2713254137,1958499634&fm=27&gp=0.jpg'
        } else {
          el.src = binding.value
        }
      }
    }
  },
  watch: {
    curId: function() {
      var _this = this
      axios.get('/song/detail', {
        params: {
          ids: this.curId
        }
      }).then(res => {
        console.log('sucess')
        _this.$store.commit('setArtist', res.data.songs[0].ar[0].name)
        _this.$store.commit('setpicUrl', res.data.songs[0].al.picUrl)
        _this.$store.commit('setTitle', res.data.songs[0].name)
        _this.picUrl = res.data.songs[0].al.picUrl
        _this.title = res.data.songs[0].name
        _this.artist = res.data.songs[0].ar[0].name
      })
      axios.get('/music/url', {
        params: {
          id: this.curId
        }
      }).then(res => {
        console.log(res.data.data[0].url)
        _this.songUrl = res.data.data[0].url
        _this.$store.commit('setUrl', res.data.data[0].url)
      })
      axios.get('/lyric', {
        params: {
          id: this.curId
        }
      }).then(res => {
        var l = res.data
        if (l.hasOwnProperty('lrc')) {
          _this.$store.commit('setLyric', res.data.lrc.lyric)
        } else {
          console.log(res.data.lrc)
          _this.$store.commit('setLyric', '')
        }
        console.log('lyric000')
      })
    },
    index: function() {
      this.$store.commit('setId', this.songslist[this.index].id)
    },
    curPlay: function(newValue, oldValue) {
      if (newValue === true) {
        this.$refs.myAudio.play()
      } else {
        this.$refs.myAudio.pause()
      }
    }
  },
  methods: {
    // 开始播放
    onplay(res) {
      this.$store.commit('setIsPlay', true)
      var _this = this
      this.int = setInterval(function() {
        _this.$store.commit('setCurTime', _this.curTime)
        if (_this.seekingTime !== _this.curTime && _this.seekingTime !== 0) {
          _this.$refs.myAudio.currentTime = _this.seekingTime
          _this.$store.commit('setSeekingTime', 0)
        }
      }, 500)
    },
    // 按钮控制播放与暂停
    playOrPause() {
      if (this.curPlay) {
        this.$store.commit('setIsPlay', false)
        // this.$refs.myAudio.pause()
        clearInterval(this.int)
      } else {
        this.$store.commit('setIsPlay', true)
        this.$refs.myAudio.play()
        // clearInterval(this.int)
      }
    },
    // 进度条
    upDateTime(e) {
      this.curTime = e.target.currentTime
      this.duration = e.target.duration
      this.$store.commit('setDuration', this.duration)
    },
    curPercent() {
      return Math.floor((this.curTime / this.duration) * 100)
    },
    // 进度条归零
    getEnd() {
      this.curTime = 0
      this.$store.commit('setListIndex', this.index + 1)
    },
    // 跳到player页面
    toplayer(curId) {
      this.$store.commit('setCurTime', this.curTime)
      this.$router.push({
        path: '/player'
      })
      this.$store.commit('setcPlay', false)
      // this.$refs.console.style.display = 'none'
    },
    // 获取歌词
    getLyric() {
      var _this = this
      axios.get('/lyric', {
        params: {
          id: this.id
        }
      }).then(res => {
        _this.lyricRaw = res.lrc.lyric
        _this.$store.commit('setLrc', res.lrc.lyric)
        _this.lyricText = _this.parseLyric(_this.lyricRaw)
        console.log(_this.lyricText)
      })
    },
    // 歌词解析
    parseLyric(text) {
      var lyric = text.split('\r\n')
      var _len = lyric.length
      var lrc = []
      var i = 0
      for (i = 0; i < _len; i++) {
        var d = lyric[i].match(/\[\d{2}:\d{2}((\.|:)\d{2})\]/g)
        var t = lyric[i].split(d)
        if (d != null) {
          var _d = d.replace(/[^0-9]/g, ':')
          var dt = String(_d).split(':')
          var _t = parseInt(dt[1]) * 60 + parseInt(dt[3]) + parseInt(dt[5])
          lrc.push([_t, t[1]])
        }
      }
      return lrc
    }
  }
}
</script>

<style scoped>
.container{
    z-index: 100;
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
    background: white;
    border-top: 1px solid gray;
}
.console{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.mes{
    height: 100%;
    padding: 3px;
    width: 80%;
    display: flex;
}
.mes .cover img{
    height: 74px;
}
.nameMes{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
}
.nameMes .title{
    font-size: 1.25em;
}
.control{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.control .circle{
  margin-right: 20px;
  padding-top: 5px;
}
.control .list{
  padding-right: 5px;
}
</style>
