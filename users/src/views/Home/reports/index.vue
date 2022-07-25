<template>
  <div class="reports">
    <div class="reports_const">
      <div id="main"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getReports } from "@/utils/http";
export default {
  data() {
    return {
      reports: [],
      myChart: "",
    };
  },

  created() {
    getReports().then((res) => {
      console.log(res);
      this.reports = res.data;
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      myChart.setOption(res.data);
    });
  },
};
</script>

<style lang="scss" scoped>
.reports {
  width: 100%;
  background: white;
  padding: 10px;
  border-radius: 8px;
  #main {
    width: 100%;
    height: 600px;
  }
}
</style>
