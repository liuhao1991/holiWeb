<template>
  <div class="base-main">
    <div class="header">
      <v-head></v-head>
    </div>
    <div class="base-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="base-footer">
      <v-foot></v-foot>
    </div>
  </div>
</template>

<script>
  import vHead from './Header.vue'
  import vFoot from './Footer.vue'
  export default {
    components:{
      vHead,
      vFoot,
    }
  }
</script>

<style lang="stylus" scoped>
  .base-main
    width 100%
    height 100%
    position relative
</style>