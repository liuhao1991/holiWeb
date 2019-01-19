<template>
  <div class="header-main">
    <div class="header-icon">
      <img src="@/assets/img/index/index-title.png" alt="">
    </div>
    <div class="header-navs">
      <router-link tag="div" class="header-nav" to="/" exact>概念</router-link>
      <router-link tag="div" class="header-nav" to="/county">城镇报</router-link>
      <router-link tag="div" class="header-nav" to="/q">到报</router-link>
      <router-link tag="div" class="header-nav" to="/ruler">Ruler</router-link>
      <router-link tag="div" class="header-nav" to="/data">数据</router-link>
      <router-link tag="div" class="header-nav" to="/q">平台</router-link>
      <router-link tag="div" class="header-nav" to="/policy">政策</router-link>
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
    background-color: #1b1b1b
    height 60px
    line-height 60px
    width: 100%
    display flex
    justify-content space-between
    padding 0 20px
    .header-navs
      display flex
      justify-content space-around
      align-items center
      .header-nav
        height 28px
        line-height 28px
        margin 0 10px 0 30px
        font-size 14px
        cursor pointer
        color white
        border-bottom 2px solid #1b1b1b
        &.router-link-active 
          color #009e4f
          border-bottom 2px solid #009e4f
</style>