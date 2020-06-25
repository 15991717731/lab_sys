<template>
  <div class="teacher-repair-list">
    <!-- 搜索 -->
    <div class="repair-search">
      <el-input placeholder="请输入设备编号" class="input-eid-search" v-model="inputEid" clearable></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchEquip">搜索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%"  :max-height="height">
      <el-table-column fixed prop="eid" label="设备编号" width="150"></el-table-column>
      <el-table-column prop="eName" label="设备名称" width="200"></el-table-column>
      <el-table-column prop="address" label="设备地址" width="200"></el-table-column>
      <el-table-column prop="academy" label="所属学院" width="200"></el-table-column>
      <el-table-column prop="description" label="设备参数" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "repairList",

  data() {
    let timeout = null;
    return {
      tableData: [],
      height: "",
      inputEid: ""
    };
  },
  beforeMount() {
    const table = document.getElementsByClassName("repair-table")[0];
    this.height = window.innerHeight - 200 + "px";
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      if (this.timeout) return;

      const params = {status: 3}
      this.$http
        .get(this.$Api.adminTroubleList, {params})
        .then(res => {
          const { data, msg, code } = res.data || {};
          if (code !== 0) {
            // 节流处理
            this.timeout = setTimeout(() => {
              this.timeout = null;
            }, 3000);
            this.$message.error(msg);
            return;
          }
          this.tableData = data || [];
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    },
    searchEquip() {
      if (this.timeout) return;

      const params = { eid: this.inputEid, status: 3 };

      this.$http.get(this.$Api.adminTroubleSearch, { params }).then(res => {
        const { code, data, msg } = res.data || {};

        if (code !== 0) {
          // 节流处理
          this.timeout = setTimeout(() => {
            this.timeout = null;
          }, 3000);

          this.$message.error(msg);
          return;
        }

        this.tableData = data || [];
      });
    }
  }
};
</script>

<style lang='scss'>
.teacher-repair-list {
  .repair-search {
    margin: 10px 0 20px 0;
    .input-eid-search {
      width: 200px;
      display: inline-block;
      margin-right: 20px;
    }
  }
}
</style>
