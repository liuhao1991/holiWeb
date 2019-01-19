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
    align-items center
    .title
      height 20px
      line-height 20px
      .text
        font-size: 14px;
        font-weight bold
        margin-left 5px
      .datetime
        font-size 12px
        color #999
        margin-left 10px
        font-family "SimSun"
      
    .title-btns
      display flex
      justify-content space-between
      font-size 12px
      .file-btn, .title-btn
        display flex
        align-items center
      .title-btn
        margin-right 10px
        height 30px
        width 128px
        justify-content space-between
        background-color #f5f5f5
        border-radius 15px
        border 1px solid #eeeeee
        padding 0 12px
        &.weight-btn
          width 140px
          padding 0 10px
        img 
          margin-right 0px
        span
          margin-left 0px
          font-family "SimSun"
        &:last-child
          margin-right 0px

      .file-btn
        height 30px
        .notice
          color rgb(240, 44, 44)
          font-family "SimSun"
          margin-right 20px
        img
          position relative
          top -1px
          &.observer
            top -7px
        span
          color rgb(102, 102, 102)
          margin-left 5px
          font-family "SimSun"
</style>
