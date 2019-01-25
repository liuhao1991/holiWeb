<template>
  <div class="week-chart">
    <m-title>
      <div class="title">
        <img src="@/assets/img/county/calendar.png">
        <span class="text">{{ title }}七天预报</span>
        <span class="datetime">{{ datetime }}</span>
      </div>
      <div class="title-btns">
        <router-link class="title-btn" to="/county/detail">
          <img src="@/assets/img/county/more.png">
          <span>11地市全部预报</span>
        </router-link>
        <router-link class="title-btn weight-btn" to="/county/weight">
          <img src="@/assets/img/county/weight.png">
          <span>省市订正融合权重</span>
        </router-link>
      </div>
    </m-title>
    <div class="chart">
      <div class="day" 
        v-for="(item, index) in new Array(townData.length / 2)"
        :key="index"
        :class="[setWWClass(townData[index * 2].WW, townData[index * 2 + 1].WW)]">
        <div class="ww-img">    
          <div v-if="setWWClass(townData[index * 2].WW, townData[index * 2 + 1].WW) === 'sunny'" class="sun">
            <div class="ray_box">
              <div class="ray ray1">1</div>
              <div class="ray ray2"></div>
              <div class="ray ray3"></div>
              <div class="ray ray4"></div>
              <div class="ray ray5"></div>
              <div class="ray ray6"></div>
              <div class="ray ray7"></div>
              <div class="ray ray8"></div>
              <div class="ray ray9"></div>
              <div class="ray ray10"></div>
            </div>
          </div>
          <div v-else-if="setWWClass(townData[index * 2].WW, townData[index * 2 + 1].WW) === 'rainy'">
            <img src="@/assets/img/county/ww/rain_b.png" class="rain"/>
            <img src="@/assets/img/county/ww/rain_s.png" class="rain"/>
          </div>
          <div v-else-if="setWWClass(townData[index * 2].WW, townData[index * 2 + 1].WW) === 'snowy'">
            <img src="@/assets/img/county/ww/snow_b.png" class="snow" />
            <img src="@/assets/img/county/ww/snow_s.png" class="snow" />
          </div>
          <div v-else-if="setWWClass(townData[index * 2].WW, townData[index * 2 + 1].WW) === 'lightning'">
            <div class="lightning"></div>
            <div class="lightning"></div>
          </div>
          <img v-else-if="setWWClass(townData[index * 2].WW, townData[index * 2 + 1].WW) === 'cloudy'" src="@/assets/img/county/ww/cloudy.png" />
        </div>
        <div class="weekday">
          {{ getDay(townData[index * 2].INITDATE, townData[index * 2].FH) }}          
        </div>
        <div class="date">
          {{ getDate(townData[index * 2].INITDATE, townData[index * 2].FH) }}
        </div>
        <div class="ww">
          <img :src="'./img/wwmoji/0' + wwIcon(townData[index * 2].WW)">
          &nbsp;&nbsp;
          <img :src="'./img/wwmoji/' + wwIcon(townData[index * 2 + 1].WW)">
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
  import { ww, ws, wd, wwClassName } from '@/assets/js/config'
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
        return `${ww}.png`
      },
      wwText (ww1Code, ww2Code) {
        const ww1 = (ww1Code.length < 2 ? '0' : '') + ww1Code
        const ww2 = (ww2Code.length < 2 ? '0' : '') + ww2Code
        return ww[ww1] + (ww1 == ww2 ? '' : '转' + ww[ww2])
      },
      windText (wsCode, wdCode) {
        return wd[wdCode] + ' ' + ws[wsCode]
      },
      setWWClass (ww1, ww2) {
        return wwClassName(ww1, ww2)
      }
    },
    components: {
      MTitle
    }
  }
</script>

<style scoped lang="stylus">
  .week-chart
    padding-top 20px
    .chart
      margin-top 20px
      height 230px
      position relative
      display flex
      .day
        flex 1
        display flex
        align-items center
        flex-direction column
        font-size 12px
        padding-bottom 10px
        padding-top 12px
        border-right 1px solid rgba(255, 255, 255, 1)
        background-position center
        position relative
        overflow hidden
        div
          color #ffffff
          display flex
          justify-content center
          align-items center
          position relative
          z-index 2
          &.weekday, &.date, &.temp, &.wind
            height 30px
          &.ww
            height 35px
            img 
              width 24px
              height 24px
          &.staus
            height 50px
          &.ww-img
            position absolute
          
        &.sunny
          background-image url('../../../../assets/img/county/ww/sunny_bg.png')
          .ww-img
            right 35px
            top 0px
            .sun
              position absolute
              top 0
              left 0
              right 0
              bottom 0
              margin auto  
              width 70px
              height 70px
              border-radius 50%	
              background #ebc34f
              opacity 1			
              box-shadow 0px 0px 30px 10px #ebc34f 
              .ray_box
                position absolute
                margin auto
                top 0
                left 0
                right 0
                bottom 0	
                width 70px
                .ray
                  background linear-gradient(to bottom, rgba(253, 201, 255, 0) 0%, rgba(253, 201, 255, 0.8) 50%, rgba(253, 201, 255, 0) 100%) 
                  margin-left 10px
                  border-radius 80% 80% 0 0
                  position absolute
                  opacity 0.3
                  &.ray1 
                    height 170px
                    width 30px
                    -webkit-transform rotate(180deg)
                    top -175px
                    left 15px
                  &.ray2
                    height 100px
                    width 8px
                    -webkit-transform rotate(220deg)
                    top -90px
                    left 75px
                  &.ray3
                    height 170px
                    width 50px
                    -webkit-transform rotate(250deg)
                    top -80px
                    left 100px
                  &.ray4
                    height 120px
                    width 14px
                    -webkit-transform rotate(305deg)
                    top 30px
                    left 100px
                  &.ray5
                    height 140px
                    width 30px
                    -webkit-transform rotate(-15deg)
                    top 60px
                    left 40px
                  &.ray6
                    height 90px
                    width 50px
                    -webkit-transform rotate(30deg)
                    top 60px
                    left -40px
                  &.ray7
                    height 180px
                    width 10px
                    -webkit-transform rotate(70deg)
                    top -35px
                    left -40px
                  &.ray8
                    height 120px
                    width 30px
                    -webkit-transform rotate(100deg)
                    top -45px
                    left -90px
                  &.ray9
                    height 80px
                    width 10px
                    -webkit-transform rotate(120deg)
                    top -65px
                    left -60px
                  &.ray10
                    height 190px
                    width 23px
                    -webkit-transform rotate(150deg)
                    top -185px
                    left -60px
          &:hover
            .ww-img
              .ray_box
                animation sunspinning 60s linear infinite
        &.overcast
          background-image url(../../../../assets/img/county/ww/overcast_bg.png)
        &.rainy
          background-image url(../../../../assets/img/county/ww/rainy_bg.png)
          .ww-img
            right 15px
            .rain
              position absolute
              top -20px
              right -16px
              &:nth-child(2)
                top 35px
                right 60px
          &:hover
            .ww-img
              .rain
                animation rainy 2.5s infinite linear
                &:nth-child(2)
                  animation rainy_small 2.5s infinite linear
        &.cloudy
          background-image url(../../../../assets/img/county/ww/cloudy_bg.png)
          .ww-img
            top 12px
            right -10px
            opacity 1
          &:hover
            .ww-img
              animation cloud 8s infinite linear
        &.lightning
          background-image url(../../../../assets/img/county/ww/lightning_bg.png)
          .ww-img
            top 30px
            right 30px
            .lightning
              position absolute
              top 50%
              left 50%
              margin 1.55em 0 0 -0.125em
              color #fff
              opacity 0.3
              transform scaleY(2.5) scaleX(1.5) rotate(10deg)
              &:nth-child(2)
                width 0.5em
                height 0.25em
                margin 8.75em 0 0 -6.275em
                transform translate(2.5em, 2.25em)
                opacity 0.2
                transform scaleY(2.5)
              &:before, &:after 
                content ''
                position absolute
                z-index 2
                top 50%
                left 50%
                margin -1.625em 0 0 -1.0125em
                border-top 1.1em solid transparent
                border-right 0.75em solid
                border-bottom 0.75em solid
                border-left 0.5em solid transparent
                transform skewX(-10deg)
              &:after
                margin -0.25em 0 0 -0.25em
                border-top 0.75em solid
                border-right 0.5em solid transparent
                border-bottom 1.25em solid transparent
                border-left 0.75em solid
                transform skewX(-10deg)
              &:nth-child(2):before 
                margin -0.75em 0 0 -0.5em
                border-top 0.525em solid transparent
                border-right 0.375em solid
                border-bottom 0.375em solid
                border-left 0.25em solid transparent
              &:nth-child(2):after
                margin -0.125em 0 0 -0.125em
                border-top 0.375em solid
                border-right 0.25em solid transparent
                border-bottom 0.625em solid transparent
                border-left 0.375em solid
          &:hover
            .ww-img
              .lightning
                animation lightning 2s linear infinite
                &:nth-child(2)
                  animation lightning 1.5s linear infinite
        &.snowy
          background-image url(../../../../assets/img/county/ww/snowy_bg.png)
          .ww-img
            top -5px
            .snow
              top 0px
              right -45px
              &:nth-child(2)
                top 35px
                right 60px
          &:hover
            .snow
              animation snow_falling 10s linear infinite
                
        &:first-child
          border-top-left-radius 10px
          border-bottom-left-radius 10px
        &:last-child
          border-right none
          border-top-right-radius 10px
          border-bottom-right-radius 10px

  @keyframes snow_falling {
    0% {
      top 0px
    }
    70% {
      top 235px
      opacity 1
    }
    71% {
      top 235px
      opacity 0
    }
    72% {
      top -70px
      opacity 0
    }
    75% {
      top -70px
      opacity 1
    }
    100% {
      top 0px
    }
  }

  @keyframes cloud {
    0% {
      transform translate(0%, 0)
      opacity 1
    }
    50% {
      transform translate(-112%, 0)
      opacity 1
    }
    51% {
      transform translate(-112%, 0)
      opacity 0
    }
    52% {
      transform translate(100%, 0)
      opacity 0
    }
    53% {
      transform translate(100%, 0)
      opacity 1
    }
    100% {
      transform translate(0, 0)
      opacity 1
    }
  }

  @keyframes rainy {
    0% {
      top -20px
      right -16px
      opacity 1
    }
    75% {
      top 220px
      right 30px
      opacity 1
    }
    76% {
      top 220px
      opacity 0
    }
    77% {
      top -80px
      opacity 0
    }
    78% {
      top -80px
      right -30px
      opacity 1
    }
    100% {
      top -20px
      right -16px
      opacity 1
    }
  }
  @keyframes rainy_small {
    0% {
      top 35px
      right 60px
      opacity 1
    }
    60% {
      top 200px
      right 80px
      opacity 1
    }
    61% {
      top 200px
      opacity 0
    }
    62% {
      top -40px
      right 50px
      opacity 0
    }
    65% {
      top -40px
      right 50px
      opacity 1
    }
    100% {
      top 35px
      right 60px
      opacity 1
    }
  }

  @keyframes lightning {
    45% {
      color #fff
      background #fff
      opacity 0.2
    }
    50% {
      color #fff
      background #fff
      opacity 0.7
    }
    55% {
      color #fff
      background: #fff
      opacity 0.2
    }
  }

  @keyframes sunspinning {
    0% {
      -webkit-transform rotate(0deg)
      transform: rotate(0deg)
    }    
    100% {
      -webkit-transform rotate(360deg)
      transform rotate(360deg)
    }
  }

</style>