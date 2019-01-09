<template>
  <div class="config">
    <div class="area">
      <div class="title">地区选择</div>
      <div class="area-options">
        <select name="" id="">
          <option value="">浙江</option>
          <option value="">杭州</option>
        </select>
      </div>
    </div>
    <div class="time-options">
      <div class="time-top">
        <div class="fcst-date">
          <div class="title">预报日期</div>
          <div class="dates">
            <div class="date active">1日</div>
            <div class="date">2日</div>
            <div class="date">3日</div>
            <div class="date">4日</div>
          </div>
        </div>
        <div class="fcst-span">
          <div class="title">步长选择</div>
          <div class="spans">
            <div class="span active">逐3H</div>
            <div class="span">逐6H</div>
            <div class="span">逐12H</div>
            <div class="span">逐24H</div>
          </div>
        </div>
      </div>
      <div class="time-bottom">
        <div class="active">0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
        <div>0432</div>
      </div>
    </div>
    <div class="animations">
      <div class="animation">
        <img src="@/assets/img/data/prev.png" alt="向前">
      </div>
      <div class="animation">
        <img src="@/assets/img/data/play.png" alt="播放">
      </div>
      <div class="animation">
        <img src="@/assets/img/data/next.png" alt="向前">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="stylus">
  .config
    width 100%
    height 65px
    background-color rgba(0, 96, 157, 0.9)
    display flex
    justify-content flex-start
    align-items center
    .title
      display flex
      align-items center
      font-size 12px
      font-family "SimSun"
      color rgb(251, 187, 0)
    .area, .time-options
      display flex
      flex-direction column
      justify-content center
      padding-left 10px
    .area
      width 91px
      border-right 1px solid rgb(14, 82, 125)
      select
        border-radius 2px
        background-color rgb(90, 168, 218)
        width 70px
        height 20px
        border none
        outline none
        color #fff
        text-align center
        text-align-last center
        font-size 12px
        font-family "SimSun"
        margin-top 9px
        option
          color #fff
          text-align center
          font-family "SimSun"
    
    .time-top, .fcst-date, .fcst-span, .dates, .spans
      font-size 12px
      display flex
    .dates, .spans
      margin-left 10px
      margin-right 30px
    .date, .span
      color #ffffff
      font-family "SimSun"
      border-radius 2px
      width 40px
      height 20px
      text-align center
      line-height 20px
      &.active, &:hover
        cursor pointer
        background-image linear-gradient(to left, rgb(255,162,28), rgb(251,187,0))
    .span
      margin-right 10px

    .time-bottom
      margin-top 9px
      display flex
      div
        font-size 12px
        color #ffffff
        font-family "SimSun"
        margin-right 5px
        width 40px
        height 20px
        line-height 16px
        text-align center
        border 2px solid transparent
        background-color rgb(0, 96, 157)
        &:hover, &.active
          cursor pointer
          border 2px solid rgb(251, 187, 0)
    
    .animations
      display flex
      .animation
        height 50px 
        width 50px
        display flex
        justify-content center
        align-items center
        background-color rgb(10, 82, 130)
        cursor pointer
        &:nth-child(2)
          margin 0 1px
</style>