<template>
  <div class="container">
    <div class="searchBar">
      <Icon type="ios-arrow-left" size=32 class="rightM" @click="goBack"></Icon>
      <Input v-model="searchText" placeholder="请输入" clearable autocomplete="on" @on-blur="toSearch" @on-enter="toSearch"></Input>
      <Button type="ghost" shape="circle" icon="ios-search" size="small" @click="toSearch">Search</Button>
    </div>
    <div class="suggest">
      <span class="hotSearch">热门搜索</span>
      <div class="boxDef">
      <span v-for="(item, index) in suggestText" :key="index" @click="sugText" class="suggestText">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'search',
  data() {
    return {
      searchText: '',
      suggestText: [
        '林俊杰',
        '恋爱先生',
        '周俊杰',
        '爱乐之城',
        'BIGBANG',
        '空空如也',
        '薛之谦',
        '123我爱你',
        '青媚狐',
        '张韶涵'
      ]
    }
  },
  methods: {
    sugText(event) {
      this.searchText = event.target.innerHTML
      setTimeout(this.toSearch, 300)
    },
    toSearch() {
      var words = this.searchText
      this.$router.push({
        path: '/search/result',
        query: {
          keywords: words
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.searchBar{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.rightM{
  margin-left: 5px;
  margin-right: 10px;
}
.suggestText{
  border: 1px solid rgb(238, 231, 231);
  border-radius: 35%;
  margin: 5px;
  font-size: 16px;
  padding: 4px;
}
.hotSearch{
  display: block;
  margin-top: 5px;
  margin-left: 5px;
  margin: 5px;
}
.boxDef{
  display: flex;
  flex-wrap: wrap;
}
</style>
