<template>
  <div class="app-container">
    <div class="title-box">
      <span class="title">页面性能</span>
      <div class="block">
        <el-date-picker
          v-model="time"
          type="date"
          placeholder="筛选时间"
          style="width: 150px"
          :picker-options="pickerDisabled">
        </el-date-picker>
      </div>
    </div>
    <div class="sort-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            TTFB平均时间
            <el-tooltip class="item" effect="dark" content="发起请求到第一个字节到达的时间，涉及DNS,TCP等" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <h1>{{ttfb}}ms</h1>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            Dom解析时间
            <el-tooltip class="item" effect="dark" content="Dom解析完成的时间，反映出DOM的复杂度" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <h1>2.58ms</h1>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            页面平均加载时间
            <el-tooltip class="item" effect="dark" content="页面加载完成时的总时间" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <h1>{{allrt}}s</h1>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            页面加载耗时分段数量占比
          </span>
        </div>
        <div class="pie-chart" ref="request_time"></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            页面加载耗时路由Top10
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">这里只统计首次加载页面的耗时，单页<br>应用(SPA)首次加载后，应用内切换路由<br>是不会统计加载耗时的。</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <el-table
          :data="this.routerList"
          stripe
          style="width: 100%"
          :row-style="{height:'35px'}"
          :cell-style="{padding:'0'}">
          <el-table-column
            prop="router"
            label="页面路由">
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量"
            width="150">
          </el-table-column>
          <el-table-column
            prop="average_time"
            label="平均耗时(ms)"
            width="150">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="title-box">
      <span class="title">接口性能</span>
    </div>
    <div class="sort-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            接口请求总量
            <el-tooltip class="item" effect="dark" content="发起请求的总数量" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <h1>{{Math.floor(Math.random()*500)}}</h1>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            接口请求平均耗时
            <el-tooltip class="item" effect="dark" content="取24小时的平均值" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <h1>{{(Math.random()*2500).toFixed(2)}}ms</h1>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            接口请求成功率
            <el-tooltip class="item" effect="dark" content="请求成功数 / 请求总数" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <h1>{{Math.floor(Math.random()*100)}}%</h1>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            接口请求耗时分段数量占比
          </span>
        </div>
        <div class="pie-chart" ref="request_num"></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            接口请求耗时Top10
          </span>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :row-style="{height:'35px'}"
          :cell-style="{padding:'0'}">
          <el-table-column
            prop="router"
            label="接口地址">
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量"
            width="150">
          </el-table-column>
          <el-table-column
            prop="average_time"
            label="平均耗时"
            width="150">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "index",
  data() {
    return {
      time:'',
      pickerDisabled: {
        disabledDate: (time) => {
          return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
        }
      },
      tableData: [{
        router: 'https://www.xxxxx.xxx',
        num: '6.62万',
        average_time: '3.96s'
      },{
        router: 'https://www.xxxxx.xxx/xxxx.xxxx',
        num: '65.53万',
        average_time: '1.38s'
      },{
        router: 'https://www.xxxxx.xxx/xxxx.xxxx',
        num: '3.12万',
        average_time: '1.57s'
      },{
        router: 'https://www.xxxxx.xxx/xxxx.xxxx',
        num: '2.05万',
        average_time: '938.1ms'
      },{
        router: 'https://www.xxxxx.xxx/xxxx.xxxx',
        num: '1.55万',
        average_time: '646.93ms'
      },{
        router: 'https://www.xxxxx.xxx/xxxx.xxxx',
        num: '1.15万',
        average_time: '774.55s'
      },{
        router: 'https://www.xxxxx.xxx/xxxx.xxxx#xxxxx',
        num: '8.45千',
        average_time: '565.88ms'
      },{
        router: 'https://www.xxxxx.xxx/xxxx.xxxx#xxxxx',
        num: '2.35千',
        average_time: '845.5ms'
      },{
        router: 'https://www.xxxxx.xxx/xxxx.xxxx#xxxxx',
        num: '234',
        average_time: '994.5ms'
      },{
        router: 'https://www.xxxxx.xxx/xxxx.xxxx',
        num: '222',
        average_time: '50ms'
      },]
    }
  },
  mounted() {
    this.getDate()
    this.showCharts()
  },
  methods:{
    getDate(){
      this.$store.dispatch('performance/getPerformance')
    },
    showCharts(){
      const request_time = this.$echarts.init(this.$refs.request_time)
      const request_num = this.$echarts.init(this.$refs.request_num)

      request_time.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '5%',
          left: 'center'
        },
        grid:{
          top:'3%',
          left: '2%',
          right: '4%',
          bottom: '3%',
        },
        color:['#29c989','#4392e8','#7a79ff','#ff9724','#ff4f5c'],
        series: [
          {
            name: '耗时分段',
            type: 'pie',
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.timeList[0], name: '< 1秒' },
              { value: this.timeList[1], name: '1-5秒' },
              { value: this.timeList[2], name: '5-10秒' },
              { value: this.timeList[3], name: '10-30秒' },
              { value: this.timeList[4], name: '> 30秒' }
            ]
          }
        ]
      })
      request_num.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '5%',
          left: 'center'
        },
        grid:{
          top:'3%',
          left: '2%',
          right: '4%',
          bottom: '3%',
        },
        color:['#29c989','#4392e8','#7a79ff','#ff9724','#ff4f5c'],
        series: [
          {
            name: '耗时分段',
            type: 'pie',
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: Math.floor(Math.random()*300), name: '< 1秒' },
              { value: Math.floor(Math.random()*10), name: '1-5秒' },
              { value: Math.floor(Math.random()*5), name: '5-10秒' },
              { value: Math.floor(Math.random()*10), name: '10-30秒' },
              { value: Math.floor(Math.random()*5), name: '> 30秒' }
            ]
          }
        ]
      })
    }
  },
  computed:{
    ...mapState('performance',['performance']),
    ttfb(){
      let sum = 0
      let num = 0
      this.performance.forEach(item => {
        if(item.type === 4){
          num++
          sum += item.value
        }
      })
      return (sum/num).toFixed(2)
    },
    allrt(){
      let sum = 0
      let num = 0
      this.performance.forEach(item => {
        if(item.type === 3){
          num++
          sum += item.value
        }
      })
      return (sum/num).toFixed(2)
    },
    routerList(){
      let result = []
      this.performance.forEach(item => {
        if(result.find(val => val.router === item.url) === undefined){
          result.push({
            router:item.url,
            num:1,
            sum_time:item.value
          })
        }else{
          result.forEach(val => {
            if(val.router === item.url){
              val.num++
              val.sum_time += item.value
            }
          })
        }
      })
      result.forEach(item => {
        item.average_time = (item.sum_time/item.num).toFixed(2)
      })
      return result
    },
    timeList(){
      let result = new Array(5).fill(0)
      this.performance.forEach(value => {
        if(value.value < 1000){
          result[0] ++
        }else if(value.value < 5000){
          result[1] ++
        }else if(value.value < 10000){
          result[2] ++
        }else if(value.value < 30000){
          result[3] ++
        }else {
          result[4] ++
        }
      })
      return result
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
.sort-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.box-card {
  width: 33%;
  margin-bottom: 10px;
}
.sort-box .box-card:nth-child(4) {
  width: 44%;
}
.sort-box .box-card:nth-child(5) {
  width: 55%;
}
.block {
  float: right;
  margin-bottom: 10px;
}
.title-box {
  height: 50px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
}
.pie-chart {
  width: 100%;
  height: 350px;
}
</style>
