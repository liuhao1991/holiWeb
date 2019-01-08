<template>
  <div class="conception">
    <div class="ruler">
      <div class="img">
        <img src="@/assets/img/concept/ruler.png">
      </div>
      <div class="text">
        <div class="title">
          全省共织一张网，共建一把尺
        </div>
        <div class="content">
          <p>
            滚动更新预报产品尺
          </p>
          <p>
            建立全省统一的从实况监测到未来30天预报的精细化网格化产品尺，并保持高频快速滚动更新。
          </p>
          <p>
            从任意一个时刻点，向过去看是逐10钟间隔的监测实况网格，向未来看近处是逐10分钟滚动更新的逐10分钟间隔的1公里网格预报、稍远点是逐小时滚动更新的1小时间隔的多要素预报，再远点是逐3小时/逐6小时/逐12小时/逐24小时间隔的网格预报一直延伸到未来30天。
          </p>
          <p>
            从任意一个时间刻度看，是由多种气象要素的预报网格。
          </p>
          <p>
            预报产品尺中涵盖了主客观融合预报，为后续各类衍生的预报服务产品提供最基础原料。
          </p>
        </div>
      </div>
    </div>
    <div class="flow">
      <img src="@/assets/img/concept/flow.png">
    </div>
    <div class="couple">
      <div class="couple-left">
        <div class="text">
          <div class="title">
            订正VS客观：1-24h融合预报序列
          </div>
          <div class="content">
            <p>
              主客观融合，同时发挥人的综合作用和机器的快速更新作用
            </p>
            <p>
              常规主观网格订正预报每天固定两次更新，客观预报每小时更新
            </p>
            <p>
              主客观融合由变动的系数加权平均生成，主观订正之后附近时次，主观预报融合系数大，之后逐渐减小，客观预报融合系数逐渐上升
            </p>
            <p>
              常规订正时次之外，任一级气象台站可以按需滚动订正自己行政区域范围内网格或站点预报，并通知省级数据处理中心进行实时融合
            </p>
          </div>
        </div>
        <div class="img">
          <img src="@/assets/img/concept/chart.png">
        </div>
      </div>
      <div class="couple-right">
        <img src="@/assets/img/concept/couple.png">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '概念'
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/css/variables'
  .conception
    width 100%
    .ruler, .couple
      width 1320px
      margin 0 auto
      display flex
      justify-content space-between
      .text
        flex 1
        padding-left 60px
        padding-top 40px

    .ruler
      padding-top 146px
      padding-bottom 151px 

    .title
      font-size 29px
    .content
      margin-top 40px
      p
        line-height 20px
        margin-top 15px
        font-size $font-size

    .flow
      background-color #e9f7ef
      display flex
      justify-content center
      padding 105px 0 112px 0
    
    .couple
      padding-top 100px
      padding-bottom 60px
      .couple-left
        display flex
        flex-direction column
        width 470px
        .text
          padding-left 0px
          padding-top 0px
          padding-bottom 20px
</style>
