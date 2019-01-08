<template>
  <div class="header-main">
    <div class="header-icon">
      <img src="@/assets/img/index/index-title.png" alt="">
    </div>
    <div class="header-navs">
      <router-link tag="div" class="header-nav" to="/" exact>概念</router-link>
      <router-link tag="div" class="header-nav" to="/county">城镇报</router-link>
      <router-link tag="div" class="header-nav" to="/q">到报</router-link>
      <router-link tag="div" class="header-nav" to="/q">数据</router-link>
      <router-link tag="div" class="header-nav" to="/q">平台</router-link>
      <router-link tag="div" class="header-nav" to="/q">政策</router-link>
      <router-link tag="div" class="header-nav" to="/q">技术</router-link>
      <router-link tag="div" class="header-nav" to="/q">运维</router-link>
      <router-link tag="div" class="header-nav" to="/q">OCF</router-link>
      <router-link tag="div" class="header-nav" to="/q">OHF</router-link>
      <router-link tag="div" class="header-nav" to="/q">时序图</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="stylus">
  .header-main
    background-color: rgb(49, 49, 49)
    height 60px
    line-height 60px
    width: 100%
    display flex
    justify-content space-between
    padding 0 40px
    .header-navs
      display flex
      justify-content space-around
      align-items center
      .header-nav
        height 25px
        line-height 25px
        margin 0 20px
        font-size 12px
        cursor pointer
        color white
        border-bottom 1px solid rgb(49, 49, 49)
        &.router-link-active 
          color #009e4f
          border-bottom 1px solid #009e4f
</style>