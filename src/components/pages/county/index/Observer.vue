<template>
  <div class="observer">
    <m-title>
      <div class="title">
        <img src="@/assets/img/county/monitor.png">
        <span class="text">城镇报上传国家局监控</span>
      </div>
      <div class="title-btns">
        <router-link class="file-btn" to="">
          <img src="@/assets/img/county/explain.png" class="observer">
          <span>操作说明</span>
        </router-link>
      </div>
    </m-title>
    <div class="content">
      <div class="date-btns">
        <div class="date-btn" @click="changeDate(-1)">
          <img src="@/assets/img/county/left.png" alt="前一天">
        </div>
        <div class="date-value">
          {{ date }}
        </div>
        <div class="date-btn" :class="[notAllowed ? 'not-allowed' : '']" @click="changeDate(1)">
          <img src="@/assets/img/county/right.png" alt="后一天">
        </div>
      </div>
      <div class="time-actions">
        <div class="time-items">
          <div class="time-item" v-for="(t, i) in times" :key="i" :class="fileStatus(t)" @mouseover="showInfo(i, t)" @mouseout="flag = false">
            {{ t }}
          </div>
          <div class="message" v-if="list.length" v-show="flag" :style="offsetX()">
            <div>
              上传时间
            </div>
            <div>
              {{ list[valueIndex].ctime }}
            </div>
          </div>
        </div>
        <div class="operate-handle" @click="handleOperate">
          <span>人工操作</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MTitle from './Title'
  import { format, dateFromString, addHour } from '@/assets/js/dateFmt'
  export default {
    data () {
      return {
        date: format(new Date(), 'yyyy-mm-dd'),
        times: ['04:40', '06:25', '10:10', '15:10', '16:10'],
        list: [],
        index: 0,
        valueIndex: 0,
        flag: false,
        fetching: true
      }
    },
    components: {
      MTitle
    },
    computed: {
      notAllowed () {
        return this.date === format(new Date(), 'yyyy-mm-dd')
      }
    },
    mounted () {
      this.fileObserver()
    },
    methods: {
      fileObserver () {
        this.fetching = true
        this.$axios.post('town/postFileObserver', this.$qs.stringify({time: this.date}))
          .then(res => {
            this.list = res.data.data
            this.fetching = false
          })
      },
      fileStatus (t) {
        const time = this.list.filter(v => {
          return v.ttime === t
        })
        // if (this.fetching) {
        //   return
        // }
        if (time.length) {
          const timeline = time[0].ctime.split(' ')[0] + ' ' + t + ':00'
          const ctime = time[0].ctime
          if (timeline < ctime) {
            return 'late'
          } else {
            return 'ontime'
          }
        } else {
          const flag = format(new Date(), 'yyyy-mm-dd') === this.date
          return flag || this.fetching ? '' : 'missed'
        }
      },
      changeDate (d) {
        if (addHour(dateFromString(this.date, 'yyyy-mm-dd'), d * 24).getTime() > new Date().getTime()) {
          return
        }
        const date = format(addHour(dateFromString(this.date, 'yyyy-mm-dd'), d * 24), 'yyyy-mm-dd')
        this.date = date
        this.fileObserver()
      },
      handleOperate () {
        this.$axios.post('town/postIpInfo')
          .then(res => {
            const flag = res.data.data
            if (!flag) {
              this.$message.error('您没有操作权限!!!')
              return
            }
          })
      },
      showInfo (i, t) {
        const time = this.list.filter(v => {
          return v.ttime === t
        })
        if (time.length === 0) {
          this.flag = false
        } else {
          this.index = i
          this.valueIndex = this.list.findIndex(v => v.ttime === time[0].ttime)
          this.flag = true
        }
      },
      offsetX () {
        const left = this.index * 80 + (140 - 80) / 2 - 70 + 17 + 'px'
        return { left }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .observer
    margin-top 15px
    .content
      height 48px
      margin-top 10px
      display flex
      justify-content space-between
      .date-btns
        display flex
        .date-btn
          width 50px
          line-height 48px
          text-align center
          background-color #f5f5f5
          cursor pointer
          border 1px solid #eeeeee
          display flex
          align-items center
          &:first-child
            border-top-left-radius 20px
            border-bottom-left-radius 20px
            border-right none
            justify-content flex-start
            padding-left 15px
          &:last-child
            border-top-right-radius 20px
            border-bottom-right-radius 20px
            border-left none
            justify-content flex-end
            padding-right 15px
          &.not-allowed
            cursor not-allowed
        .date-value
          padding 0 25px
          height 48px
          line-height 46px
          font-size 12px
          color #000000
          background-color #f5f5f5
          border-top 1px solid #eeeeee
          border-bottom 1px solid #eeeeee
          font-family "SimSun"
      .time-actions
        flex 1
        margin-left 40px
        display flex
        justify-content space-between
        align-items center
        .time-items
          display flex
          position relative
          padding-left 7px
          background-image url(../../../../assets/img/county/observer_bg.png)
          background-repeat no-repeat
          background-position bottom left
          height 100%
          .time-item
            width 80px
            text-align center
            height 42px
            line-height 30px
            cursor pointer
            font-size 12px
            font-family "SimSun"
            background-image url(../../../../assets/img/county/state_default.png)
            background-repeat no-repeat
            background-position center
            &.ontime
              color #fff
              background-image url(../../../../assets/img/county/state_ontime.png)
            &.late
              color #fff
              background-image url(../../../../assets/img/county/state_late.png)
            &.missed
              color #fff
              background-image url(../../../../assets/img/county/state_missed.png)
          .message
            position absolute
            top 45px
            font-size 12px
            box-shadow 0px 1px 5px 0px rgba(153, 153, 153, 0.5)
            width 140px
            background-color #fff
            transition: left 0.5s
            div
              text-align center
              line-height 25px
              
        .operate-handle
          width 110px
          height 48px
          line-height 46px
          border-radius 24px
          text-align center
          background-color #f5f5f5
          cursor pointer
          margin-right 5px
          border 1px solid #eeeeee
          span
            margin-left 5px
            font-size 12px
</style>