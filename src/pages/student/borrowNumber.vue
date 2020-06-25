<template>
  <div class="equip-bar-wrap">
    <div id="main" style="width: 80%;height:95%;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "borrowNumber",

  data() {
    return {
      lineData: [],
      myChart: "",
      option: {}
    };
  },
  mounted() {
    const equipWrap = document.getElementsByClassName("equip-bar-wrap")[0];
    equipWrap.style.height = window.innerHeight - 100 + "px";
    this.myChart = echarts.init(document.getElementById("main"));
    this.getBarData();
    window.addEventListener("resize", () => {
      this.myChart.resize(); //监听屏幕大小，来刷新画布
    });
  },
  methods: {
    // 获取折现图数据
    getBarData() {
      const params = { sid: this.$store.state.Login.userInfo.uid };
      this.$http.get(this.$Api.borrowNumber, { params }).then(async res => {
        const { code, msg, data } = res.data || {};

        if (code !== 0) {
          this.$message.error(msg);
          return;
        }

        let lineData = [];

        for (let i = 0; i < data.length; i++) {
          lineData.push([]);
          lineData[i].push(data[i].date);
          lineData[i].push(data[i].count);
        }

        this.lineData = lineData;
        this.init();
      });
    },
    init() {
      this.option = {
        title: {
          text: "借用数量"
        },
        grid: {
          y2: 80
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            rotate: 90
          }
        },

        yAxis: {
          type: "value",
          boundaryGap: false,
          visualMap: {
            type: "piecewise",
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: [
              {
                gt: 1,
                lt: 3,
                color: "rgba(0, 180, 0, 0.5)"
              },
              {
                gt: 5,
                lt: 7,
                color: "rgba(0, 180, 0, 0.5)"
              }
            ]
          }
        },
        series: [
          {
            type: "line",
            lineStyle: {
              color: "green",
              width: 5
            },
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  //渐变色实现
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#3ebf9b"
                    },
                    {
                      offset: 0.5,
                      color: "#267268"
                    },
                    {
                      offset: 1,
                      color: "#14323f"
                    }
                  ])
                },
                lineStyle: {
                  color: "#349e85"
                },
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black"
                  }
                }
              }
            },
            data: this.lineData
          }
        ]
      };
      this.myChart.setOption(this.option);
    }
  }
};
</script>
<style lang='scss'>
</style>
