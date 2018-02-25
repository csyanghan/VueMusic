<template>
  <div class="container">
    <div v-for="(singer, index) in singerList" :key="index" v-if="index < 30" class="box" @click="toSingerDetail(singer.id)">
      <img v-lazyload="singer.picUrl">
      <span>{{singer.name}}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  name: 'singer',
  data() {
    return {
      singerList: []
    }
  },
  mounted() {
    var _this = this
    axios.get('/toplist/artist').then(res => {
      console.log('huoqu')
      console.log(res.data)
      _this.singerList = res.data.list.artists
    })
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push({
        path: '/singerDetail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped>
.box{
  display: flex;
  border-top: 0.5px solid #ece6e6;
  border-bottom: 0.5px solid #ece6e6;
}
img{
  height: 80px;
}
.box span{
  font-size: 18px;
  align-self: center;
  padding-left: 20%;
}
</style>
