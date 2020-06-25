<template>
  <div class="login-wrap">
    <el-card class="login-card">
      <div slot="header" class="card-header">
      <img class="xy-logo" src="../assets/xy-logo.png" alt="西安邮电大学">
      <span>实验室设备管理系统</span>
      </div>
      <el-form
        label-width="70px"
        :rules="rules"
        label-position="left"
        ref="loginData"
        :model="staf"
      >
        <el-form-item label="用户名" prop="id">
          <el-input class="info" v-model="staf.id" placeholder="请输入学号/工号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="staf.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="idInfo">
          <el-select v-model="staf.idInfo" placeholder="请选择登录角色">
            <el-option label="学生" value="0"></el-option>
            <el-option label="老师" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginData')">登录</el-button>
          <el-button @click="reset('loginData')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { isInt } from "../tools/rules.js";
import Api from "../api";
import qs from "qs";
export default {
  name: "login",

  data() {
    return {
      staf: {
        id: "",
        password: "",
        idInfo: "0"
      },
      rules: {
        id: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { validator: isInt, message: "请输入数字", trigger: "change" }
        ],
        password: { required: true, message: "密码不能为空", trigger: "blur" }
      }
    };
  },

  watch: {
    "$store.state.Login.checkLogin"() {
      let that = this;
      if (this.$store.state.Login.isSuccess) {
        this.$notify({
          title: "登录成功",
          message: "正在加载...",
          type: "success",
          duration: 1500,
          onClose: function() {
            that.$router.push({ path: "/" });
          }
        });
        window.localStorage.setItem("isLogin", true);
      } else {
        that.$notify({
          title: "登录失败",
          message: "请检查用户名和密码以及对应角色是否正确!",
          type: "error",
          duration: 2000,
          onClose: function() {}
        });
        window.localStorage.setItem("isLogin", false);
      }
    }
  },

  methods: {
    login(formData) {
      let that = this;
      if (this.timeout) return;

      this.$refs[formData].validate(valid => {
        const params = {
          id: this.staf.id,
          password: this.staf.password,
          idInfo: this.staf.idInfo
        };

        if (valid) {
          this.$http
            .get(this.$Api.login, { params })
            .then(res => {
              const { code, msg, data } = res.data || {};

              that.$store.dispatch("login", res.data);

              if (code !== 0) {
                // 节流处理
                this.timeout = setTimeout(() => {
                  this.timeout = null;
                }, 3000);

                // this.$message.error(msg);
                return;
              }

              if (this.staf.idInfo === "0") {
                return that.$router.replace({
                  path: "/student",
                  query: {
                    id: this.staf.id
                  }
                });
              }
              if (this.staf.idInfo === "1") {
                return that.$router.replace({
                  path: "/teacher",
                  query: {
                    id: this.staf.id
                  }
                });
              }
              if (this.staf.idInfo === "2") {
                return this.$router.replace({
                  path: "/admin",
                  query: {
                    id: this.staf.id
                  }
                });
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>

<style lang='less'>
.login-wrap {
  min-width: 200px;
  .login-card {
    .card-header {
      text-align: center;
      font-size: 18px;
      .xy-logo {
        width: 38px;
        height: 35px;
        vertical-align: middle;
        margin-right: 20px;
      }
    }
    .el-form-item:not(:last-child) {
      border-bottom: 1px solid silver;
      .el-input__inner {
        outline: none;
        border: 0 none;
      }
    }
    .el-form-item:last-child {
      margin-top: 50px;
    }
  }
}
</style>
