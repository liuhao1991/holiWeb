<template>
  <div class="week-chart">
    <m-title>
      <div class="title">
        <span class="text">{{ title}} 七天预报</span>
        <span class="datetime">{{ datetime }}</span>
      </div>
      <div class="title-btns">
        <router-link class="title-btn" to="county/detail">
          <img src="@/assets/img/county/more.png">
          <span>11市全部预报</span>
        </router-link>
        <router-link class="title-btn" to="county/weight">
          <img src="@/assets/img/county/more.png">
          <span>省市订正融合权重</span>
        </router-link>
      </div>
    </m-title>
    <div class="chart">
      <div class="day" v-for="(item, index) in new Array(townData.length / 2)" :key="index">
        <div class="weekday">
          {{ getDay(townData[index * 2].INITDATE, townData[index * 2].FH) }}          
        </div>
        <div class="date">
          {{ getDate(townData[index * 2].INITDATE, townData[index * 2].FH) }}
        </div>
        <div class="ww">
          <img :src="wwIcon(townData[index * 2].WW)">
          &nbsp;&nbsp;
          <img :src="wwIcon(townData[index * 2 + 1].WW)">
        </div>
        <div class="staus">
          {{ wwText(townData[index * 2].WW, townData[index * 2 + 1].WW) }}
        </div>
        <div class="temp">
          {{ Number(townData[index * 2 + 1].tMin) }}~{{ Number(townData[index * 2 + 1].tMax) }}℃
        </div>
        <div class="wind">
          {{ windText(townData[index * 2].WS, townData[index * 2 + 1].WD) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { format, dateFromString, addHour } from '@/assets/js/dateFmt'
  import { ww, ws, wd } from '@/assets/js/config'
  import MTitle from './Title'
  export default {
    data () {
      return {
        townData: [],
        weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      }
    },
    mounted () {
      vm.$on('renderTownFcst', data => {
        this.townData = data
      })
    },
    computed: {
      title () {
        if (!this.townData.length) return ''
        return this.townData[0].PName + '(' + this.townData[0].STID +')'
      },
      datetime () {
        if (!this.townData.length) return ''
        return `起报：${format(dateFromString(this.townData[0].INITDATE, 'yyyy-mm-dd HH:MM:SS'), 'dd日HH时')} 更新：${format(dateFromString(this.townData[0].UpdateTime, 'yyyy-mm-dd HH:MM:SS'), 'dd日HH时MM分')}`
      }
    },
    methods: {
      getDay (initDate, fh) {
        const date = addHour(dateFromString(initDate, 'yyyy-mm-dd HH:MM:SS'), Number(fh))
        return this.weekdays[date.getDay()]
      },
      getDate (initDate, fh) {
        const date = addHour(dateFromString(initDate, 'yyyy-mm-dd HH:MM:SS'), Number(fh))
        return format(date, 'mm月dd日')
      },
      wwIcon (ww) {
        ww = (ww.length < 2 ? '0' : '') + ww
        return `/img/wwmoji/${ww}.png`
      },
      wwText (ww1Code, ww2Code) {
        const ww1 = (ww1Code.length < 2 ? '0' : '') + ww1Code
        const ww2 = (ww2Code.length < 2 ? '0' : '') + ww2Code
        return ww[ww1] + (ww1 == ww2 ? '' : '转' + ww[ww2])
      },
      windText (wsCode, wdCode) {
        return wd[wdCode] + ' ' + ws[wsCode]
      }
    },
    components: {
      MTitle
    }
  }
</script>

<style scoped lang="stylus">
  .chart
    height 230px
    position relative
    background-color #546575
    display flex
    .day
      flex 1
      display flex
      align-items center
      flex-direction column
      font-size 12px
      padding-bottom 10px
      padding-top 12px
      background-color rgba(0,0,0,0.3)
      border-right 1px solid rgba(92, 92, 92, 0.5)
      &:last-child
        border-right none
      div
        color #ffffff
        display flex
        justify-content center
        align-items center
        
      .weekday, .date, .temp, .wind
        height 30px
      .ww
        height 35px
      .staus
        height 50px
      .ww img 
          width 24px
          height 24px

</style>