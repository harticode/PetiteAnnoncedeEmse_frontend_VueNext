<template>
  <AtomSpinner
    :animation-duration="1000"
    :size="20"
    :color="'rgb(59 130 246)'"
  />
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
export default {
  name: "Loading",
  components: {
    AtomSpinner,
  },
};
</script>

<style>
</style>