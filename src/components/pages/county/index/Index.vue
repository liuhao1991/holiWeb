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
    width 1400px
    margin 20px auto 0 auto
    display flex
    justify-content space-between

</style>