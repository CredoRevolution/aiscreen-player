<template>
  <div id="app">
    <MainView />
  </div>
</template>

<script>
import MainView from './components/main/MainView.vue'
export default {
  name: 'App',
  components: {
    MainView,
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Satoshi-variable, sans-serif;
}
#app {
  width: 100%;
  height: 100vh;
}
</style>
