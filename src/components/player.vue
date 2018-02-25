<template>
  <div class="container">
    <div class="top">
      <div class="back" @click="goBack"><Icon type="ios-arrow-back" size=40></Icon></div>
      <div class="top-title">
      <span class="title">{{title}}</span>
      <span class="subTitle">{{artist}}</span>
      </div>
    </div>
    <div :style="{'background-image': 'url(' + this.picUrl + ')'}" class="backGround">
    </div>
    <div class="middle" v-show="!showLrc" @click="showLrc = true">
      <div style="position: relative;width:207px;height:209px;pading-left:20px;margin-top:80px;" class="ani">
        <div style="position: absolute;">
          <img src="./../assets/coverall.png" alt="pic">
        </div>
        <img :src="picUrl" alt="pic" style="width:70%;height:70%;border-radius:50%;margin-top:32px;margin-left:32px;">
      </div>
    </div>
    <div class="lyric" v-show="showLrc" @click="showLrc = false">
      <div class="con" :style="{top: (-(lrcIn) * 30 + 125) + 'px'}">
      <span class="lycbase" v-for="(item, index) in lrc" :key="index" v-if="item[1]" :class="[index === allIn ? isActive : '']">
        {{item[1]}}
      </span>
      </div>
    </div>
    <div class="fixToBottom">
    <div class="progress">
      <span class="timeNow">{{curTimeChange}}</span>
      <progress-bar :percent="percent" @percentChange="setProgress"></progress-bar>
      <span class="timeAll">{{durationChange}}</span>
    </div>
    <div class="control">
      <Icon type="ios-shuffle" size=40></Icon>
      <div class="containerBox">
      <span @click="preMusic">
      <Icon type="ios-skipbackward-outline" size=40></Icon>
      </span>
      <div @click="pauseOrPlay">
      <i-circle :size="60">
        <div v-if="isPlay">
          <Icon type="ios-pause-outline" size=40 ></Icon>
        </div>
        <div v-else>
          <Icon type="ios-play-outline" size=40 ></Icon>
        </div>
      </i-circle>
      </div>
      <span @click="nextMusic">
      <Icon type="ios-skipforward-outline" size=40></Icon>
      </span>
      </div>
      <span @click="toMenu">
      <Icon type="ios-settings" size=40></Icon>
      </span>
    </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import progressBar from './progresser'
export default{
  name: 'play',
  data() {
    return {
      showLrc: false,
      isActive: 'isActive',
      first: 0,
      backStyle: {
        background: 'url(' + this.picUrl + ')'
      }
    }
  },
  mounted() {
    console.log(this.duration)
    console.log(this.percent)
  },
  components: {
    progressBar
  },
  computed: {
    ...mapGetters([
      'id',
      'picUrl',
      'title',
      'artist',
      'lrc',
      'lrcIn',
      'allIn',
      'curTime',
      'duration',
      'isPlay',
      'listIndex',
      'songsList'
    ]),
    inter() {
      return this.lrc[this.index + 1][0] - this.lrc[this.index][0]
    },
    percent() {
      return Math.min(1, this.curTime / this.duration)
    },
    curTimeChange() {
      return this.ChangeTime(this.curTime)
    },
    durationChange() {
      return this.ChangeTime(this.duration)
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      this.$store.commit('setcPlay', true)
    },
    setProgress(percent) {
      this.$store.commit('setSeekingTime', this.duration * percent)
      // this.$refs.myAudio.currentTime = this.duration * percent
    },
    ChangeTime(num) {
      let changeInt = parseInt(num)
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
    pauseOrPlay() {
      this.$store.commit('setIsPlay', !this.isPlay)
    },
    preMusic() {
      console.log('pre')
      if (this.listIndex === 0) {
        alert('这是第一首歌')
      } else {
        this.$store.commit('setListIndex', this.listIndex - 1)
      }
    },
    nextMusic() {
      console.log('next')
      if (this.listIndex === this.songsList.length - 1) {
        alert('这是最后一首歌')
      } else {
        this.$store.commit('setListIndex', this.listIndex + 1)
      }
    },
    toMenu() {
      this.$router.go(-1)
      this.$store.commit('setcPlay', true)
    }
  }
}
</script>

<style scoped>
.top{
    height: 50px;
    display: flex;
    align-items: center;
}
.top-title{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.title{
    font-size: 18px;
}
.subtitle{
    font-size: 8px;
}
.middle{
    display: flex;
    justify-content: center;
}
@keyframes loading-ani {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.ani{
  animation: loading-ani 15s linear infinite;
}
.lycbase{
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: white;
  display: block;
  overflow: hidden;
}
.noItem{
  display: none;
}
.lyric{
  height: 360px;
  overflow: hidden;
  position: relative;
}
.lyric .con{
  position: absolute;
  top: 125px;
  width: 80%;
  margin-left: 10%;
  transition: top inter + 's';
}
.isActive{
  color: rgb(238, 181, 181);
  font-size: 20px;
  overflow: hidden;
}
.progress{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.containerBox{
  display: flex;
  width: 50%;
  justify-content: space-around;
  align-items: center;
}
.control{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.fixToBottom{
  position: fixed;
  bottom: 0;
  width: 100%;
}
.backGround{
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* filter: blur(50px); */
  position: fixed;
  /* top: 100px; */
  z-index: -1;
  filter: blur(100px)
}
</style>
