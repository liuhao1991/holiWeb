<template>
  <div class="countyfcst">
    <m-map/>
    <m-data/>
  </div>
</template>

<script>
  import MMap from './Map'
  import MData from './Data'
  export default {
    data () {
      return {}
    },
    components: {
      MMap,
      MData
    }
  }
</script>

<style scoped lang="stylus">
  .countyfcst
    min-height 900px
    height calc(100vh - 60px)
    display flex
    justify-content space-between

</style>