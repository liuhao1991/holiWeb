<template>
  <div class="layout">
    <div class="category">
      <div class="center">
        <router-link to="/policy" tag="div" class="nav">
          <div class="img">
            <img src="@/assets/img/policy/article.png">
          </div>
          <div class="text">文档预览</div>
        </router-link>
        <router-link to="/policy/file" tag="div" class="nav">
          <div class="img">
            <img src="@/assets/img/policy/file.png">
          </div>
          <div class="text">文档下载</div>
        </router-link>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="stylus">
  .category
    height 80px
    display flex
    justify-content center
    background-color #eeeeee
    .center
      margin 0 auto
      display flex
      .nav
        text-align center
        width 80px
        padding-top 10px
        margin 0 12.5px
        border-bottom 2px solid #eeeeee
        cursor pointer
        .text
          font-size 14px
        &.router-link-exact-active
          border-bottom 2px solid #0066cc
          .text
            color #0066cc
   
</style>