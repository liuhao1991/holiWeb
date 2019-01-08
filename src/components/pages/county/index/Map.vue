<template>
  <div class="map-wrapper">
    <div class="time-action">
      <div class="prev" @click="prev"></div>
      <div class="time-span">{{ title }}</div>
      <div class="next" @click="next"></div>
    </div>
    <div id="map">
      <div class="counties" v-if="Object.keys(fmtData).length">
        <div class="county"
          v-for="(item, index) in fmtData"
          :key="index"
          :coordinate="[Number(item[0].Lon), Number(item[0].Lat)]"
          :id="item[0].STID"
          v-show="show(item[0].PName)"
          :class="[item[0].PName === name ? 'active' : '']"
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
  import 'ol/ol.css'
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
        name: '',
        fcstIndex: 0,
        data: [],
        map: null,
        zoom: 13,
        mainCity: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市']
      }
    },
    mounted () {
      this.initMap()
      this.fetchTownFcst()
    },
    computed: {
      fmtData () {
        const fmtData = {}
        for (let index = 0; index < this.data.length; index++) {
          const name = this.data[index].PName
          if (!fmtData[name]) {
            fmtData[name] = []
          }
          fmtData[name].push(this.data[index])
        }
        return fmtData
      },
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
        this.map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new XYZ({
                url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&crs=EPSG4326&x={x}&y={y}&z={z}'
                // url: '/img/tiles/{z}/{x}/{y}.png'
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
            this.data = res.data.data
          })
          .then(_ => {
            this.changeResolution()
          })
      },
      changeResolution () {
        this.renderTowns()
        this.renderTownFcst(this.mainCity[0])
        this.map.getView().on('change:resolution', () => {
          const zoom = this.map.getView().getZoom()
          if (Number.isInteger(zoom)) {
            this.zoom = zoom
          }
        })
      },
      renderTowns () {
        for (const key in this.fmtData) {
          const element = this.fmtData[key]
          const stid = element[0].STID
          const coordinate = fromLonLat([Number(element[0].Lon), Number(element[0].Lat)])
          var popup = new Overlay({
            element: document.getElementById(stid),
            positioning: 'center-top'
          })
          popup.setPosition(coordinate)
          this.map.addOverlay(popup)
        }
      },
      renderTownFcst (name) {
        this.name = name
        vm.$emit('renderTownFcst', this.fmtData[name])
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
        return `/img/ww/${ww}.png`
      },
      nightWW (ww) {
        ww = (Number(ww) <= 9 ? '0' : '') + ww
        return `/img/ww/${ww}.png`
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/variables'
  .map-wrapper
    width 700px
    position relative
    .time-action
      position absolute
      top 10px
      left 20px
      display flex
      justify-content flex-start
      z-index 100
      .prev, .next
        width 30px
        height 30px
        background-color #ffffff
        background-position center
        background-repeat no-repeat
        background-size 6px
        &:hover
          background-color #00A6FF
          cursor pointer
      .time-span
        height 30px
        line-height 30px
        padding 0 10px
        background-color #fff
        margin 0 10px
        font-size $font-size
        font-weight bold
      .prev
        background-image url(/img/county/prev.png)
        &:hover
          background-image url(/img/county/prev_white.png)
      .next
        background-image url(/img/county/next.png)
        &:hover
          background-image url(/img/county/next_white.png)
    #map
      width 680px
      height 850px
      border 1px solid #e5e5e5
      .county
        position absolute
        font-size $font-size
        z-index 2
        .name
          white-space nowrap
          position relative
          // font-weight bold
        .info
          border-radius 2px
          padding 0px 5px
          background-color rgb(255, 255, 255)
          box-shadow 0px 1px 5px 0px rgba(117, 207, 240, 0.7)
          cursor pointer
          position absolute
          left -40%
          top 25px
          &:after
            content ''
            position absolute
            width 0
            height 0
            border 8px solid transparent
            border-bottom-color rgb(255, 255, 255)
            bottom 91%
            left 50%
            margin-left -7px
          .ww-img
            display flex
            justify-content space-around
            .img-item
              padding 0 4px
              img 
                width 16px
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
              border-bottom-color rgb(0, 166, 255)
            .ww-text
              color #fff    
</style>