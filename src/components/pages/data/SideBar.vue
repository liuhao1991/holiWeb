<template>
  <div class="side-bar">
    <div class="icon">
      <img src="@/assets/img/data/icon.png" alt="网格预报要素选择">
      <span>网格预报要素选择</span>
    </div>
    <div class="navs">
      <div class="nav active">
        3H降水
      </div>
      <div class="nav">
        6H降水
      </div>
      <div class="nav">
        12H降水
      </div>
      <div class="nav">
        24H降水
      </div>
      <div class="nav">
        日最高温度
      </div>
      <div class="nav">
        日最低温度
      </div>
      <div class="nav">
        正点温度
      </div>
      <div class="nav">
        10米极大风
      </div>
      <div class="nav">
        相对湿度
      </div>
      <div class="nav">
        总云量
      </div>
      <div class="nav">
        能见度
      </div>
      <div class="nav">
        12小时新增积雪深度
      </div>
      <div class="nav">
        12小时特殊天气
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="stylus">
  .side-bar
    width 190px
    height 100%
    background-color #2b333e
    .icon, .nav
      width 100%
      height 50px
      text-align center
      line-height 50px
      color #ffffff
      font-size 12px
      white-space nowrap
    .icon span 
      color #ffffff
      margin-left 10px
      font-size 14px
    .nav
      border-left 2px solid transparent
      &.active, &:hover
        cursor pointer
        border-left 2px solid rgb(0,134,255)
        background-color rgb(34, 41, 51)
</style>