<template>
  <div class="app-container">
    <el-header>
      <div style="width:100%;position: fixed !important;top: 0;left: 0;z-index:9999">
        <el-page-header
          @back="goBack"
        >
          <span slot="content" style="color: #fff">详情页面</span>
          <span slot="title">返回</span>
        </el-page-header>
      </div>
    </el-header>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-cpu"></i>JS报错统计</span>
      </div>
      <div ref="jsError" class="bar-chart"></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>JS报错 window.onerror</span>
      </div>
      <div class="infinite-list-wrapper" style="overflow:auto;height: 400px">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
          <li v-for="item in this.jsErrorList" class="list-item">
            <i class="el-icon-error" style="color: red"></i>
            {{item.msg}}
          </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "index",
  data() {
    return {
      activeName: 'first',
      count:8,
      loading:false,
    }
  },
  mounted() {
    this.getDate()
    this.showCharts()
  },
  methods:{
    getDate(){
      this.$store.dispatch('error/getError')
    },
    goBack() {
      this.$router.back()
    },
    load(){
      this.loading = true
      setTimeout(()=>{
        this.count += 2
        this.loading = false
      },2000)
    },
    showCharts(){
      const jsError = this.$echarts.init(this.$refs.jsError)
      jsError.setOption({
        xAxis: {
          type: 'category',
          data: this.timeData_1,
          axisLabel:{
            formatter:function (params){
              return params.replace('T','日') + ':00'
            }
          }
        },
        yAxis: {
          type: 'value',
          name:'次数'
        },
        tooltip:{
          trigger: 'axis',
          axisPointer:{
            type:'shadow' // line 或 shadow
          }
        },
        grid:{
          x:30,
          x2:20,
          y:30,
          y2:30
        },
        series: [
          {
            data: this.timeList_1,
            type: 'bar',
            showBackground: true,
            barWidth:20,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      })
    },
  },
  computed:{
    ...mapState('error',['errors']),
    noMore(){
      return this.count >= 20
    },
    disabled(){
      return this.loading || this.noMore
    },
    jsErrorList(){
      let result = []
      this.errors.forEach(item => {
        if(item.type === 0 || item.type === 1){
          result.push(item)
        }
      })
      return result
    },
    timeData_1(){
      let result = []
      this.jsErrorList.forEach(item => {
        if(result.indexOf(item.time.substring(8,13)) === -1){
          result.push(item.time.substring(8,13))
        }
      })
      return result
    },
    timeList_1(){
      let result = new Array(this.timeData_1.length).fill(0)
      this.jsErrorList.forEach(item => {
        result[this.timeData_1.indexOf(item.time.substring(8,13))] ++
      })
      return result
    },
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
  margin-bottom: 10px;
}
.el-page-header {
  padding: 10px 20px;
  color: #fff;
  background-color: #2f4256;
}
.bar-chart {
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #ccc;
}
.list .list-item{
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
}
.list .list-item:nth-child(odd) {
  background-color: #f6f6f6;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
