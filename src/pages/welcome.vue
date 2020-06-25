<template>
  <div class="bg-img">
    <el-row type="flex" justify="center" align="middle">
      <el-col>
        <Login></Login>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less">
.bg-img {
  height: 100%;
  background-image: url(../assets/bg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  .el-row {
    height: 100%;
  }
  .el-col {
    width: 350px;
    min-width: 200px;
  }
}
</style>


<script>
import Login from "../components/Login";

export default {
  name: "welcome",
  components: {
    Login
  },

  data() {
    return {
      height: ""
    };
  },

  methods: {
    changeHeight() {
      if (document.getElementsByClassName("bg-img")[0]) {
        document.getElementsByClassName("bg-img")[0].style.height = this.height;
      }
    }
  },

  mounted() {
    this.height = window.innerHeight + "px";
    window.addEventListener("resize", this.changeHeight);
    this.changeHeight();
  }
};
</script>
