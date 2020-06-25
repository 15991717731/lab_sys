<template>
  <div id="app">
    <el-container class="kingorld-container" style=" border: 1px solid #eee">
      <el-aside style="width:150px">
        <el-menu default-active="1">
          <el-menu-item index="1" @click="showAll">
            <i class="el-icon-orange icons"></i>
            <span slot="title">设备资源</span>
          </el-menu-item>

          <el-menu-item index="2" @click="showTeacher">
            <i class="el-icon-s-order icons"></i>
            <span slot="title">老师管理</span>
          </el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-release icons"></i>
              <span>故障清单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" class="ui-menu-item" @click="showRepair">已报修</el-menu-item>
              <el-menu-item index="3-2" class="ui-menu-item" @click="showScrap">已报废</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="4" @click="showIdentifier">
            <i class="el-icon-search icons"></i>
            <span slot="title">信息识别</span>
          </el-menu-item>

          <el-menu-item index="5" @click="showPersonalCenter">
            <i class="el-icon-user-solid icons"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
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
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {
    showTeacher() {
      this.$router.push({ path: "teacherList" });
    },
    showAll() {
      this.$router.push({ path: "allList" });
    },
    showScrap() {
      this.$router.push({ path: "scrap" });
    },
    showRepair() {
      this.$router.push({ path: "repair" });
    },
    showIdentifier() {
      this.$router.push({ path: "identifier" });
    },
    showPersonalCenter() {
      this.$router.push({ path: "personalCenter" });
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
    }
  },
  mounted() {}
};
</script>



<style lang="less">
.el-header {
  background-color: #474747;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  padding: 0 80px 0 0;
  .userinfo {
    font-size: 13px;
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
  .main-content {
    max-height: 650px;
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
  min-width: 91px;
  max-width: 210px;
  overflow-x: hidden;
  flex: 2;
  background-color: #474747;
  border-right: 1px solid #b3c0d1;
  .el-menu {
    .el-menu-item-group {
      .el-menu-item-group__title {
        padding: 0;
      }
    }
    border: none;
    .el-menu-item {
      background: #474747;
      padding-left: 10px !important;
      color: white;
    }
    .el-submenu {
      background: #474747;
      color: white;
      .el-submenu__title {
        padding-left: 10px !important;
        color: white;
      }
      .el-submenu__title:hover {
        background-color: #474747;
      }
      .el-submenu__title:focus,
      .el-submenu__title:hover {
        outline: 0;
        background-color: #474747;
      }
      .ui-menu-item {
        padding-left: 50px !important;
      }
    }
    .is-active {
      background-color: #409eff;
      color: white;
    }
  }
}

@media screen and (max-width: 500px) {
  .el-menu-item {
    font-size: 12px;
    .icons {
      display: none;
    }
  }
  .el-submenu {
    .el-submenu__title {
      font-size: 12px;
      .icons {
        display: none;
      }
    }
    .el-menu {
      .el-menu-item-group {
        ul {
          .ui-menu-item {
            padding-left: 20px !important;
          }
          .aside-title {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
