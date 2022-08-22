<template>
  <div class="app-container">
    <div class="block">
      <el-date-picker
        v-model="time"
        type="date"
        placeholder="筛选时间"
        style="width: 150px"
        :picker-options="pickerDisabled">
      </el-date-picker>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>流量数据</span>
      </div>
      <div class="sort-box">
        <div class="item-box">
          <span>浏览量(PV)</span>
          <span>{{this.pv.length}}</span>
          <span>较昨日 <i class="up">16.57%</i> <i class="el-icon-top"></i></span>
        </div>
        <div class="item-box">
          <span>访客数(UV)</span>
          <span>{{ this.uv.length }}</span>
          <span>较昨日 <i class="up">4.78%</i> <i class="el-icon-top"></i></span>
        </div>
        <div class="item-box">
          <span>新访客</span>
          <span>29</span>
          <span>较昨日 <i class="up">18.2%</i> <i class="el-icon-top"></i></span>
        </div>
        <div class="item-box">
          <span>IP数</span>
          <span>{{this.ips.length}}</span>
          <span>较昨日 <i class="up">0.04%</i> <i class="el-icon-top"></i></span>
        </div>
        <div class="item-box">
          <span>频次（人均）</span>
          <span>{{this.frequency}}</span>
          <span>较昨日 <i class="up">11.46%</i> <i class="el-icon-top"></i></span>
        </div>
        <div class="item-box">
          <span>跳出率</span>
          <span>59.05%</span>
          <span>较昨日 <i class="down">24.18%</i> <i class="el-icon-bottom"></i></span>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户量统计</span>
      </div>
      <div ref="users" class="bar-chart"></div>
    </el-card>
    <div class="sort-box">
      <el-card class="box-card small-card">
        <div slot="header" class="clearfix">
          <span>
            页面访问量趋势
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">1. 用户访问一次页面，增加一个PV数据。<br>2. 数量代表展示时段的总和，仅供参考，实际数据请看「今日流量」</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="traffic"></div>
      </el-card>
      <el-card class="box-card small-card">
        <div slot="header" class="clearfix">
          <span>
            用户活跃量趋势
            <el-tooltip class="item" effect="dark" content="这是用户每小时的活跃量数据，这里主要表现变化趋势，并非UV数据，UV数据请看上边。" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="active"></div>
      </el-card>
      <el-card class="box-card small-card">
        <div slot="header" class="clearfix">
          <span>
            新用户活跃量趋势
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">1. 用户清理了缓存数据，下次进来程序也会认为是新访客。<br>2. 数量代表展示时段的总和，仅供参考，实际数据请看「今日流量」</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="newUser"></div>
      </el-card>
      <el-card class="box-card small-card">
        <div slot="header" class="clearfix">
          <span>
            跳出率趋势
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">只访问了入口页面就离开的用户比例。</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="jumpOut"></div>
      </el-card>
      <el-card class="box-card small-card">
        <div slot="header" class="clearfix">
          <span>
            用户平均停留时长
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">只访问了入口页面就离开的用户比例。</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="stayAverage"></div>
      </el-card>
      <el-card class="box-card small-card">
        <div slot="header" class="clearfix">
          <span>
            新用户次日留存率
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">昨天的新用户，到第二天的留存率。<br>（就是第二天的回头客）</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="userKeep"></div>
      </el-card>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  data() {
    return {
      time:'',
      pickerDisabled: {
        disabledDate: (time) => {
          return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
        },
        // 快捷选项
        // shortcuts:[{
        //   text: '今天',
        //   onClick(picker) {
        //     picker.$emit('pick', new Date());
        //   }
        // }]
      },
    }
  },
  mounted() {
    this.getDate()
    this.showCharts()
  },
  methods: {
    getDate(){
      this.$store.dispatch('users/getUsers')
      this.$store.dispatch('behavior/getBehaviors')
    },
    showCharts(){
      const users = this.$echarts.init(this.$refs.users)
      const traffic = this.$echarts.init(this.$refs.traffic)
      const active = this.$echarts.init(this.$refs.active)
      const newUser = this.$echarts.init(this.$refs.newUser)
      const jumpOut = this.$echarts.init(this.$refs.jumpOut)
      const stayAverage = this.$echarts.init(this.$refs.stayAverage)
      const userKeep = this.$echarts.init(this.$refs.userKeep)
      users.setOption({
        xAxis: {
          type: 'category',
          data: this.timeData_1
        },
        yAxis: {
          type: 'value'
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
          y:20,
          y2:30
        },
        series: [
          {
            data: this.usersOfTime_1,
            type: 'bar',
            showBackground: true,
            barWidth:20,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      })
      traffic.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
          // feature: {
          //   saveAsImage: {} // 保存为图片
          // }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: this.timeData_2,
          axisLabel:{
            formatter:function (params){
              return params.replace('T','日') + ':00'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisPointer: {
            snap: true
          }
        },
        grid:{
          x:30,
          y:10,
          x2:10,
          y2:30
        },
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: this.usersOfTime_2,
          }
        ]
      })
      active.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: this.timeData_2,
          axisLabel:{
            formatter:function (params){
              return params.replace('T','日') + ':00'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisPointer: {
            snap: true
          }
        },
        grid:{
          x:30,
          y:10,
          x2:10,
          y2:30
        },
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: this.usersOfTime_3,
          }
        ]
      })
      newUser.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisPointer: {
            snap: true
          }
        },
        grid:{
          x:30,
          y:10,
          x2:10,
          y2:30
        },
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
          }
        ]
      })
      jumpOut.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisPointer: {
            snap: true
          }
        },
        grid:{
          x:30,
          y:10,
          x2:10,
          y2:30
        },
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
          }
        ]
      })
      stayAverage.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisPointer: {
            snap: true
          }
        },
        grid:{
          x:30,
          y:10,
          x2:10,
          y2:30
        },
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
          }
        ]
      })
      userKeep.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisPointer: {
            snap: true
          }
        },
        grid:{
          x:30,
          y:10,
          x2:10,
          y2:30
        },
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
          }
        ]
      })
    }
  },
  computed:{
    ...mapState('behavior',['behaviors']),
    ...mapState('users',['users']),
    nowMonth(){
      return new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
    },
    pv(){
      return this.behaviors.filter((item) => item.type === 1)
    },
    uv(){
      return this.behaviors.filter((item) => item.type === 0)
    },
    ips(){
      let result = []
      this.users.forEach(item => {
        if(result.indexOf(item.userip) === -1){
          result.push(item.userip)
        }
      })
      return result
    },
    frequency(){
      return (this.behaviors.length/this.uv.length).toFixed(2)
    },
    timeData_1(){
      let result = []
      this.uv.forEach(item => {
        if(result.indexOf(item.time.substring(0,10)) === -1){
          result.push(item.time.substring(0,10))
        }
      })
      return result
    },
    timeData_2(){
      let result = []
      this.behaviors.forEach(item => {
        if(item.time.substring(5,7) === this.nowMonth){
          if(result.indexOf(item.time.substring(8,13)) === -1){
            result.push(item.time.substring(8,13))
          }
        }
      })
      return result
    },
    usersOfTime_1(){
      let result = new Array(this.timeData_1.length).fill(0)
      this.uv.forEach(item => {
        result[this.timeData_1.indexOf(item.time.substring(0,10))] ++
      })
      return result
    },
    usersOfTime_2(){
      let result = new Array(this.timeData_2.length).fill(0)
      this.pv.forEach(item => {
        result[this.timeData_2.indexOf(item.time.substring(8,13))] ++
      })
      return result
    },
    usersOfTime_3(){
      let result = new Array(this.timeData_2.length).fill(0)
      this.uv.forEach(item => {
        result[this.timeData_2.indexOf(item.time.substring(8,13))] ++
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

.box-card {
  width: 100%;
  margin-bottom: 10px;
}
.sort-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.small-card {
  width: 415px;
}
.bar-chart {
  width: 100%;
  height: 200px;
}
.line-chart {
  width: 100%;
  height: 250px;
}
.item-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 16.66%;
}
.item-box span:nth-child(1){
  font-size: 14px;
}
.item-box span:nth-child(2){
  font-size: 32px;
  font-weight: 700;
}
.item-box span:nth-child(3){
  font-size: 12px;
}
.el-icon-top {
  font-weight: 700;
  color: forestgreen;
}
.el-icon-bottom {
  font-weight: 700;
  color: red;
}
.up {
  color: forestgreen;
}
.down {
  color: red;
}
.block {
  float: right;
  margin-bottom: 10px;
}
</style>
