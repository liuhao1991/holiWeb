<template>
  <div class="map-wrapper">
    <div class="time-action">
      <div class="prev" @click="prev"></div>
      <div class="time-span">{{ title }}</div>
      <div class="next" @click="next"></div>
    </div>
    <div id="county-map">
      <div class="counties" v-if="Object.keys(fmtData).length">
        <div class="county"
          v-for="(item, index) in fmtData"
          :key="index"
          :coordinate="[Number(item[0].Lon), Number(item[0].Lat)]"
          :id="item[0].STID"
          v-show="show(item[0].PName)"
          :class="[item[0].PName]"
          @click="renderTownFcst(item[0].PName)">
          <div class="name">
            {{ item[0].PName }}
          </div>
          <div class="info">
            <div class="ww-img">
              <div class="img-item">
                <img :src="dayWW(item[fcstIndex].WW)">
              </div>
              <div class="img-item">
                <img :src="nightWW(item[fcstIndex + 1].WW)">
              </div>
            </div>
            <div class="ww-text">
              {{ `${Number(item[fcstIndex + 1].tMin)}/${Number(item[fcstIndex + 1].tMax)}℃` }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Map from 'ol/Map'
  import View from 'ol/View'
  import TileLayer from 'ol/layer/Tile'
  import XYZ from 'ol/source/XYZ'
  import Overlay from 'ol/Overlay'
  import { fromLonLat } from 'ol/proj'
  import { format, dateFromString, addHour } from '@/assets/js/dateFmt'
  export default {
    data () {
      return {
        fcstIndex: 0,
        fmtData: {},
        countyMap: null,
        zoom:13,
        mainCity: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市']
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (!this.countyMap) {
          this.initMap()
        }
        this.fetchTownFcst()
      })
    },
    // beforeDestroy () {
    //   this.countyMap.getOverlays().clear()
    //   this.fmtData = {}
    // },
    computed: {
      title () {
        const exist = this.fmtData['杭州市']
        if (!exist) return ''
        const initdate = this.fmtData['杭州市'][this.fcstIndex].INITDATE
        const fh1 = Number(this.fmtData['杭州市'][this.fcstIndex].FH) - 12
        const fh2 = Number(this.fmtData['杭州市'][this.fcstIndex + 1].FH)
        const dateTime = dateFromString(initdate, 'yyyy-mm-dd HH:MM:SS')
        const startDateTime = addHour(dateTime, fh1)
        const endDateTime = addHour(dateTime, fh2)
        return format(startDateTime, 'yyyy年mm月dd日HH时') + '-' + format(endDateTime, 'dd日HH时') + '城镇天气预报'
      }
    },
    methods: {
      initMap () {
        this.countyMap = new Map({
          target: 'county-map',
          layers: [
            new TileLayer({
              source: new XYZ({
                url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&crs=EPSG4326&x={x}&y={y}&z={z}'
                // url: './img/tiles/{z}/{x}/{y}.png'
              })
            }),
          ],
          view: new View({
            center: fromLonLat([120.1, 29.86]),
            zoom: this.zoom,
            minZoom: 13,
            maxZoom: 16,
            zoomFactor: 1.5
          }),
          controls: [],
        })
      },
      fetchTownFcst () {
        this.$axios.post('town/postTownFcst')
          .then(res => {
            // console.log(res)
            const data = res.data.data
            const fmtData = {}
            for (let index = 0; index < data.length; index++) {
              const name = data[index].PName
              if (!fmtData[name]) {
                fmtData[name] = []
              }
              fmtData[name].push(data[index])
            }
            this.fmtData = fmtData
          })
          .then(_ => {
            this.renderTowns()
            this.renderTownFcst(this.mainCity[0])
            this.changeResolution()
          })
      },
      changeResolution () {
        this.countyMap.getView().on('change:resolution', () => {
          const zoom = this.countyMap.getView().getZoom()
          if (Number.isInteger(zoom)) {
            this.zoom = zoom
          }
        })
      },
      renderTowns () {
        const items = document.querySelectorAll('.counties .county')
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          const stid = item.id
          const coordinate = fromLonLat(item.getAttribute('coordinate').split(',').map(v => Number(v)))// fromLonLat(item.coordinate)
          const popup = new Overlay({
            element: document.getElementById(stid),
            positioning: 'center-top'
          })
          popup.setPosition(coordinate)
          this.countyMap.addOverlay(popup)
        }
      },
      renderTownFcst (name) {
        const nodes = document.querySelectorAll('.county')
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].classList.remove('active')
        }
        if (document.querySelector('.' + name)) {
          document.querySelector('.' + name).classList.add('active')
          vm.$emit('renderTownFcst', this.fmtData[name])
        }
      },
      prev () {
        if (this.fcstIndex === 0) return
        this.fcstIndex -= 2
      },
      next () {
        const length = this.fmtData['杭州市'].length
        if (this.fcstIndex >= length - 2) return
        this.fcstIndex += 2
      },
      show (name) {
        if (this.mainCity.indexOf(name) !== -1) return true
        if (this.zoom === 13) return false
        else return true
      },
      dayWW (ww) {
        ww = (Number(ww) <= 9 ? '00' : '0') + ww
        return `./img/ww/${ww}.png`
      },
      nightWW (ww) {
        ww = (Number(ww) <= 9 ? '0' : '') + ww
        return `./img/ww/${ww}.png`
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/variables'
  .map-wrapper
    width 940px
    height 100%
    position relative
    .time-action
      position absolute
      top 10px
      left 20px
      display flex
      justify-content flex-start
      border-radius 2px
      z-index 99
      .prev, .next
        width 30px
        height 40px
        background-color rgba(51, 48, 69, 0.9)
        background-position center
        background-repeat no-repeat
        cursor pointer

      .time-span
        height 40px
        line-height 40px
        padding 0 10px
        color #fff
        background-color rgba(51, 48, 69, 0.9)
        font-size $font-size
      .prev
        background-image url(../../../../assets/img/county/prev.png)
      .next
        background-image url(../../../../assets/img/county/next.png)
    #county-map
      width 940px
      height 100%
      position relative
      &:after
        content ''
        position absolute
        width 5px
        right -1px
        bottom 0
        top 0
        box-shadow inset -15px 0px  10px -15px rgba(153, 153, 153, 1)
        z-index 2
      .county
        position absolute
        font-size $font-size
        z-index 19
        .name
          white-space nowrap
          position relative
        .info
          border-radius 24px
          padding 4px 14px
          background-color rgb(255, 255, 255)
          box-shadow 0px 1px 5px 0px rgba(117, 207, 240, 0.7)
          cursor pointer
          position absolute
          left -70%
          bottom 25px
          &:after
            content ''
            position absolute
            width 0
            height 0
            border 8px solid transparent
            border-top-color rgb(255, 255, 255)
            top 91%
            left 50%
            margin-left -7px
          .ww-img
            display flex
            justify-content space-around
            .img-item
              padding 0 4px
              img 
                width 20px
          .ww-text
            line-height 20px
            text-align center

        &:hover, &.active
          z-index 99
          .name
            color rgb(22, 105, 175)
          .info
            background-image gradient( 90deg, rgb(0, 134, 255) 0%, rgb(0, 169, 255) 100%)
            background-color rgb(0, 166, 255)
            &:after, &:after
              border-top-color rgb(0, 166, 255)
            .ww-text
              color #fff
        &:hover
          z-index 100
</style>