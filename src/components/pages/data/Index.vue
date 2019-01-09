<template>
  <div class="data">
    <side-bar/>
    <m-map />
  </div>
</template>

<script>
  import SideBar from './SideBar'
  import MMap from './Map'
  export default {
    components: {
      SideBar,
      MMap
    }
  }
</script>

<style scoped lang="stylus">
  .data
    display flex
    justify-content flex-start
    height calc(100vh - 60px)
    min-height 760px
</style>