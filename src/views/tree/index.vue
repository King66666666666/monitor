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
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
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
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
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
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
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
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
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
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            应用版本访问用户量Top 10
            <el-tooltip class="item" effect="dark" content="数值代表使用的浏览器的数量" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            浏览器使用量Top 10
            <el-tooltip class="item" effect="dark" content="数值代表设备的物理分辨率" placement="top">
              <i class="el-icon-warning-outline" style="color: gray"></i>
            </el-tooltip>
          </span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
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
  watch: {

  },

  methods: {

  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

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
</style>

