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
        <h1>158.91ms</h1>
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
        <h1>2.74s</h1>
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
          :data="tableData"
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
            label="平均耗时"
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
        <h1>263</h1>
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
        <h1>2214.15ms</h1>
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
        <h1>100%</h1>
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
    this.showCharts()
  },
  methods:{
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
              { value: 1048, name: '< 1秒' },
              { value: 735, name: '1-5秒' },
              { value: 580, name: '5-10秒' },
              { value: 484, name: '10-30秒' },
              { value: 300, name: '> 30秒' }
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
              { value: 148, name: '< 1秒' },
              { value: 7, name: '1-5秒' },
              { value: 5, name: '5-10秒' },
              { value: 8, name: '10-30秒' },
              { value: 3, name: '> 30秒' }
            ]
          }
        ]
      })
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
