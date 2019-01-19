<template>
  <div class="file">
    <div class="wrapper">
      <div class="left" id="sidebar">
        <div class="nav">
          决策服务指引
        </div>
        <div class="nav">
          气象呈文件
        </div>
      </div>
      <div class="right">
        <div class="bg"></div>
        <div class="file-list">
          <div class="item">
            <div class="name">
              便函文180522附件1：全国智能网格气象预报业务产品城镇天气现象、风速风向生成规范
            </div>
            <div class="download">
              <div class="text">
                下载
              </div>
              <div class="icon"></div>
            </div>
          </div>
          <div class="item">
            <div class="name">
              便函文180522附件1：全国智能网格气象预报业务产品城镇天气现象、风速风向生成规范
            </div>
            <div class="download">
              <div class="text">
                下载
              </div>
              <div class="icon"></div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="stylus">
  .file
    display flex
    min-height 690px
    height calc(100vh - 60px)
    position relative
    .wrapper
      width 1400px
      margin 0 auto
      position relative
      height 100%
      .left
        float left
        padding-top 50px
        padding-right 25px
        padding-bottom 1px
        height 100%
      #sidebar
        background #f5f5f5
        padding-left 200%
        margin-left -200%
        border-right 1px solid #eeeeee
        .nav
          width 220px
          height 40px
          border 1px solid #e5e5e5
          font-size 14px
          text-indent 20px
          line-height 38px
          margin-bottom 10px
          &:hover, &.active
            color #ffffff
            background-color #0066cc
            border 1px solid #0066cc
            cursor pointer

      .right
        float none
        width 1160px
        margin-left 245px
        padding-top 50px
        padding-left 100px
        height 100%
        .bg
          width 1060px
          height 120px
          background-image url(/img/policy/doc_bg.png)
        .file-list
          padding-top 17px
          padding-bottom 50px
          height 567px
          .item
            display flex
            justify-content space-between
            align-items center
            height 30px
            margin-top 20px
            .download
              display flex
              .text, .icon
                height 30px
              .icon
                width 30px
                background-color #eeeeee
                background-image url(/img/policy/download_gray.png)
                background-repeat no-repeat
                background-position center
              .text
                background-color #f5f5f5
                font-size 12px
                width 49px
                text-align center
                line-height 30px
            &:hover
              .name
                color #0066cc
              .download
                cursor pointer
                .text
                  background-color #0080ff
                  color #fff
                .icon
                  background-color #0066cc
                  background-image url('/img/policy/download_white.png')

        .pagination
          display flex
          justify-content center
</style>
<style>
  .el-pagination.is-background .el-pager li {
    border-radius: 0px;
    font-weight: normal;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0066cc;
  }
  .el-pagination.is-background .el-pager li:not(.active):hover {
    color: #0066cc;
  }
</style>