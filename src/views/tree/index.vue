<template>
  <div class="app-container">
    <div class="sort-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            网站访问量Top 10
            <el-tooltip class="item" effect="dark" content="统计网站的访问数量" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="bar-chart" ref="traffic"></div>
      </el-card>
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          来源网站Top 10
          <el-tooltip class="item" effect="dark" content="统计不同来源的网站数量" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
          </el-tooltip>
        </span>
      </div>
        <div class="bar-chart" ref="source"></div>
    </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            城市名称访问用户量Top 10
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">在不同城市使用App的用户量分布情况。<br>ps: 城市是根据ip地址查询出来的，并不是<br>每个ip都能查询出来，查询出来的结果也未<br>必准确，只作为趋势参考。</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="bar-chart" ref="city"></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            设备型号用户量Top 10
            <el-tooltip class="item" effect="dark" content="不同设备型号的用户量分布情况" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="bar-chart" ref="equipment"></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            系统版本用户量Top 10
            <el-tooltip class="item" effect="dark" content="不同设备型号的用户量分布情况" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="bar-chart" ref="system_version"></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            浏览器使用量Top 10
            <el-tooltip class="item" effect="dark" content="数值代表使用的浏览器的数量" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="bar-chart" ref="browser"></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            设备分辨率量Top 10
            <el-tooltip class="item" effect="dark" content="数值代表设备的物理分辨率" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="bar-chart" ref="resolution"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.showCharts()
  },
  watch: {

  },
  methods: {
    showCharts(){
      const traffic = this.$echarts.init(this.$refs.traffic)
      const source = this.$echarts.init(this.$refs.source)
      const city = this.$echarts.init(this.$refs.city)
      const equipment = this.$echarts.init(this.$refs.equipment)
      const system_version = this.$echarts.init(this.$refs.system_version)
      const browser = this.$echarts.init(this.$refs.browser)
      const resolution = this.$echarts.init(this.$refs.resolution)

      traffic.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          top:'3%',
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          position:'top',
          axisLabel:{
            formatter:function(value){
              return parseInt(value/10000) + 'w';
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['https://xxx.xxx.xxx', 'https://xxx.xxx.xxx', 'https://xxx.xxx.xxx', 'https://xxx.xxx.xxx', 'https://xxx.xxx.xxx', 'https://xxx.xxx.xxx']
        },
        series: [
          {
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          }
        ]
      })
      source.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          top:'3%',
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          position:'top',
          axisLabel:{
            formatter:function(value){
              return parseInt(value/10000) + 'w';
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['www.xxx.xxx','www.xxx.xxx','www.xxx.xxx','www.xxx.xxx','www.xxx.xxx','www.xxx.xxx']
        },
        series: [
          {
            type: 'bar',
            data: [18293, 23419, 20034, 104970, 317144, 230230]
          }
        ]
      })
      city.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          top:'3%',
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          position:'top',
          axisLabel:{
            formatter:function(value){
              return parseInt(value/1000) + 'k';
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['北京', '上海', '广州', '深圳', '西安', '成都']
        },
        series: [
          {
            type: 'bar',
            data: [1803, 2489, 2934, 10490, 13174, 23230]
          }
        ]
      })
      equipment.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          top:'3%',
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          position:'top',
          axisLabel:{
            formatter:function(value){
              if(value < 1000){
                return value
              }
              return (value/1000).toFixed(1) + 'k';
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['iphone 6/7/8 Plus', 'iphone 6/7/8', 'vivo X21A', 'OPPO R11', 'HUWEI P40', 'PACM00']
        },
        series: [
          {
            type: 'bar',
            data: [183, 289, 294, 970, 1344, 630]
          }
        ]
      })
      system_version.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          top:'3%',
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          position:'top',
          axisLabel:{
            formatter:function(value){
              return parseInt(value/10000) + 'w';
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['web', 'android 6.0.1', 'ios 9.1', 'ios 10.1', 'ios 13.2.3', 'android 5.0']
        },
        series: [
          {
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 330230]
          }
        ]
      })
      browser.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          top:'3%',
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          position:'top',
          axisLabel:{
            formatter:function(value){
              return parseInt(value/10000) + 'w';
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['chrome', '未知', 'safari', 'firefox', 'msie 7.0', 'edge']
        },
        series: [
          {
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          }
        ]
      })
      resolution.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          top:'3%',
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          position:'top',
          axisLabel:{
            formatter:function(value){
              return parseInt(value/10000) + 'w';
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['1920x1080', '1280x800', '1792x1120', '1366x768', '800x600', '2560x1440']
        },
        series: [
          {
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
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

.box-card {
  width: 415px;
  margin-bottom: 10px;
}
.sort-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.bar-chart {
  width: 100%;
  height: 200px;
}
</style>

