<template>
  <div class="data">
    <week-fcst />
    <file />
    <observer />
    <process />
  </div>
</template>

<script>
  import MTitle from './Title'
  import WeekFcst from './WeekFcst'
  import File from './File'
  import Observer from './Observer'
  import Process from './Process'
  export default {
    components: {
      MTitle,
      WeekFcst,
      File,
      Observer,
      Process
    }
  }
</script>

<style scoped lang="stylus">
  .data
    flex 1       
</style>