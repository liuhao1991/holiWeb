<template>
  <div class="tips">
    <div class="taps">
      <div class="inner-taps">
        <div class="tap" :class="showIndex === 0 ? 'active' : ''" @click="showIndex = 0">
          综合数据日志
        </div>
        <div class="tap" :class="showIndex === 1 ? 'active' : ''" @click="showIndex = 1">
          24H降水数据日志
        </div>
      </div>
    </div>
    <div class="scroller">
      <el-scrollbar style="position: absolute; top: 0; left: 0; right: 0; bottom: -17px;">
        <div class="global" v-if="Object.keys(globalInfo).length" v-show="showIndex === 0">
          <div class="info" v-for="(item, i) in globalInfo" :key="i">
            <div class="date">
              {{ i }}
            </div>
            <div v-for="(inner, j) in item" :key="j">
              <div class="step" v-if="j === Object.keys(item)[0]">
                <div class="new">最新</div>
                <div>{{ j }}</div>
              </div>
              <div  class="step" v-else>
                <div>
                  <img src="@/assets/img/ruler/clock.png" alt="时间" />
                  {{ j }}
                </div>
              </div>
              
              <div class="item" v-for="(text, k) in inner" :key="k">
                <div class="text">
                  {{ text.Msg }}
                </div>
                <div class="status"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="global" v-if="Object.keys(targetInfo).length" v-show="showIndex === 1">
          <div class="info" v-for="(item, i) in targetInfo" :key="i">
            <div class="date">
              {{ i }}
            </div>
            <div v-for="(inner, j) in item" :key="j">
              <div class="step" v-if="j === Object.keys(item)[0]">
                <div class="new">最新</div>
                <div>{{ j }}</div>
              </div>
              <div  class="step" v-else>
                <div>
                  <img src="@/assets/img/ruler/clock.png" alt="时间" />
                  {{ j }}
                </div>
              </div>
              
              <div class="item" v-for="(text, k) in inner" :key="k">
                <div class="text">
                  {{ text.Msg }}
                </div>
                <div class="status"></div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import { format, dateFromString, addHour } from '@/assets/js/dateFmt'
  export default {
    data () {
      return {
        timer: null,
        globalInfo: {},
        targetInfo: {},
        showIndex: 0
      }
    },
    mounted () {
      this.fetchData()
      this.timer = setInterval(this.fetchData, 1000 * 20)
    },
    methods: {
      fetchData () {
        this.$axios.post('ruler/postLogInfo')
          .then(res => {
            const { globalInfo, targetInfo } = res.data
            this.globalInfo = this.fmtData(globalInfo)
            this.targetInfo = this.fmtData(targetInfo)
          })
      },
      fmtData (data) {
        const fmtData = {}
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          const { ReceiveDt } = item
          const date = format(dateFromString(ReceiveDt, 'yyyy-mm-dd HH:MM:SS'), 'mm-dd')
          const time = format(dateFromString(ReceiveDt, 'yyyy-mm-dd HH:MM:SS'), 'HH:MM')
          if (!fmtData[date]) fmtData[date] = {}
          if (!fmtData[date][time]) fmtData[date][time] = []
          fmtData[date][time].push(item)
        }
        return fmtData
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="stylus">
  .tips
    width 300px
    border-left 1px solid #2b333e
    .taps
      border-radius 2px
      background-color #00a9ff
      background-image linear-gradient(to right, #00a9ff, #0086ff)
      width 278px
      height 28px
      margin 10px auto 0 auto
      border 1px solid transparent
      .inner-taps
        height 100%
        width 100%
        background-color #ffffff
        display flex
        justify-content flex-start
        .tap
          display flex
          align-items center
          justify-content center
          flex 1
          font-size 12px
          cursor pointer
          &:nth-child(1).active, &:nth-child(1):hover
            color #ffffff
            background-color rgb(0,169,255)
            background-image linear-gradient(to right, rgb(0,169,255), rgb(0,134,255))
          &:nth-child(2).active, &:nth-child(2):hover
            color #ffffff
            background-color rgb(0,134,255)
            background-image linear-gradient(to right, rgb(0,134,255), #0086ff)
  .scroller
    position relative
    height calc(100% - 48px)
    width 278px
    margin 10px auto 0 auto
    overflow hidden
    .info
      padding-bottom 10px
      .date
        font-size 16px
        margin-bottom 10px
      .step
        height 20px
        width 75px
        line-height 18px
        border-radius 2px
        background-color #56c090
        border 1px solid #47ad7d
        font-size 12px
        margin-top 10px
        display flex
        div 
          color #ffffff
          text-align center
          img 
            position relative
            top -2px
            margin-right 3px
          &:last-child
            flex 1
            border-right 0px solid #47ad7d
        .new
          border-right 1px solid #47ad7d
          width 33px
        &.error
          background-color #ff6565
          border 1px solid #f05253
          .new
            border-right 1px solid #f05253
      
      .item
        display flex
        justify-content space-between
        align-items center
        height 40px
        border-bottom 1px dashed #e6e6e6
        .text
          flex 1
          font-size 12px
        .status
          height 14px
          width 14px
          background-image url(../../../assets/img/ruler/right.png)
        &.error
          .text
            color #fa6060
          .status 
            background-image url(../../../assets/img/ruler/right.png)

</style>