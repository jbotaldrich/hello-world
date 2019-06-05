<template>
  <div id="app">
    <DetailsIds></DetailsIds>
  </div>
</template>

<script>
import DetailsIds from './components/DetailsIds.vue'

export default {
  name: 'app',
  components: {
    DetailsIds
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
