<template>
  <div class="display-equipment-message">
    <el-form :model="equipmentMsg" label-width="100px" class="demo-ruleForm">
      <el-form-item label="设备名称" prop="eName">
        <el-input disabled v-model="equipmentMsg.eName"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" prop="eid">
        <el-input disabled v-model="equipmentMsg.eid"></el-input>
      </el-form-item>
      <el-form-item label="设备地址" prop="address">
        <el-input disabled v-model="equipmentMsg.address"></el-input>
      </el-form-item>
      <el-form-item label="设备参数" prop="description">
        <el-input disabled v-model="equipmentMsg.description"></el-input>
      </el-form-item>
      <el-form-item label="所属学院" prop="academy">
        <el-input disabled v-model="equipmentMsg.academy"></el-input>
      </el-form-item>
      <el-form-item label="老师姓名" prop="tName">
        <el-input disabled v-model="equipmentMsg.tName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input disabled v-model="equipmentMsg.tel"></el-input>
      </el-form-item>
      <el-form-item label="设备状态" prop="status">
        <el-input disabled v-model="equipmentMsg.status"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          v-if="equipmentMsg.status === '可借用' && borrowBtn && show"
          @click="borrow(equipmentMsg.eid)"
        >借用</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    equipmentMsg: {
      type: [Object, Array],
      default: () => {}
    },
    borrowBtn: Boolean
  },

  data() {
    return {
      show: true,
    };
  },

  methods: {
    
    borrow(eid) {
      if (this.timeout) return;
      
      const params = { eid: eid, sid: this.$store.state.Login.userInfo.uid };
      this.$http
        .post(this.$Api.borrow, this.$qs.stringify(params))
        .then(res => {
          const { code, msg, data } = res.data || {};

          if (code !== 0) {
            // 节流处理
            this.timeout = setTimeout(() => {
              this.timeout = null;
            }, 3000);

            this.$message.error(msg);
            return;
          }

          this.$message({
            message: data,
            type: "success"
          });
          this.show = false;
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    }
  }
};
</script>

<style lang='scss'>
</style>
