<template>
  <div class="content">
    <config />
    <div class="map-wrapper">
      <div id="map">
        <div class="types">
          <div class="type active">格点</div>
          <div class="type">城镇</div>
          <div class="type">乡镇</div>
        </div>
        <div class="layers">
          <div class="content">
            <img src="@/assets/img/data/layer.png">
            <span>图层样式</span>
          </div>
        </div>
      </div>
      <tips />
    </div>
  </div>
</template>

<script>
  import Config from './Config'
  import Tips from './Tips'
  import 'ol/ol.css'
  import Map from 'ol/Map'
  import View from 'ol/View'
  import TileLayer from 'ol/layer/Tile'
  import XYZ from 'ol/source/XYZ'
  import { fromLonLat } from 'ol/proj'
  export default {
    data () {
      return {
        map: null
      }
    },
    components: {
      Config,
      Tips
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap () {
        this.map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new XYZ({
                url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&crs=EPSG4326&x={x}&y={y}&z={z}'
              })
            }),
          ],
          view: new View({
            center: fromLonLat([120.1, 29.86]),
            zoom: 10,
            minZoom: 10,
            maxZoom: 16,
            // zoomFactor: 1.5
          }),
          controls: [],
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .content
    flex 1
    height 100%
    position relative
    .map-wrapper
      display flex
      height calc(100% - 65px)
      #map
        flex 1
        position relative
        .types
          border-radius 2px
          background-color rgb(255, 255, 255)
          box-shadow 0px 1px 5px 0px rgba(153, 153, 153, 0.5)
          width 144px
          height 30px
          position absolute
          right 110px
          top 10px
          z-index 2
          display flex
          overflow hidden
          .type
            flex 1
            text-align center
            line-height 30px
            font-size 12px
            &:hover, &.active
              background-color rgb(0,134,255)
              background-image linear-gradient(to top, rgb(0,134,255), rgb(0,169,255))
              color #ffffff
              cursor pointer
        .layers
          border-radius 2px
          background-image linear-gradient(to top, rgb(255,162,28), rgb(251,187,0))
          box-shadow 0px 1px 5px 0px rgba(153, 153, 153, 0.5)
          width 90px
          height 30px
          position absolute
          top 10px
          right 10px
          z-index 2
          font-size 12px
          .content
            display flex
            align-items center
            justify-content center
            cursor pointer
            span
              color #fff
              margin-left 5px

</style>