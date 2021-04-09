<template>
  <div>
    <div id="myChart" :style="{ width: '100%', height: '670px' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "hello",
  data() {
    return {
      option : {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["场均击杀数量", "场均死亡数量", "上场次数"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "姓名1",
              "姓名2",
              "姓名3",
              "姓名4",
              "姓名5",
              "姓名6",
              "姓名7",
              "姓名8",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "击杀/死亡数量",
            min: 0,
            max: 200,
            interval: 10,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "上场次数",
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "场均击杀数量",
            type: "bar",
            data: [
              10.7,
              20.7,
              30.7,
              40.7,
              50.7,
              60.7,
              70.7,
              80.7,  
            ],
          },
          {
            name: "场均死亡数量",
            type: "bar",
            data: [
              70.7,
              70.7,
              70.7,
              70.7,
              70.7,
              70.7,
              70.7,
              70.7,  
            ],
          },
          {
            name: "上场次数",
            type: "line",
            yAxisIndex: 1,
            data: [
              13,
              5,
              10,
              18,
              21,
              9,
              7,
              17,  
            ],
          },
        ],
      }
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // console.log(this.option.xAxis[0].data[0]);
      var chartDom = document.getElementById("myChart");
      var myChart = echarts.init(chartDom, "dark"); 
      this.option && myChart.setOption(this.option);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>