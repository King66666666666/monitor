<template>
  <div class="app-container">
    <el-header>
      <div style="width:100%;z-index:9999;position: fixed !important;top: 0;left: 0;">
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
        <span><i class="el-icon-s-order"></i>自定义报错统计</span>
      </div>
      <div ref="customError" class="bar-chart"></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>自定义异常 console.error</span>
      </div>
      <div class="infinite-list-wrapper" style="overflow:auto;height: 400px">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
          <li v-for="i in count" class="list-item">
            <i class="el-icon-error" style="color: red"></i>
            xxx Error{{i}}
          </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </el-card>
  </div>
</template>

<script>
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
    this.showCharts()
  },
  methods:{
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
      const customError = this.$echarts.init(this.$refs.customError)
      customError.setOption({
        xAxis: {
          type: 'category',
          data: ['01', '02', '03', '04', '05', '06', '07','08', '09', '10', '11', '12', '13', '14','01', '02', '03', '04', '05', '06', '07','08', '09', '10', '11', '12', '13', '14']
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
            data: [120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130],
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
    noMore(){
      return this.count >= 20
    },
    disabled(){
      return this.loading || this.noMore
    }
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
