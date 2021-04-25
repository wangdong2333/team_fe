<template>
  <div>
    <div id="myChart" :style="{ width: '1400px', height: '670px' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "hello",
  data() {
    return {
      option: {
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
            axisLabel: {
              interval: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "击杀/死亡数量",
            min: 0,
            max: 30,
            interval: 2,
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
              1.7,
              8.4,
              3.8,
              4.7,
              5.2,
              7.9,
              5.3,
              3.7,
              1.7,
              8.4,
              3.8,
              4.7,
              5.2,
              7.9,
              5.3,
              3.7,
            ],
          },
          {
            name: "场均死亡数量",
            type: "bar",
            data: [5, 7, 7, 9, 3, 13, 6, 8, 5, 7, 7, 9, 3, 13, 6, 8],
          },
          {
            name: "上场次数",
            type: "line",
            yAxisIndex: 1,
            data: [13, 5, 10, 18, 21, 9, 7, 17, 13, 5, 10, 18, 21, 9, 7, 17],
          },
        ],
      },
      targetTeam: "",
    };
  },
  mounted() {
    // this.drawLine();
  },
  created() {
    this.targetTeam = localStorage.getItem("targetTeam");
    this.getList();
  },
  methods: {
    getTeam(oldTeam) {
      if (oldTeam === "IG") {
        oldTeam = "teamList";
      } else if (oldTeam === "LGD") {
        oldTeam = "ladTeam";
      } else if (oldTeam === "V5") {
        oldTeam = "v5Team";
      }
      return oldTeam;
    },
    drawLine() {
      var chartDom = document.getElementById("myChart");
      var myChart = echarts.init(chartDom, "dark");
      this.option && myChart.setOption(this.option);
    },
    getList() {
      if (this.targetTeam === "IG") {
        axios({
          url: "http://localhost:3000/teamList/getTeamList",
        })
          .then((res) => {
            console.log(res);
            let targetName = [];
            res.data.forEach((item, index) => {
              targetName.push(item.name);
            });
            console.log(this.option.xAxis[0].data, "this.option.xAxis[0].data");

            this.option.xAxis[0].data = targetName;
            console.log(this.option.xAxis[0].data, "this.option.xAxis[0].data");
            this.drawLine();
          })
          .catch((err) => {
            console.log(err);
          });
      }else if (this.targetTeam === "LGD") {
        axios({
          url: "http://localhost:3000/ladTeam/getLgdTeam",
        })
          .then((res) => {
            console.log(res);
            let targetName = [];
            res.data.forEach((item, index) => {
              targetName.push(item.name);
            });
            this.option.xAxis[0].data = targetName;
            this.drawLine();
          })
          .catch((err) => {
            console.log(err);
          });
      }else if (this.targetTeam === "V5") {
        axios({
          url: "http://localhost:3000/V5Team/getV5Team",
        })
          .then((res) => {
            console.log(res);
            let targetName = [];
            res.data.forEach((item, index) => {
              targetName.push(item.name);
            });
            this.option.xAxis[0].data = targetName;
            this.drawLine();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>