<template>
  <div id="map">
    <div class="title">
      {{ title }}
    </div>
    <div class="types">
      <div class="type active">格点</div>
      <div class="type">城镇</div>
      <div class="type">乡镇</div>
    </div>
    <div class="layers">
      <div class="content" @click="showLayerOptions = true">
        <img src="@/assets/img/ruler/layer.png">
        <span>图层样式</span>
      </div>
      <transition name="el-zoom-in-top">
        <div class="options" v-show="showLayerOptions">
          <div class="style-title">
            <div class="text">
              <img src="@/assets/img/ruler/layer_gray.png">
              <span>图层样式</span>
            </div>
            <img src="@/assets/img/ruler/close.png" class="close" @click="showLayerOptions = false">
          </div>
          <div class="option-item">
            <div class="type">
              <el-checkbox v-model="clip">裁边</el-checkbox>
            </div>
          </div>
          <div class="option-item">
            <div class="type">
              <el-checkbox v-model="showValue">标值</el-checkbox>
              <img src="@/assets/img/ruler/down.png" :class="[showValueOptions ? 'active' : '']" @click="showValueOptions = !showValueOptions">
            </div>
            <div :class="['wrapper diff', showValueOptions ? 'active' : '']">
              <div class="item">
                <div class="text">字号</div>
                <div class="input-wrapper">
                  <input class="mini" type="text" v-model="textFontSize" />
                  <div class="actions">
                    <div class="action" @click="changeTextFontSize(1)">
                      <img src="@/assets/img/ruler/plus.png">
                    </div>
                    <div class="action" @click="changeTextFontSize(-1)">
                      <img src="@/assets/img/ruler/minus.png">
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="text">字体颜色</div>
                <el-color-picker size="mini" v-model="textColor" color-format="rgb"/>
              </div>
              <div class="item">
                <div class="text">精密度小数位数</div>
                <div class="input-wrapper">
                  <input class="mini" type="text" v-model="toFixed" />
                  <div class="actions">
                    <div class="action" @click="changeToFixed(1)">
                      <img src="@/assets/img/ruler/plus.png">
                    </div>
                    <div class="action" @click="changeToFixed(-1)">
                      <img src="@/assets/img/ruler/minus.png">
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="text">上、下限数值区间</div>
                <div class="input-wrapper">
                  <input class="small" type="text" v-model="minValue" @change="changeMinValue"/>
                  <span>&nbsp;&nbsp;─&nbsp;&nbsp;</span>
                  <input class="small" type="text" v-model="maxValue" @change="changeMaxValue"/>
                </div>
              </div>
            </div>
          </div>
          <div class="option-item">
            <div class="type">
              <el-checkbox v-model="fillColor">填色</el-checkbox>
              <!-- <img src="@/assets/img/ruler/down.png" :class="[showColorOptions ? 'active' : '']" @click="showColorOptions = !showColorOptions"> -->
            </div>
            <!-- <div :class="['wrapper', showColorOptions ? 'active' : '']">
              
            </div> -->
          </div>
          <div class="option-item">
            <div class="type">
              <el-checkbox v-model="strokeLine">等势线</el-checkbox>
              <img src="@/assets/img/ruler/down.png" :class="[showStokeOptions ? 'active' : '']" @click="showStokeOptions = !showStokeOptions">
            </div>
            <div :class="['wrapper', showStokeOptions ? 'active' : '']">
              <div class="item">
                <div class="text">颜色设置</div>
                <el-color-picker size="mini" v-model="lineColor" color-format="rgb"/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div class="text">线宽设置</div>
                <div class="input-wrapper">
                  <input class="mini" type="text" v-model="lineWidth" />
                  <div class="actions">
                    <div class="action" @click="changeLineWidth(1)">
                      <img src="@/assets/img/ruler/plus.png">
                    </div>
                    <div class="action" @click="changeLineWidth(-1)">
                      <img src="@/assets/img/ruler/minus.png">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      
    </div>
  </div>
</template>

<script>
  import { initMap, generateSource, param } from '@/assets/js/ruler'
  const { clip, showValue, fillColor, strokeLine, textColor, textFontSize, maxValue, minValue, toFixed, lineColor, lineWidth } = param
  export default {
    props: ['title'],
    data () {
      return {
        clip,
        showValue,
        fillColor,
        textColor,
        textFontSize,
        maxValue,
        minValue,
        toFixed,
        strokeLine,
        lineColor,
        lineWidth,
        showValueOptions: false,
        showColorOptions: false,
        showStokeOptions: false,
        showLayerOptions: false
      }
    },
    watch: {
      clip (val) {
        this.$emit('toggleClip', val)
      },
      showValue (val) {
        this.$emit('toggleValue', val)
      },
      fillColor (val) {
        this.$emit('toggleFillColor', val)
      },
      strokeLine (val) {
        this.$emit('toggleStrokeLine', val)
      },
      textFontSize (val) {
        this.$emit('changeTextFontSize', val)
      },
      toFixed (val) {
        this.$emit('changeToFixed', val)
      },
      textColor (val) {
        this.$emit('changeTextColor', val)
      },
      lineWidth (val) {
        this.$emit('changeLineWidth', val)
      },
      lineColor (val) {
        this.$emit('changeLineColor', val)
      }
    },
    mounted () {
      initMap('map')
      vm.$off('renderMap')
      vm.$on('renderMap', (params, center) => {
        generateSource(params, center)
      })
      vm.$off('alertError')
      vm.$on('alertError', res => {
        this.$message.error(res)
      })
    },
    methods: {
      changeToFixed (d) {
        if (this.toFixed + d <= -1) {
          return
        }
        this.toFixed += d
      },
      changeTextFontSize (d) {
        if (this.textFontSize + d <= 0) {
          return
        }
        this.textFontSize += d
      },
      changeLineWidth (d) {
        if (this.lineWidth + d <= 0) {
          return
        }
        this.lineWidth += d
      },
      changeMaxValue () {
        this.$emit('changeMaxValue', this.maxValue)
      },
      changeMinValue () {
        this.$emit('changeMinValue', this.minValue)
      }
    }
  }
</script>

<style scoped lang="stylus">
  input
    outline none
    height 24px
    text-align center
    font-size 12px
    border 1px solid #e5e5e5
    &.mini
      width 32px
    &.small
      width 50px
  #map
    flex 1
    position relative
    .title
      position absolute
      background-color rgb(255, 255, 255)
      box-shadow 0px 1px 5px 0px rgba(153, 153, 153, 0.5)
      left 20px
      top 20px
      line-height 35px
      text-align center
      font-size 14px
      padding 0 15px
      z-index 2
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
        height 100%
        span
          color #fff
          margin-left 5px
      .options
        width 300px
        padding 10px
        position absolute
        top 0px
        right 0px
        background-color rgb(255, 255, 255)
        box-shadow 0px 1px 5px 0px rgba(153, 153, 153, 0.5)
        z-index 3
        .style-title
          display flex
          align-items center
          justify-content space-between
          .text
            display flex
            align-items center
            span
              color #666666
              margin-left 5px
          .close
            cursor pointer
        .option-item
          margin-top 10px
          border 1px solid rgb(204, 204, 204)
          .type
            padding 6px 10px
            display flex
            justify-content space-between
            align-items center
            img
              cursor pointer
              padding 4px
              transition all 0.2s linear
              &.active
                transform rotate(-180deg)
          .wrapper
            height 0 
            transition height 0.1s ease-in
            overflow hidden
            padding 0 10px
            .item
              height 24px
              display flex
              align-items center
              margin-top 10px
              .text
                margin-right 10px
              .input-wrapper
                display flex
                align-items center
                .actions
                  height 24px
                  display flex
                  flex-direction column
                  justify-content center
                  border 1px solid #e5e5e5
                  border-left none
                  background-color rgb(238, 238, 238)
                  .action
                    width 12px
                    flex 1
                    display flex
                    align-items center
                    justify-content center
                    cursor pointer
                    &:first-child
                      border-bottom 1px solid #e5e5e5

            &.diff
              transition height 0.2s ease-in
            &.active
              height 44px
              transition height 0.1s ease-out
            &.diff.active
              height 146px
              transition height 0.2s ease-out


</style>
<style lang="stylus">
  .layers
    .el-checkbox__inner
      border-radius 0px
    .el-checkbox__label
      font-size 12px
      padding-left 5px
      color #000
</style>