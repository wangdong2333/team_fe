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
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          data: [
            "总击杀",
            "总死亡",
            "场均排眼",
            "场均插眼",
            "场均金钱",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        series: [
          {
            name: "总击杀",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: "总死亡",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "场均排眼",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "场均插眼",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [150, 212, 201, 154, 190, 330, 410],
          },
          {
            name: "场均金钱",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
      targetTeam:''
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
        oldTeam = "game";
      } else if (oldTeam === "LGD") {
        oldTeam = "ladGame";
      } else if (oldTeam === "V5") {
        oldTeam = "v5Game";
      }
      return oldTeam;
    },
    drawLine() {
      var chartDom = document.getElementById("myChart");
      var myChart = echarts.init(chartDom, "dark");
      this.option && myChart.setOption(this.option);
    },
    getList() {
      let team = this.getTeam(this.targetTeam);
      axios({
        url: `http://localhost:3000/${team}/getGameList`,
      })
        .then((res) => {
          console.log(res);
          let targetName = [], targetKill = [] , targetDeath = [] , targetPutEye = [], targetRemoveEye = [], targetMoney = []

          res.data.forEach((item, index) => {
            targetName.push(item.name);
            targetKill.push(item.kill);
            targetDeath.push(item.death);
            targetPutEye.push(item.putEye);
            targetRemoveEye.push(item.removeEye);
            targetMoney.push(item.money);
          });
          this.option.yAxis.data = targetName;
          this.option.series[0].data = targetKill;
          this.option.series[1].data = targetDeath;
          this.option.series[2].data = targetPutEye;
          this.option.series[3].data = targetRemoveEye;
          this.option.series[4].data = targetMoney;
          console.log(this.option.yAxis.data, "this.option.yAxis[0].data");
          this.drawLine();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>