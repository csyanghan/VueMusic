<template>
  <div class="headNav">
    <router-link tag="div" class="tab-item" to="/recommend">
        <span class="nav-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
        <span class="nav-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
        <span class="nav-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
        <span class="nav-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default{
  name: 'headNav'
}
</script>

<style scoped>
.headNav{
    height: 60px;
    width: 100%;
    line-height: 60px;
    display: flex;
    justify-content: space-around;
}
.tab-item{
    font-size: 24px;
    cursor: pointer;
}
.router-link-active{
    color: red;
    border-bottom: 2px solid red;
}
</style>
