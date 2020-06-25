<template>
  <div>
    <el-form
      :model="FormData"
      status-icon
      ref="studentForm"
      label-width="90px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="uid">
        <el-input v-model="FormData.uid" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="FormData.name" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="FormData.sex" label=0 disabled>男</el-radio>
        <el-radio v-model="FormData.sex" label=1 disabled>女</el-radio>
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-input v-model="FormData.nation" disabled></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="academy">
        <el-input v-model="FormData.academy" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="FormData.tel"></el-input>
      </el-form-item>
      <el-form-item class="change-pwd">
        <el-button type="primary" @click="submitForm('studentForm')">保存资料</el-button>
        <el-link type="primary" @click="changePwd">修改密码</el-link>
      </el-form-item>
    </el-form>

    <component
      :dialogFormVisible="dialogFormVisible"
      :is="currentComponent"
      @closeDialog="handleClose"
    ></component>
  </div>
</template>

<script>
import { isInt } from "../../tools/rules.js";
import Api from "../../api";
import ChangePwd from "../../components/tChangePwd";
export default {
  name: "personal",
  timeout: null,

  data() {
    let timeout = null;
    return {
      dialogFormVisible: false,
      currentComponent: "",
      formLabelWidth: "120px",
      FormData: {},
      options: "",
      rules: {
        sid: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        nation: { required: true, message: "姓名不能为空", trigger: "blur" },
        name: { required: true, message: "姓名不能为空", trigger: "blur" },
        academy: { required: true, message: "学院不能为空", trigger: "blur" },
        tel: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码"
          }
        ],
      }
    };
  },
  mounted() {
    const userInfo = this.$store.getters.getUserInfo|| {};
    this.FormData = JSON.parse(JSON.stringify(userInfo))
  },
  methods: {
    // 保存资料
    submitForm(formName) {
      if (this.timeout) return;

      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            tel: this.FormData.tel,
                tid: this.$store.state.Login.userInfo.uid
          }
          this.$http
            .post(Api.modifiedTeacher, this.$qs.stringify(params))
            .then(res => {
              const { code, msg, data } = res.data || {};

              // 节流处理
              this.timeout = setTimeout(() => {
                this.timeout = null;
              }, 3000);

              if (code !== 0) {
                this.$message.error(msg);
                return;
              }

              this.$store.dispatch('changeInfo', this.FormData)

              this.$message({
                message: data,
                type: "success"
              });

              return;
            }).catch(err => {
              console.log(err);
              return false
            });
        } else {
          return false;
        }
      });
    },
    changePwd() {
      this.dialogFormVisible = true;
      this.currentComponent = ChangePwd;
    },
    
    handleClose() {
      this.dialogFormVisible = false;
    }

  }
};
</script>

<style lang='scss'>
.change-pwd {
  .el-form-item__content {
    margin-left: 0 !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
