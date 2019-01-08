<template>
  <div class="process">
    <m-title>
      <div class="title">
        <span class="text">城镇报生成流程</span>
      </div>
    </m-title>
    <div class="content">
      <div class="img">
        <img src="@/assets/img/county/process.png" alt="城镇报生成流程">
      </div>
      <div class="text">
        <p>* 城镇报从预报产品尺生成，是主观格点订正预报和客观格点预报融合的结果</p>
        <p>* 省气象台和市气象台主观格点订正预报提交后，城镇报会立即更新</p>
        <p>* OCFv3更新时，城镇报也会立即更新</p>
      </div>
    </div>
  </div>
</template>

<script>
  import MTitle from './Title'
  export default {
    components: {
      MTitle
    }
  }
</script>

<style scoped lang="stylus">
  .process
    margin-top 25px
    .content
      margin-top 5px
      border 1px solid rgb(229, 229, 229)
      background-color rgb(245, 245, 245)
      .img
        text-align center
        padding 17px 0
      .text
        padding-left 20px
        padding-bottom 10px
        p
          font-size 12px
          line-height 23px
</style>