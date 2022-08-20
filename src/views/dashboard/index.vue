<template>
  <div class="dashboard-container">
    <div class="box">
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {

    }
  },
  mounted() {

  },
  computed: {

  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.box {
  position: relative;
  width: 100%;
  height: 570px;
  background-image: url('~@/assets/bg_image/img.png');
}
</style>
