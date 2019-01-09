<template>
  <div class="file">
    <m-title>
      <div class="title">
        <span class="text">最新报文下载</span>
      </div>
      <div class="title-btns">
        <router-link class="file-btn" to="">
          <img src="@/assets/img/county/explain.png">
          <span>报文格式说明</span>
        </router-link>
      </div>
    </m-title>
    <div class="table-wrapper">
      <table>
        <tr v-for="(file, index) in files" :key="index">
          <td>{{ fileDate(file.CreateTime) }}</td>
          <td>{{ parseInt(Number(file.FileSize) / 1024) }}K</td>
          <td><a target="_blank" :href="fileUrl(file.FileName)">{{ file.FileName }}</a></td>
        </tr>
      </table>
    </div>
    <div class="explain">
      <span>*</span> 城镇报会不定期反复更新，请使用最新文件
    </div>
  </div>
</template>

<script>
  import MTitle from './Title'
  import { format, dateFromString } from '@/assets/js/dateFmt'
  export default {
    data () {
      return {
        files: []
      }
    },
    components: {
      MTitle
    },
    mounted () {
      this.getFile()
    },
    methods: {
      getFile () {
        this.$axios.post('town/postFile')
          .then(res => {
            this.files = res.data.data
          })
      },
      fileDate (datetime) {
        return format(dateFromString(datetime, 'yyyy-mm-dd HH:MM:SS'), 'yyyy/mm/dd HH:MM')
      },
      fileUrl (filename) {
        const fileTime =  dateFromString(filename.substring(41,49), 'yyyymmdd')
        return `http://10.139.242.102/ruler/CityFcst/${format(fileTime, 'yyyy.mm')}/${format(fileTime, 'yyyymmdd')}/${filename}`
      }
    }
  }
</script>

<style scoped lang="stylus">
  .file
    margin-top 15px
    .table-wrapper
      width 100%
      table
        width 100%
        border-collapse collapse
        tr
          border-left 1px solid rgb(229, 229, 229)
          border-right 1px solid rgb(229, 229, 229)
          border-bottom 1px solid rgb(229, 229, 229)
          &:nth-child(odd)
            background-color rgb(245, 245, 245)
          td
            height 38px
            line-height 38px
            font-size 12px
            border-top 1px solid rgb(229, 229, 229)
            text-align center
            &:nth-child(1)
              width 18%
            &:nth-child(2)
              width 15%
            &:nth-child(3)
              width 67%
              a
                color rgb(0, 0, 238)
    .explain
      color red
      line-height 30px
      font-size 12px
      span
        position relative
        top 2px
        color red
</style>