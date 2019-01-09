<template>
  <div class="observer">
    <m-title>
      <div class="title">
        <span class="text">城镇报上传国家局监控</span>
      </div>
      <div class="title-btns">
        <router-link class="file-btn" to="">
          <img src="@/assets/img/county/explain.png">
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
          <img src="@/assets/img/county/operate.png" alt="人工操作">
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
        const left = this.index * (70 - 5 / 1.5) - (140 - 65) / 2 + 'px'
        return { left }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .observer
    margin-top 15px
    .content
      height 40px
      margin-top 10px
      display flex
      justify-content space-between
      .date-btns
        display flex
        .date-btn
          width 40px;
          line-height 38px
          text-align center
          background-color #e5e5e5
          cursor pointer
          border 1px solid rgb(229, 229, 229)
          &.not-allowed
            cursor not-allowed
        .date-value
          padding 0 10px
          height 40px
          line-height 38px
          font-size 12px
          color #000000
          border-top 1px solid rgb(229, 229, 229)
          border-bottom 1px solid rgb(229, 229, 229)
      .time-actions
        width calc(100% - 177px)
        border 1px solid #e5e5e5
        display flex
        justify-content space-between
        align-items center
        // padding 0 5px
        .time-items
          display flex
          position relative
          .time-item
            width 65px
            text-align center
            height 38px
            border-left 5px solid #ffffff
            border-top 3px solid #ffffff
            border-bottom 3px solid #ffffff
            line-height 30px
            cursor pointer
            font-size 12px
            background-color #e5e5e5
            &.ontime
              color #fff
              background-color #21AD38
            &.late
              color #fff
              background-color #FFAB12
            &.missed
              color #fff
              background-color #FE6161
          .message
            position absolute
            top 35px
            font-size 12px
            box-shadow 0px 1px 5px 0px rgba(153, 153, 153, 0.5)
            width 140px
            background-color #fff
            transition: left 0.5s
            div
              text-align center
              line-height 25px
              
        .operate-handle
          width 75px
          height 30px
          line-height 30px
          border-radius 2px
          text-align center
          background-color #e5e5e5
          cursor pointer
          margin-right 5px
          span
            margin-left 5px
            font-size 12px
</style>