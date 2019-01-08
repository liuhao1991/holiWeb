<template>
  <div id="app">
    <v-header />
    <div class="base-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <v-footer />
  </div>
</template>

<script>
  import vHeader from '@/components/common/Header'
  import vFooter from '@/components/common/Footer'
  export default {
    name: 'app',
    components: {
      vHeader,
      vFooter
    }
  }
</script>

<style lang="stylus">
  @import './assets/css/base'
</style>
<style scoped lang="stylus">
  #app
    height 100%
    width 100%
</style>
