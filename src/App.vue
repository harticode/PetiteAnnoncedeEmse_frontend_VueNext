<template>
  <Navtabs></Navtabs>
  <router-view />
</template>

<script>
import Navtabs from './components/Navtabs.vue'

export default {
  name: 'App',
  components: {
    Navtabs
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
