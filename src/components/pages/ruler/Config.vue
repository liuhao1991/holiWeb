<template>
  <div class="config">
    <div class="area">
      <div class="title">地区选择</div>
      <div class="area-options">
        <select v-model="area" @change="changeArea">
          <option 
            v-for="area in areas"
            :value="area.prefecture"
            :key="area.prefecture">
            {{ area.prefecture }}
          </option>
        </select>
      </div>
    </div>
    <div class="time-options">
      <div class="time-top">
        <div class="fcst-date">
          <div class="title">预报日期</div>
          <div class="dates">
            <div 
              v-for="(day, i) in item.daySpan"
              :class="[dayIndex === i ? 'active' : '', 'date']"
              :key="i"
              @click="changeYmd(i, dateFmt(day)[1])">
              {{ dateFmt(day)[0] }}
            </div>
          </div>
        </div>
        <!-- <div class="fcst-span">
          <div class="title">步长选择</div>
          <div class="spans">
            <div class="span active">逐3H</div>
            <div class="span">逐6H</div>
            <div class="span">逐12H</div>
            <div class="span">逐24H</div>
          </div>
        </div> -->
      </div>
      <div class="time-bottom">
        <div
          v-for="(hour, i) in validHours"
          :class="[hourIndex === i ? 'active' : '']"
          :key="i"
          @click="changeHour(i, hour)">
          {{ hour }}
        </div>
      </div>
    </div>
    <!-- <div class="animations">
      <div class="animation">
        <img src="@/assets/img/data/prev.png" alt="向前">
      </div>
      <div class="animation">
        <img src="@/assets/img/data/play.png" alt="播放">
      </div>
      <div class="animation">
        <img src="@/assets/img/data/next.png" alt="向前">
      </div>
    </div> -->
  </div>
</template>

<script>
  import { format, dateFromString, addHour } from '@/assets/js/dateFmt'
  import { param, areas } from '@/assets/js/ruler'
  export default {
    props: ['item', 'index'],
    data () {
      return {
        hourIndex: 0,
        dayIndex: 0,
        ymd: '',
        area: param.area,
        areas
      }
    },
    watch: {
      index (val) {
        const ymd = this.dateFmt(0)[1]
        this.changeYmd(0, ymd)
      }
    },
    computed: {
      validHours () {
        const span = this.item.daySpan[this.dayIndex]
        const hours = this.item.hours
        const datetime = format(addHour(new Date(), span * 24), 'yyyy-mm-dd')
        const validHours = hours.filter(v => {
          return dateFromString(datetime + ' ' + v + ':00', 'yyyy-mm-dd HH:MM:SS').getTime() > new Date().getTime()
        })
        return validHours
      }
    },
    activated () {
      const ymd = this.dateFmt(0)[1]
      this.changeYmd(0, ymd)
    },
    methods: {
      dateFmt (span) {
        const date = addHour(new Date(), span * 24)
        return [format(date, 'dd日'), format(date, 'yymmdd')]
      },
      changeYmd (i, ymd) {
        this.dayIndex = i
        this.ymd = ymd
        this.changeHour(0, this.validHours[0])
      },
      changeHour (i, v) {
        this.hourIndex = i
        const ymdH = this.ymd + v.split(':')[0]
        this.$emit('changeDateTime', ymdH)
      },
      changeArea () {
        const area = this.areas.filter(v => v.prefecture === this.area)
        this.$emit('changeArea', area[0])
      }
    }
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
    .date
      margin-right 5px
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
        width 45px
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