<template>
  <div id="app">
    <v-header />
    <div class="base-content">
      <router-view></router-view>
    </div>
    <v-footer v-show="!hide === true"/>
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
    },
    computed: {
      hide () {
        return this.$route.meta.hide
      }
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
