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
  <div class="box">
    <el-card class="map">
      <div slot="header" class="clearfix">
        <span>用户地域分布图</span>
      </div>
      <div class="map-chart" ref="map"></div>
    </el-card>
    <el-card class="list">
      <div slot="header" class="clearfix">
        <span>访问用户城市分布TOP榜</span>
      </div>
      <el-table
        :data="this.areaSortList"
        stripe
        height="500"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="排名"
          width="130">
        </el-table-column>
        <el-table-column
          prop="name"
          label="城市"
          width="130">
        </el-table-column>
        <el-table-column
          prop="value"
          label="用户数">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</div>
</template>

<script>
import '@/assets/js/china'
import {mapState} from "vuex";
export default {
  name:'index',
  data() {
    return {
      time:'',
      pickerDisabled: {
        disabledDate: (time) => {
          return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
        }
      },
    }
  },
  mounted() {
    this.getDate()
    this.showCharts()
  },
  methods:{
    getDate(){
      this.$store.dispatch('users/getUsers')
    },
    showCharts(){
      const map = this.$echarts.init(this.$refs.map)

      map.setOption({
        tooltip : {//提示框组件。
          trigger: 'item', //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          // 自定义鼠标悬停展示内容
          formatter:function (params){
            return `${params.data.name} : ${params.data.value}`
          }
        },
        legend: {
          orient: 'horizontal',//图例的排列方向
          x:'left',//图例的位置
        },

        visualMap: {//颜色的设置
          x: 'left',
          y: 'center',
          splitList: [
            {start: 1500},
            {start: 900, end: 1500},
            {start: 310, end: 1000},
            {start: 200, end: 300},
            {start: 10, end: 200},
            {start: 5, end: 5},
            {end: 10}
          ],
          text:['高','低'],// 文本，默认为数值文本
          color: ['#3F6993','#759CC9','#D9F3FF']
        },
        toolbox: {//工具栏
          show: true,
          orient : 'vertical',//工具栏 icon 的布局朝向
          x: 'right',
          y: 'center',
        },
        series : [
          {
            type: 'map',
            mapType: 'china',
            showLegendSymbol:false, // 不显示小点
            roam: false,//是否开启鼠标缩放和平移漫游
            itemStyle:{//地图区域的多边形 图形样式
              normal:{//是图形在默认状态下的样式
                label:{
                  show:true,//是否显示标签
                  textStyle: {
                    color: "rgb(249, 249, 249)"
                  }
                }
              },
              emphasis:{//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                label:{show:true}
              }
            },
            top:"3%",//组件距离容器的距离
            data:this.areaList
          }
        ]
      })
    },
  },
  computed:{
    ...mapState('users',['users']),
    areaList(){
      let result = [
        {name: '北京',value: 0},
        {name: '天津',value: 0},
        {name: '上海',value: 0},
        {name: '重庆',value: 0},
        {name: '河北',value: 0},
        {name: '河南',value: 0},
        {name: '云南',value: 0},
        {name: '辽宁',value: 0},
        {name: '黑龙江',value: 0},
        {name: '湖南',value: 0},
        {name: '安徽',value: 0},
        {name: '山东',value: 0},
        {name: '新疆',value: 0},
        {name: '江苏',value: 0},
        {name: '浙江',value: 0},
        {name: '江西',value: 0},
        {name: '湖北',value: 0},
        {name: '广西',value: 0},
        {name: '甘肃',value: 0},
        {name: '山西',value: 0},
        {name: '内蒙古',value: 0},
        {name: '陕西',value: 0},
        {name: '吉林',value: 0},
        {name: '福建',value: 0},
        {name: '贵州',value: 0},
        {name: '广东',value: 0},
        {name: '青海',value: 0},
        {name: '西藏',value: 0},
        {name: '四川',value: 0},
        {name: '宁夏',value: 0},
        {name: '海南',value: 0},
        {name: '台湾',value: 0},
        {name: '香港',value: 0},
        {name: '澳门',value: 0}
      ]
      let reg = /省|市|自治区|自治州|县|区/g
      this.users.forEach(item => {
        if(result.find(val => val.name === item.userarea.replace(reg,'')) === undefined){
          result.push({
            name:item.userarea.replace(reg,''),
            value:1,
            id:result.length + 1,
          })
        }else{
          result.forEach(val => {
            if(val.name === item.userarea.replace(reg,'')){
              val.value ++
            }
          })
        }
      })
      return result
    },
    areaSortList(){
      let result = this.areaList.sort((a,b) => {
        return b.value - a.value
      })
      result.forEach((item,index) => {
        item.id = index+1
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
.box {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.map {
  width: 65%;
}
.list {
  width: 34%;
}
.map-chart {
  width: 100%;
  height: 500px;
}
.block {
  float: right;
  margin-bottom: 10px;
}
</style>
