<template>
<div class="app-container">
  <div class="block">
    <el-date-picker
      v-model="time"
      type="date"
      placeholder="今天"
      :class="{sma:!time,big:time}">
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
        :data="tableData"
        stripe
        height="500"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="排名"
          width="130">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="130">
        </el-table-column>
        <el-table-column
          prop="users"
          label="用户数">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</div>
</template>

<script>
import '@/assets/js/china'
export default {
  name:'index',
  data() {
    return {
      time:'',
      tableData: [{
        id: '1',
        city: '北京',
        users: 11367
      },{
        id: '2',
        city: '上海',
        users: 20267
      },{
        id: '3',
        city: '浙江',
        users: 17231
      },{
        id: '4',
        city: '湖北',
        users: 4332
      },{
        id: '5',
        city: '广东',
        users: 3167
      },{
        id: '6',
        city: '安徽',
        users: 2267
      },{
        id: '7',
        city: '四川',
        users: 2267
      },{
        id: '8',
        city: '河南',
        users: 2267
      },{
        id: '9',
        city: '福建',
        users: 2267
      },{
        id: '10',
        city: '天津',
        users: 2267
      },{
        id: '11',
        city: '辽宁',
        users: 1167
      },{
        id: '12',
        city: '江苏',
        users: 1167
      },{
        id: '13',
        city: '香港',
        users: 1111
      },{
        id: '14',
        city: '内蒙古',
        users: 533
      },]
    }
  },
  mounted() {
    this.showCharts()
  },
  methods:{
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
          // data:['订单量']
        },

        visualMap: {//颜色的设置  dataRange
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
            data:[
              {name: '北京',value: Math.round(Math.random()*2000)},
              {name: '天津',value: Math.round(Math.random()*2000)},
              {name: '上海',value: Math.round(Math.random()*2000)},
              {name: '重庆',value: Math.round(Math.random()*2000)},
              {name: '河北',value: Math.round(Math.random()*2000)},
              {name: '河南',value: Math.round(Math.random()*2000)},
              {name: '云南',value: Math.round(Math.random()*2000)},
              {name: '辽宁',value: Math.round(Math.random()*2000)},
              {name: '黑龙江',value: Math.round(Math.random()*2000)},
              {name: '湖南',value: Math.round(Math.random()*2000)},
              {name: '安徽',value: Math.round(Math.random()*2000)},
              {name: '山东',value: Math.round(Math.random()*2000)},
              {name: '新疆',value: Math.round(Math.random()*2000)},
              {name: '江苏',value: Math.round(Math.random()*2000)},
              {name: '浙江',value: Math.round(Math.random()*2000)},
              {name: '江西',value: Math.round(Math.random()*2000)},
              {name: '湖北',value: Math.round(Math.random()*2000)},
              {name: '广西',value: Math.round(Math.random()*2000)},
              {name: '甘肃',value: Math.round(Math.random()*2000)},
              {name: '山西',value: Math.round(Math.random()*2000)},
              {name: '内蒙古',value: Math.round(Math.random()*2000)},
              {name: '陕西',value: Math.round(Math.random()*2000)},
              {name: '吉林',value: Math.round(Math.random()*2000)},
              {name: '福建',value: Math.round(Math.random()*2000)},
              {name: '贵州',value: Math.round(Math.random()*2000)},
              {name: '广东',value: Math.round(Math.random()*2000)},
              {name: '青海',value: Math.round(Math.random()*2000)},
              {name: '西藏',value: Math.round(Math.random()*2000)},
              {name: '四川',value: Math.round(Math.random()*2000)},
              {name: '宁夏',value: Math.round(Math.random()*2000)},
              {name: '海南',value: Math.round(Math.random()*2000)},
              {name: '台湾',value: Math.round(Math.random()*2000)},
              {name: '香港',value: Math.round(Math.random()*2000)},
              {name: '澳门',value: Math.round(Math.random()*2000)}
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
.sma {
  width: 100px;
}
.big {
  width: 150px;
}
</style>
