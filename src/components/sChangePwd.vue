<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :before-close="handleCloseDialog">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="submitChangePwd('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "sChangePwd",

  data() {
    let timeout = null;
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }

      if (this.ruleForm.checkPass !== "") {
        this.$refs.ruleForm.validateField("checkPass");
      }

      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请再次输入密码"));
      }

      if (value !== this.ruleForm.pass) {
        return callback(new Error("两次输入密码不一致!"));
      }

      return callback();
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    // 修改密码
    submitChangePwd(formName) {
      if (this.timeout) return;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            password: this.ruleForm.pass,
            sid: this.$store.state.Login.userInfo.uid
          };

          this.$http
            .post(this.$Api.changePwd, this.$qs.stringify(params))
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
              this.$store.dispatch("changePwd", this.ruleForm.pass);

              this.$message({
                message: data,
                type: "success"
              });

              this.handleCloseDialog();
              this.ruleForm = {};
            })
            .catch(err => {
              console.log(err);
              return false;
            });
        } else {
          return false;
        }
      });
    },
    handleCloseDialog() {
      this.$parent.handleClose();
    }
  }
};
</script>

<style lang='scss'>
</style>
