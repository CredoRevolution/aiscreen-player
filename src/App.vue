<template>
  <div id="app">
    <ScreenSettings />
  </div>
</template>

<script>
import ScreenSettings from './components/ScreenSettings.vue'
export default {
  name: 'App',
  components: {
    ScreenSettings,
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
