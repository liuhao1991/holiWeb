<template>
  <div class="weight">
    <div class="top">
      <div class="center">
        <div class="datetime">
          <div class="title">
            省市订正融合权重查询
          </div>
          <div class="datetime-actions">
            <div class="prev" @click="changeDate(-1)">
              <img src="@/assets/img/county/weight_prev.png" alt="向前">
            </div>
            <div class="value">
              {{ datetime }}
            </div>
            <div class="next" @click="changeDate(1)" :class="[notAllowed ? 'not-allowed' : '']">
              <img src="@/assets/img/county/weight_next.png" alt="向后">
            </div>
          </div>
        </div>
        <div class="tip">
          说明：<br/>
          降水权重计算方法
        </div>
      </div>
    </div>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th rowspan="3">地区</th>
            <th colspan="6">降水</th>
            <th colspan="4">日最高温度</th>
            <th colspan="4">日最低温度</th>
          </tr>
          <tr>
            <th colspan="2">综合权重</th>
            <th colspan="2">近三个月<br/>晴雨预报准确率</th>
            <th colspan="2">近一年<br/>中雨以上降水TS评分</th>
            <th colspan="2">综合权重</th>
            <th colspan="2">近三个月<br/>2℃预报准确率</th>
            <th colspan="2">综合权重</th>
            <th colspan="2">近三个月<br/>2℃预报准确率</th>
          </tr>
          <tr>
            <th>省台</th>
            <th>市台</th>
            <th>省台</th>
            <th>市台</th>
            <th>省台</th>
            <th>市台</th>
            <th>省台</th>
            <th>市台</th>
            <th>省台</th>
            <th>市台</th>
            <th>省台</th>
            <th>市台</th>
            <th>省台</th>
            <th>市台</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.PCode">
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ valueFmt(item.Pr24.w1) }}
            </td>
            <td :style="setStyle(item.Pr24.w2)">
              {{ valueFmt(item.Pr24.w2) }}
            </td>
            <td>
              {{ valueFmt(item.Pr24.l1s1) }}
            </td>
            <td :style="setStyle(item.Pr24.l2s1)">
              {{ valueFmt(item.Pr24.l2s1) }}
            </td>
            <td>
              {{ valueFmt(item.Pr24.l1s2) }}
            </td>
            <td>
              {{ valueFmt(item.Pr24.l2s2) }}
            </td>
            <td>
              {{ valueFmt(item.TMax24.w1) }}
            </td>
            <td :style="setStyle(item.TMax24.w2)">
              {{ valueFmt(item.TMax24.w2) }}
            </td>
            <td>
              {{ valueFmt(item.TMax24.l1s1) }}
            </td>
            <td :style="setStyle(item.TMax24.l2s1)">
              {{ valueFmt(item.TMax24.l2s1) }}
            </td>
            <td>
              {{ valueFmt(item.TMin24.w1) }}
            </td>
            <td :style="setStyle(item.TMin24.w2)">
              {{ valueFmt(item.TMin24.w2) }}
            </td>
            <td>
              {{ valueFmt(item.TMin24.l1s1) }}
            </td>
            <td :style="setStyle(item.TMin24.l2s1)">
              {{ valueFmt(item.TMin24.l2s1) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { format, dateFromString, addHour } from '@/assets/js/dateFmt'
  export default {
    data () {
      return {
        datetime: '',
        data: []
      }
    },
    computed: {
      notAllowed () {
        return addHour(dateFromString(this.datetime, 'yyyy-mm-dd HH:MM'), 1 * 12).getTime() > new Date().getTime()
      }
    },
    activated () {
      this.initDatetime()
      this.fetchData()
    },
    methods: {
      initDatetime () {
        const date = new Date()
        const hour = date.getHours()
        if ( hour >= 20) {
          this.datetime = format(date, 'yyyy-mm-dd 20:00')
        } else if ( hour >= 8 && hour < 20) {
          this.datetime = format(date, 'yyyy-mm-dd 08:00')
        } else {
          this.datetime = format(addHour(date, -24), 'yyyy-mm-dd 20:00')
        }
      },
      fetchData () {
        this.$axios.post('town/postWeight', this.$qs.stringify({time: this.datetime + ':00'}))
          .then(res => {
            const countyData = res.data.county
            const data = res.data.data
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < countyData.length; j++) {
                const cdata = countyData[j]
                const item = data[i]
                if (cdata.PCode === item.PCode && (item.VarName === 'Pr24' || item.VarName === 'TMax24' || item.VarName === 'TMin24')) {
                  countyData[j][item.VarName] = item
                }
              }
            }
            this.data = countyData
          })
      },
      changeDate (d) {
        if (addHour(dateFromString(this.datetime, 'yyyy-mm-dd HH:MM'), d * 12).getTime() > new Date().getTime()) {
          return
        }
        const datetime = format(addHour(dateFromString(this.datetime, 'yyyy-mm-dd HH:MM'), d * 12), 'yyyy-mm-dd HH:MM')
        this.datetime = datetime
        this.fetchData()
      },
      valueFmt (v) {
        return Number(v).toFixed(1) + '%'
      },
      setStyle (v) {
        return Number(v).toFixed(1) < 50 ? {color: 'red'} : null
      }
    }
  }
</script>

<style scoped lang="stylus">
  .top
    height 150px
    width 100%
    background-image url(../../../../assets/img/county/weight_bg.png)
    .center
      display flex
      justify-content space-between
      align-items center
      height 100%
      *
        color #fff
      .title
        font-size 24px
      .datetime-actions
        display flex
        justify-content flex-start
        height 34px
        border 1px solid rgb(203, 139, 255)
        background rgba(78, 43, 199, 0.7)
        div
          height 100%
          display flex
          align-items center
          justify-content center
          &.prev, &.next
            cursor pointer
            width 34px
          &.prev
            border-right 1px solid rgb(203, 139, 255)
          &.next
            border-left 1px solid rgb(203, 139, 255)
            &.not-allowed
              cursor not-allowed
          &.value
            padding 0px 35px
            font-size 16px
      .tip
        font-size 12px
  .center, .table
    width 1200px
    margin 0 auto
  .table
    padding 20px 0
    table
      width 100%
      border-collapse collapse
      tr
        height 34px
        th, td
          font-weight normal 
          font-size 12px
          text-align center
          border 1px solid rgb(229, 229, 229)
        td
          width calc(100% / 15)
</style>