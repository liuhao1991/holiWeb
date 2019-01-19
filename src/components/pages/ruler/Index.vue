<template>
  <div class="data">
    <side-bar 
      :ruler="ruler"
      :index="param.index"
      @changeVarId="handleChangeVarId" />
    <div class="content">
      <config 
        :item="ruler[param.index]" 
        :index="param.index" 
        @changeDateTime="handleChangeDateTime"
        @changeArea="handleChangeArea" />
      <div class="map-wrapper">
        <m-map 
          :title="title" 
          @toggleClip="handleToggleClip"
          @toggleValue="handleToggleValue"
          @toggleFillColor="handleToggleFillColor"
          @toggleStrokeLine="handleToggleStrokeLine"
          @changeTextFontSize="handleChangeTextFontSize"
          @changeToFixed="handleChangeToFixed"
          @changeTextColor="handleChangeTextColor"
          @changeMaxValue="handleChangeMaxValue"
          @changeMinValue="handleChangeMinValue"
          @changeLineWidth="handleChangeLineWidth"
          @changeLineColor="handleChangeLineColor"
          />
        <tips />
      </div>
    </div>
  </div>
</template>

<script>
  import SideBar from './SideBar'
  import Config from './Config'
  import Tips from './Tips'
  import MMap from './Map'
  import { ruler, param } from '@/assets/js/ruler'
  import { format, dateFromString, addHour } from '@/assets/js/dateFmt'
  export default {
    data () {
      return {
        ruler,
        param,
        title: ''
      }
    },
    components: {
      SideBar,
      MMap,
      Config,
      Tips
    },
    methods: {
      handleToggleClip (val) {
        this.param.clip = val
        this.fetchData()
      },
      handleToggleValue (val) {
        this.param.showValue = val
        this.fetchData()
      },
      handleToggleFillColor (val) {
        this.param.fillColor = val
        this.fetchData()
      },
      handleToggleStrokeLine (val) {
        this.param.strokeLine = val
        this.fetchData()
      },
       handleChangeTextFontSize (val) {
        this.param.textFontSize = val
        this.fetchData()
      },
      handleChangeToFixed (val) {
        this.param.toFixed = val
        this.fetchData()
      },
      handleChangeTextColor (val) {
        this.param.textColor = val
        this.fetchData()
      },
      handleChangeMaxValue (val) {
        this.param.maxValue = val
        if (this.param.minValue === '') return
        if (Number(this.param.maxValue) < Number(this.param.minValue)) {
          this.$message.error('最小值不能大于最大值')
          return
        }
        this.fetchData()
      },
      handleChangeMinValue (val) {
        this.param.minValue = val
        if (this.param.maxValue === '') return
        if (Number(this.param.maxValue) < Number(this.param.minValue)) {
          this.$message.error('最小值不能大于最大值')
          return
        }
        this.fetchData()
      },
      handleChangeLineWidth (val) {
        this.param.lineWidth = val
        this.fetchData()
      },
      handleChangeLineColor (val) {
        this.param.lineColor = val
        this.fetchData()
      },
      handleChangeVarId (index) {
        this.param.index = index
        this.param.varName = this.ruler[index].varName
        this.param.hourspan = this.ruler[index].hourspan
      },
      handleChangeDateTime (ymdH) {
        this.param.dtValid = ymdH
        this.fetchData()
      },
      handleChangeArea (area) {
        this.param.area = area.prefecture
        this.fetchData(area.center)
      },
      fetchData (center) {
        setTimeout(() => {
          vm.$emit('renderMap', this.param, center)
          this.setTitle()
        }, 100)
      },
      setTitle () {
        const ymdH = format(new Date(), 'yyyy').substr(0, 2) + this.param.dtValid
        const fmtYmdH = format(dateFromString(ymdH, 'yyyymmddHH'), 'yyyy年mm月dd日HH时')
        this.title = `${this.param.area} ${fmtYmdH} ${this.ruler[this.param.index].name}预报`
      }
    }
  }
</script>

<style scoped lang="stylus">
  .data
    display flex
    justify-content flex-start
    height calc(100vh - 60px)
    min-height 760px
    .content
      flex 1
      height 100%
      position relative
      .map-wrapper
        display flex
        height calc(100% - 65px)
</style>