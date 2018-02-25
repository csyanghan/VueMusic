import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    HOST: 'http://localhost:3000',
    playing: {
      id: null,          // 当前播放音乐id
      isPlay: true,     // 当前是否播放
      title: '',         // 歌曲名
      artist: '',        // 歌手
      url: '',           // 当前歌曲URL
      lyric: '',         // 歌词
      songsList: [],      // 播放列表
      picUrl: null,      // 图片url
      lrc: [],           // 处理的歌词数据
      curTime: 0,        // 当前播放时间
      seekingTime: 0,
      duration: 0,       // 歌曲总时间
      changeTime: 0,     // 指定播放时间
      listIndex: -1,     // 歌曲index
      autoNext: false,   // 是否自动播放下一首歌
      lrcIndex: 0,        // 判断歌词
      biaoshen: {},       // 飙升榜
      xinge: {},          // 新歌榜
      yuanchuang: {},     // 原创榜
      zanshang: {},      // 赞赏榜
      rege: {},             // 热歌榜
      geshou: {},        // 歌手榜
      cPlay: true
    }
  },
  getters: {
    biaoshen: state => state.playing.biaoshen,
    xinge: state => state.playing.xinge,
    yuanchuang: state => state.playing.yuanchuang,
    zanshang: state => state.playing.zanshang,
    rege: state => state.playing.rege,
    geshou: state => state.playing.geshou,
    id: state => state.playing.id,
    artist: state => state.playing.artist,
    isPlay: state => state.playing.isPlay,
    title: state => state.playing.title,
    url: state => state.playing.url,
    lyric: state => state.playing.lyric,
    lrc: state => {
      var lyric = state.playing.lyric.split(/\n/)
      var _len = lyric.length
      var lrc = []
      var i = 0
      for (i = 0; i < _len; i++) {
        var d = lyric[i].match(/\[\d{2}:\d{2}\.\d*\]/g)
        var t = lyric[i].split(d)
        if (d != null) {
          var dt = String(d).split(':')
          var _t = parseInt((dt[0]).split('[')[1]) * 60 + parseFloat(dt[1].split(']')[0])
          lrc.push([_t, t[1]])
        }
      }
      return lrc
    },
    songsList: state => state.playing.songsList,
    playButtonUrl: state => state.playing.playButtonUrl,
    picUrl: state => state.playing.picUrl,
    curTime: state => state.playing.curTime,
    seekingTime: state => state.playing.seekingTime,
    duration: state => state.playing.duration,
    changeTime: state => state.playing.changeTime,
    listIndex: state => state.playing.listIndex,
    autoNext: state => state.playing.autoNext,
    cPlay: state => state.playing.cPlay,
    lrcIn: (state, getters) => {
      let i
      function testnull(value) {
        if (value[1].length !== 0) {
          return true
        }
      }
      let myLyric = getters.lrc.filter(testnull)
      for (i = 0; i < myLyric.length; i++) {
        if (state.playing.curTime > myLyric[i][0] && state.playing.curTime < myLyric[i + 1][0]) {
          return i
        }
      }
    },
    allIn: (state, getters) => {
      let i
      for (i = 0; i < getters.lrc.length; i++) {
        if (state.playing.curTime > getters.lrc[i][0] && state.playing.curTime < getters.lrc[i + 1][0]) {
          return i
        }
      }
    }
  },
  mutations: {
    setId: (state, id) => { state.playing.id = id },
    setUrl: (state, url) => { state.playing.url = url },
    setTitle: (state, title) => { state.playing.title = title },
    setArtist: (state, artist) => { state.playing.artist = artist },
    setIsPlay: (state, isPlay) => { state.playing.isPlay = isPlay },
    setPlayButtonUrl: (state, playButtonUrl) => { state.playing.playButtonUrl = playButtonUrl },
    setLyric: (state, lyric) => { state.playing.lyric = lyric },
    setpicUrl: (state, picUrl) => { state.playing.picUrl = picUrl },
    setCurTime: (state, curTime) => { state.playing.curTime = curTime },
    setSeekingTime: (state, seekingTime) => { state.playing.seekingTime = seekingTime },
    setDuration: (state, duration) => { state.playing.duration = duration },
    setChangeTime: (state, changeTime) => { state.playing.changeTime = changeTime },
    setLrc: (state, lrc) => { state.playing.lrc = lrc },
    setSongsList: (state, songsList) => { state.playing.songsList = songsList },
    pushSongsList: (state, song) => { state.playing.songsList.unshift(song) },
    setListIndex: (state, listIndex) => { state.playing.listIndex = listIndex },
    setAutoNext: (state, autoNext) => { state.playing.autoNext = autoNext },
    setbiaoshen: (state, biaoshen) => { state.playing.biaoshen = biaoshen },
    setxinge: (state, xinge) => { state.playing.xinge = xinge },
    setyuanchuang: (state, yuanchuang) => { state.playing.yuanchuang = yuanchuang },
    setzanshang: (state, zanshang) => { state.playing.zanshang = zanshang },
    setrege: (state, rege) => { state.playing.rege = rege },
    setgeshou: (state, geshou) => { state.playing.geshou = geshou },
    setcPlay: (state, cPlay) => { state.playing.cPlay = cPlay }
  }
})