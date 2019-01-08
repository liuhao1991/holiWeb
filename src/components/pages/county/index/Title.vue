<template>
  <div class="m-title">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="stylus">
  .m-title
    display flex
    justify-content space-between
    height 32px
    align-items top
    .title
      padding-left 10px
      height 20px
      line-height 20px
      background-image url(/img/county/focus.png)
      background-repeat no-repeat
      font-weight bold
      .text
        font-size 16px
      .datetime
        font-size 12px
        color #999
        margin-left 10px
      
    .title-btns
      display flex
      justify-content space-between
      font-size 12px
      .file-btn, .title-btn
        display flex
        align-items center
      .title-btn
        padding 0px 10px
        height 20px
        background-image -webkit-linear-gradient(180deg, rgb(0,134,255) 0%, rgb(0,169,255) 100%)
        &:nth-child(1)
          margin-right 10px
        span
          color #fff
          font-family 'SimSun'
          margin-left 5px
      .file-btn
        height 30px
        img
          position relative
          top 1px
        span
          color rgb(102, 102, 102)
          margin-left 5px
</style>