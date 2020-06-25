<template>
  <div>
    <el-table :data="recordTable" style="width: 100%" max-height="350">
      <el-table-column fixed prop="eid" label="设备编号" width="120"></el-table-column>
      <el-table-column prop="eName" label="设备名称" width="150"></el-table-column>
      <el-table-column prop="bStatus" label="借用状态" width="150"></el-table-column>
      <el-table-column prop="rStatus" label="归还状态"></el-table-column>
      <el-table-column prop="bDate" label="借用日期" width="150"></el-table-column>
      <el-table-column prop="rDate" label="归还日期" width="150"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {bStatusValue, rStatusValue} from '../tools/func'
export default {
  name: "",

  mounted() {
      
    for(let i = 0; i < this.recordTable.length; i++) {
        this.recordTable[i].bStatus = bStatusValue(this.recordTable[i].bStatus)
        this.recordTable[i].rStatus = rStatusValue(this.recordTable[i].rStatus)

        if(this.recordTable[i].bStatus === "不同意") {
            this.recordTable[i].rStatus = "——"
            this.recordTable[i].rDate = "——"
        }
    }
  },

  props: {
    recordTable: {
      type: [Object, Array],
      default: []
    }
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang='scss'>
</style>
