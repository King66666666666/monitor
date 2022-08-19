<template>
  <div class="app-container">
    <div class="title-box">
      <span class="title">健康数据</span>
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
    <el-card class="error-view" :body-style="{display:'flex',justifyContent:'space-between'}">
      <div class="score-box">
        <el-progress
          type="circle"
          :percentage="score"
          :width="150"
          :stroke-width="10"
          :color="colors"
          :show-text="false">
        </el-progress>
        <div class="circleCenter">
          <div class="score" :class="{'error-color':score < 60,'warn-color':score >= 60 && score < 80,'great-color':score >= 80 && score <= 100}">{{this.score}}</div>
          <span>健康状况</span>
        </div>
        <div class="score-describe" :class="{'error-backgroundColor':score < 60,'warn-backgroundColor':score >= 60 && score < 80,'great-backgroundColor':score >= 80 && score <= 100}">{{this.scoreDescribe}}</div>
      </div>
      <div class="error-sort">
        <div class="item">
          <el-progress type="circle" :percentage="9.7" :width="80"></el-progress>
          <div class="error-title">JS错误</div>
        </div>
        <div class="item">
          <el-progress type="circle" :percentage="3.9" :width="80"></el-progress>
          <div class="error-title">自定义异常</div>
        </div>
        <div class="item">
          <el-progress type="circle" :percentage="19" :width="80"></el-progress>
          <div class="error-title">静态资源异常</div>
        </div>
        <div class="item">
          <el-progress type="circle" :percentage="16.2" :width="80"></el-progress>
          <div class="error-title">接口异常</div>
        </div>
      </div>
    </el-card>
    <div class="error-box">
      <el-card class="error-card">
        <div slot="header" class="clearfix">
          <span style="cursor: pointer" @click="toJsError">
            JS报错趋势 <i class="el-icon-arrow-right"></i>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">程序运行时出错，使用<br>window.onerror进行异常捕获并上报</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="jsError"></div>
      </el-card>
      <el-card class="error-card">
        <div slot="header" class="clearfix">
          <span style="cursor: pointer" @click="toCustomError">
            自定义异常趋势 <i class="el-icon-arrow-right"></i>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">用户自定义报错，console.error打印<br>的错误均视为自定义错误</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="customError"></div>
      </el-card>
      <el-card class="error-card">
        <div slot="header" class="clearfix">
          <span style="cursor: pointer" @click="toStaticError">
            静态资源加载报错 <i class="el-icon-arrow-right"></i>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">静态资源加载失败的数量统计</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="staticError"></div>
      </el-card>
      <el-card class="error-card">
        <div slot="header" class="clearfix">
          <span style="cursor: pointer" @click="toRequestError">
            接口请求报错 <i class="el-icon-arrow-right"></i>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">接口请求发生400,500等状态的报错数量</div>
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="line-chart" ref="requestError"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time:'',
      pickerDisabled: {
        disabledDate: (time) => {
          return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
        }
      },
      score:Math.ceil(Math.random()*100),
      colors:[
        {color: '#f56c6c', percentage: 60},
        {color: '#e6a23c', percentage: 80},
        {color: '#11ce66', percentage: 100},
      ],
    }
  },
  mounted() {
    this.showCharts()
  },
  methods: {
    showCharts(){
      const jsError = this.$echarts.init(this.$refs.jsError)
      const customError = this.$echarts.init(this.$refs.customError)
      const staticError = this.$echarts.init(this.$refs.staticError)
      const requestError = this.$echarts.init(this.$refs.requestError)

      jsError.setOption({
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
      customError.setOption({
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
      staticError.setOption({
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
      requestError.setOption({
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
    },
    toJsError(){
      this.$router.push({name: 'JsError'})
    },
    toCustomError(){
      this.$router.push({name: 'CustomError'})
    },
    toStaticError(){
      this.$router.push({name: 'StaticError'})
    },
    toRequestError(){
      this.$router.push({name: 'RequestError'})
    }
  },
  computed:{
    scoreDescribe(){
      if(this.score < 60){
        return '极差'
      }else if(this.score < 70){
        return '差'
      }else if(this.score < 80){
        return '一般'
      }else if(this.score < 90){
        return '良好'
      }else if(this.score <= 100){
        return '极好'
      }else{
        return '未知'
      }
    }
  }
}
</script>

<style scoped>
.title-box {
  height: 50px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
}
.block {
  float: right;
  margin-bottom: 10px;
}
.error-view {
  width: 100%;
}
.score-box {
  position: relative;
  width: 400px;
  text-align: center;
  border-right: 1px solid #ccc;
}
.circleCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.score {
  font-weight: 700;
  font-size: 56px;
}
.circleCenter span {
  font-weight: 700;
  font-size: 12px;
}
.error-color {
  color: #f56c6c;
}
.warn-color {
  color: #e6a23c;
}
.great-color {
  color: #11ce66;
}
.score-describe {
  position: absolute;
  top: 10px;
  left: 290px;
  color: #fff;
  padding: 10px 15px;
  border-radius: 13px 13px 13px 0;
}
.error-backgroundColor {
  background-color: #f56c6c;
}
.warn-backgroundColor {
  background-color: #e6a23c;
}
.great-backgroundColor {
  background-color: #11ce66;
}
.error-sort {
  display: flex;
  justify-content: space-around;
  width: 880px;
  padding-top: 30px;
}
.item {
  text-align: center;
}
.error-title {
  margin-top: 10px;
  font-size: 14px;
}
.error-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.error-card {
  width: 33%;
  margin-top: 10px;
}
.line-chart {
  height: 300px;
}
</style>

