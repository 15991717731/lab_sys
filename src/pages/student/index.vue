<template>
  <div id="app">
    <el-container class="kingorld-container" style=" border: 1px solid #eee">
      <el-aside style="width:0px">
        <el-menu default-active="1">
          <el-menu-item index="1" @click="showAll">
            <i class="el-icon-orange icons"></i>
            <span slot="title" class="aside-title">设备资源</span>
          </el-menu-item>

          <el-menu-item index="2" @click="showApproval">
            <i class="el-icon-s-order icons"></i>
            <span slot="title" class="aside-title">我的审批</span>
          </el-menu-item>

          <el-menu-item index="3" @click="showBorrow">
            <i class="el-icon-s-goods icons"></i>
            <span slot="title" class="aside-title">我的借用</span>
          </el-menu-item>

          <el-menu-item index="4" @click="showIdentifier">
            <i class="el-icon-search icons"></i>
            <span slot="title" class="aside-title">信息识别</span>
          </el-menu-item>

          <el-menu-item index="5" @click="showPersonalCenter">
            <i class="el-icon-user-solid icons"></i>
            <span slot="title" class="aside-title">个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="main-info">
        <el-header>
          <div class="userinfo">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{$store.state.Login.userInfo.name}} ({{$store.state.Login.userInfo.uid}})
                <i
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </span>
              <el-dropdown-menu class="welcome-dropdown" slot="dropdown">
                <el-dropdown-item @click.native="quit">
                  <span class="quit"></span>
                  <span>退出</span>
                  <i class="el-icon-switch-button"></i>
                </el-dropdown-item>
                <el-dropdown-item @click.native="showImg">
                  <span class="quit"></span>
                  <span>我的二维码</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="main-content content-area">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="学生二维码" class="display-img" :visible.sync="showDialog">
      <img :src="verifyCode" class="img-pic" alt="Loading..." />
      <div class="mobile-save">移动端请长按图片保存</div>
      <el-button type="primary" v-if="showSave" class="save-img" @click="saveImage">保存</el-button>
    </el-dialog>
  </div>
</template>



<script>
export default {
  name: "index",
  data() {
    return {
      showDialog: false,
      verifyCode: "",
      showSave: false
    };
  },

  mounted() {},

  methods: {
    showApproval() {
      this.$router.push({ path: "approval" });
    },
    showAll() {
      this.$router.push({ path: "allList" });
    },
    showIdentifier() {
      this.$router.push({ path: "identifier" });
    },
    showPersonalCenter() {
      this.$router.push({ path: "personalCenter" });
    },
    showBorrow() {
      this.$router.push({ path: "borrowNumber" });
    },
    quit() {
      this.$router.replace({ path: "/login" });
      history.pushState(null, null, document.URL);
      window.addEventListener(
        "popstate",
        function(e) {
          history.pushState(null, null, document.URL);
        },
        false
      );
    },
    showImg() {
      // 获取图片
      const params = {
        id: this.$store.state.Login.userInfo.uid
        // uid: this.$store.state.Login.userInfo.uid,
      };

      this.$http
        .post(this.$Api.getImage, this.$qs.stringify(params))
        .then(res => {
          this.showDialog = true;
          return "data:image/png;base64," + res.data.data;
        })
        .then(data => {
          this.verifyCode = data;
          this.showSave = true;
        });
    },
    // 保存图片
    saveImage() {
      var alink = document.createElement("a");
      document.body.appendChild(alink);
      alink.style.display = "none";
      alink.href = this.verifyCode;
      alink.download = name || "pic";

      if (navigator.msSaveBlob) {
        return window.navigator.msSaveBlob(this.verifyCode, name || "pic");
      }
      alink.click();
      document.body.removeChild(alink);
    }
  },
  mounted() {}
};
</script>



<style lang="less">
.display-img {
  text-align: center;
  .img-pic {
    display: block;
    margin: auto;
  }
  .mobile-save {
    font-size: 10px;
    color: red;
    margin: 5px 0;
  }
  .save-img {
    margin: 10px;
  }
}
.el-header {
  background-color: #474747;
  color: #333;
  height: 50px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .userinfo {
    font-weight: 500;
    color: #fff;
    .el-dropdown-link {
      color: white;
      font-size: 10px;
    }
    .welcome-dropdown {
      .quit {
        margin-left: 15px;
      }
    }
  }
}

.kingorld-container {
  display: flex;
  flex-direction: row;
  .main-info {
    .content-area {
      max-height: 700px;
    }
  }
}

.kingorld-container::-webkit-scrollbar {
  display: none;
}

.el-container .el-container {
  overflow: auto;
  border: none;
  flex: 7;
}

.el-aside {
  min-height: 100vh;
  min-width: 80px;
  max-width: 210px;
  overflow-x: hidden;
  flex: 2;
  background-color: #474747;
  border-right: 1px solid #b3c0d1;
  .el-menu {
    border: none;
    .el-menu-item {
      background: #474747;
      padding-left: 10px !important;
      color: white;
    }
    .is-active {
      background-color: #409eff;
      color: white;
    }
  }
}

@media screen and (max-width: 500px) {
  .icons {
    display: none;
  }
  .aside-title {
    font-size: 12px;
  }
}
</style>
