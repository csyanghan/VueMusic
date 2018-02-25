<template>
  <div id="app">
    <head-bar></head-bar>
    <head-nav></head-nav>
    <router-view/>
    <console></console>
  </div>
</template>

<script>
import headBar from './components/headbar'
import headNav from './components/headNav'
import console from './components/console'
export default {
  name: 'app',
  components: {
    headBar,
    headNav,
    console
  }
}
</script>
