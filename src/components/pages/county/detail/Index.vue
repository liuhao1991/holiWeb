<template>
  <div class="detail">
    <div class="timestamp">
      <div class="timestamp-wrapper">
        <img src="@/assets/img/county/time.png" alt="预报上传时间">
        <span>
          预报上传时间:{{ timestamp }}
        </span>
      </div>
      <div class="data-tip">
        <img src="@/assets/img/county/tip.png" alt="数据提示">
        <span>
          提示:数据完整
        </span>
      </div>
    </div>
    <div class="county-list" v-if="Object.keys(data).length">
      <div class="wrapper" v-for="(county, index) in data" :key="index">
        <div class="title">
          <div class="span"></div>
          <div class="text">{{ index }}市天气预报</div>
        </div>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>日期</th>
                <th>天气</th>
                <th>温度</th>
                <th>风</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in new Array(county.length / 2)" :key="i">
                <td>
                  {{ getDate(county[i * 2].INITDATE, county[i * 2].FH) }}
                </td>
                <td>
                  <span class="img">
                    <img :src="wwIcon(county[i * 2].WW)">
                    <img :src="wwIcon(county[i * 2 + 1].WW)">
                  </span>
                  <span class="text">
                    {{ wwText(county[i * 2].WW, county[i * 2 + 1].WW) }}
                  </span>
                </td>
                <td>
                  {{ Number(county[i * 2 + 1].tMin) }}~{{ Number(county[i * 2 + 1].tMax) }}℃
                </td>
                <td>
                  {{ windText(county[i * 2].WS, county[i * 2 + 1].WD) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { format, dateFromString, addHour } from '@/assets/js/dateFmt'
  import { ww, ws, wd } from '@/assets/js/config'
  export default {
    data () {
      return {
        data: {}
      }
    },
    computed: {
      timestamp () {
        if (!Object.keys(this.data).length) {
          return ''
        }
        const county = Object.keys(this.data)[0]
        const datetime = this.data[county][0].INITDATE
        return format(dateFromString(datetime, 'yyyy-mm-dd HH:MM:SS'), 'yyyy年mm月dd日 HH时MM分')
      }
    },
    activated () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$axios.post('town/postAllCityFcst')
          .then(res => {
            const data = res.data.data
            const fmtData = {}
            for (let i = 0; i < data.length; i++) {
              const item = data[i]
              const city = item.city
              if (!fmtData[city]) {
                fmtData[city] = []
              }
              fmtData[city].push(item)
            }
            this.data = fmtData
          })
      },
      getDate (initDate, fh) {
        const date = addHour(dateFromString(initDate, 'yyyy-mm-dd HH:MM:SS'), Number(fh))
        return format(date, 'mm月dd日')
      },
      wwIcon (ww) {
        ww = (ww.length < 2 ? '0' : '') + ww
        return `/img/wwline/d${ww}.png`
      },
      wwText (ww1Code, ww2Code) {
        const ww1 = (ww1Code.length < 2 ? '0' : '') + ww1Code
        const ww2 = (ww2Code.length < 2 ? '0' : '') + ww2Code
        return ww[ww1] + (ww1 == ww2 ? '' : '转' + ww[ww2])
      },
      windText (wsCode, wdCode) {
        return wd[wdCode] + ' ' + ws[wsCode]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .detail
    padding-bottom 20px
    .timestamp
      background-color rgb(238, 238, 238)
      height 30px
      display flex
      align-items center
      justify-content space-between
      padding 0 20px
      .timestamp-wrapper
        display flex
        align-items center
        font-size 12px
        img
          margin-right 5px
      .data-tip
        height 16px
        display flex
        align-items center
        span
          color red
          font-size 12px
          font-weight bold
          margin-left 5px
    .county-list
      display flex
      flex-wrap wrap
      justify-content flex-start
      .wrapper
        width 450px
        // height 280px
        margin-left 20px
        margin-top 20px
        .title
          display flex
          align-items center;
          height 30px
          .span
            width 4px
            height 14px
            background-color #e18533
          .text
            font-size 14px
            color #101010
            font-weight bold 
            text-indent 6px
        table
          width 100%
          border-collapse collapse
          font-size 12px
          th, td
            border 1px solid rgb(229, 229, 229)
          th
            background-color rgb(250, 250, 250)
            height 30px
            line-height 30px
          tr
            &:nth-child(even)
              background-color rgb(250, 250, 250)
            td
              line-height 30px
              &:first-child
                text-align center
              .img
                margin 0 6px 0 8px
                img 
                  width 20px
                  &:first-child
                    margin-right 5px
              &:nth-child(3),
              &:nth-child(4)
                text-indent 10px
        


          
</style>