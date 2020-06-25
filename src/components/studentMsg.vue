<template>
  <div class="sutdent-msg-form">
    <el-form :model="studentMsg" label-width="50px" class="demo-ruleForm">
      <el-form-item label="学号">
        <el-input v-model="studentMsg.uid"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="studentMsg.name"></el-input>
      </el-form-item>
      <el-form-item v-if="showRecord">
        <el-button v-if="showRecord" type="primary" @click="borrowRecord('ruleForm')">借用记录</el-button>
        <el-button v-if="showRecord" @click="close('ruleForm')">收起</el-button>
      </el-form-item>
    </el-form>

    <component v-if="showTable" :recordTable="recordTable" :is="currentComponent"></component>
  </div>
</template>

<script>
import RecordTable from "./borrowRecord";
export default {
  name: "",

  props: {
    studentMsg: {
      type: [Object, Array],
      default: () => {}
    },
    showRecord: Boolean
  },

  data() {
    let timeout = null;
    return {
      showTable: false,
      currentComponent: RecordTable,
      recordTable: []
    };
  },

  methods: {
    borrowRecord() {
      if (this.timeout) return;

      const params = { sid: this.studentMsg.uid };

      this.$http.get(this.$Api.studentBorrowRecord, { params }).then(res => {
        const { code, msg, data } = res.data || {};

        if (code !== 0) {
          // 节流处理
          this.timeout = setTimeout(() => {
            this.timeout = null;
          }, 3000);

          this.$message.error(msg);
          return;
        }

        this.recordTable = data || [];
        this.showTable = true;
      });
    },

    close() {
      this.showTable = false;
    }
  }
};
</script>

<style lang='scss'>
.sutdent-msg-form {
  margin: 15px 0;
}
</style>
