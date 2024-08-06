<template>
  <div id="app">
    <PlayerSettings />
  </div>
</template>

<script>
import PlayerSettings from './components/PlayerSettings.vue'
export default {
  name: 'App',
  components: {
    PlayerSettings,
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
./components/PlayerSettings.vue
