<template>
  <div class="equip-bar-wrap">
    <div class="search-equip-bar">
      <el-select v-model="equipName" placeholder="请选择">
        <el-option v-for="(item, index) in equipnameList" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-button type="primary" class="query-about" icon="el-icon-search" @click="getBarData">查询</el-button>
    </div>

    <div id="main"></div>
    <div id="main-pie"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import {barDataArr} from '../../tools/func'
export default {
  name: "equipstatus",

  data() {
    return {
      equipnameList: [],
      barData: [],
      myChart: "",
      option: {},
      pieChart: "",
      equipName: "",
      pieOption: {}
    };
  },
  beforeMount() {
    this.getEquipName();
  },
  mounted() {
    const equipWrap = document.getElementsByClassName("equip-bar-wrap")[0];
    equipWrap.style.height = window.innerHeight - 100 + "px";
    this.myChart = echarts.init(document.getElementById("main"));
    this.pieChart = echarts.init(document.getElementById("main-pie"));

    this.init();

    this.pieInit();
    this.getPieData();

    window.addEventListener("resize", () => {
      this.myChart.resize(); //监听屏幕大小，来刷新画布
      this.pieChart.resize();
    });
  },
  methods: {
    // 获取设备名称
    getEquipName() {
      const params = {tid: this.$store.state.Login.userInfo.uid}
      this.$http.get(this.$Api.teacherEquipName, {params}).then(res => {
        const { code, data, msg } = res.data || {};

        if (code !== 0) {
          this.$message.error(msg);
          return;
        }

        this.equipnameList = data;
        this.equipName = this.equipnameList[0];
        this.getBarData();
        // 设置图例
        this.pieChart.setOption({
          legend: {
            orient: "vertical",
            left: 10,
            data: data
          }
        });

      });
    },

    // 获取柱状图数据
    getBarData() {
      const params = {
        tid: this.$store.state.Login.userInfo.uid,
        eName: this.equipName
      };

      this.$http.get(this.$Api.teacherBarData, { params }).then(async res => {
        const { code, msg, data } = res.data || {};

        if (code !== 0) {
          this.$message.error(msg);
          return;
        }

        let arr = barDataArr(data);

        this.myChart.setOption({
          series: [
            {
              data: arr || [],
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)"
              }
            }
          ]
        });
      });
    },
    init() {
      // 指定图表的配置项和数据
      this.option = {
        title: {},
        tooltip: {},
        legend: {},
        xAxis: {
          type: "category",
          data: ["可借用", "已借用", "报修", "报废"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(this.option);
    },
    pieInit() {
      // 指定图表的配置项和数据
      this.pieOption = {
        title: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: this.equipnameList
        },
        series: [
          {
            name: "设备数量",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["53%", "53%"],
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.pieChart.setOption(this.pieOption);
    },

    // 获取饼状图的data
    getPieData() {
      const params = {tid: this.$store.state.Login.userInfo.uid};

      this.$http.get(this.$Api.teacherPieData, {params}).then(res => {
        const { data, code, msg } = res.data || {};

        if (code !== 0) {
          this.$message.error(msg);
          return;
        }

        this.pieChart.setOption({
          series: [
            {
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "12",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: data || []
            }
          ]
        });
      });
    }
  }
};
</script>
<style lang='scss'>
.equip-bar-wrap {
  .search-equip-bar {
    margin-bottom: 10px;
  }
  #main {
    display: inline-block;
    width: 50%;
    height: 95%;
  }
  #main-pie {
    display: inline-block;
    width: 45%;
    height: 95%;
  }
}

@media screen and (max-width: 1000px) {
  .equip-bar-wrap {
    .search-equip-bar {
      margin-bottom: 10px;
    }
    #main {
      display: block;
      width: 95%;
      height: 95%;
    }
    #main-pie {
      display: block;
      width: 95%;
      height: 95%;
    }
  }
}
@media screen and (max-width: 500px) {
  .equip-bar-wrap {
    .search-equip-bar {
      margin-bottom: 10px;
      .query-about{
        display: block;
        margin-top: 5px;
      }
    }
  }
}
</style>
