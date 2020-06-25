<template>
  <div class="display-equipment-message">
    <el-form disabled :model="equipmentMsg" label-width="100px" class="demo-ruleForm">
      <el-form-item label="设备名称" prop="eName">
        <el-input v-model="equipmentMsg.eName"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" prop="eid">
        <el-input v-model="equipmentMsg.eid"></el-input>
      </el-form-item>
      <el-form-item label="设备地址" prop="address">
        <el-input v-model="equipmentMsg.address"></el-input>
      </el-form-item>
      <el-form-item label="设备参数" prop="description">
        <el-input v-model="equipmentMsg.description"></el-input>
      </el-form-item>
      <el-form-item label="所属学院" prop="academy">
        <el-input v-model="equipmentMsg.academy"></el-input>
      </el-form-item>
      <el-form-item label="老师姓名" prop="tName">
        <el-input v-model="equipmentMsg.tName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="equipmentMsg.tel"></el-input>
      </el-form-item>
      <el-form-item label="设备状态" prop="status">
        <el-input v-model="equipmentMsg.status"></el-input>
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
