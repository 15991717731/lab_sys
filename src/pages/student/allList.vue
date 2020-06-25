<template>
  <div class="equip-list">
    
    <component
      :dialogFormVisible="dialogFormVisible"
      :is="currentComponent"
      @closeDialog="handleClose"
    ></component>

    <div class="search-equip">
      <span>设备名称：</span>
      <el-select v-model="equipName" placeholder="请选择">
        <el-option v-for="(item, index) in equipNameList" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <div class="mobile-search"></div>
      <span>所属学院：</span>
      <el-select v-model="academyName" placeholder="请选择">
        <el-option
          v-for="(item, index) in academyNameList"
          :key="index"
          :label="item.name"
          :value="item.academy"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="searchEquip">搜索</el-button>
    </div>
    <el-table
      :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
    >
      <el-table-column fixed prop="eName" label="设备名称" width="100"></el-table-column>
      <el-table-column prop="eid" label="设备编码" width="150"></el-table-column>
      <el-table-column prop="description" label="设备参数" width="200" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="address" label="设备地址" width="180"></el-table-column>
      <el-table-column prop="academy" label="所属学院" width="300"></el-table-column>
      <el-table-column prop="tName" label="老师姓名" width="150"></el-table-column>
      <el-table-column prop="tel" label="联系方式" width="150"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="borrow(scope.row.eid, scope.$index, tableData)"
          >借用</el-button>
          <el-button type="primary" size="small" @click="getImage(scope.row)">二维码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>

    <el-dialog title="设备二维码" class="display-img" :visible.sync="dialogVisible">
      <img :src="verifyCode" class="img-pic" alt="Loading..." />
      <div class="mobile-save">移动端请长按图片保存</div>
      <el-button type="primary" class="save-img" @click="saveImage">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import ChangePwd from "../../components/sChangePwd";
export default {
  name: "sallList",

  data() {
    let timeout = null;

    return {
      pagesize: 5,
      currentPage: 1,
      tableData: [],
      verifyCode: "",
      dialogVisible: false,
      // 搜索
      equipNameList: ["全部"],
      academyNameList: [
        {
          academy: 0,
          name: "全部"
        }
      ],
      equipName: "全部",
      academyName: 0,
      //修改密码
      dialogFormVisible: false,
      currentComponent: "",
    };
  },
  beforeMount() {
    // 第二次进入首页不再获取信息和弹出修改密码
    if (this.$store.state.Login.userInfo.uid) return;
    //获取信息
    const params = {
      sid: this.$route.query.id || this.$store.state.Login.userInfo.uid
    };

    this.$http
      .get(this.$Api.studentMsg, { params })
      .then(res => {
        const { code, msg, data } = res.data || {};

        this.$store.dispatch("login", res.data);

        if (code !== 0) {
          // 节流处理
          this.timeout = setTimeout(() => {
            this.timeout = null;
          }, 3000);

          this.$message.error(msg);
          return;
        }

        if (data.firstLogin === 0) {
          return this.changePwd();
        }
      })
      .catch(err => {
        console.error(err);
      });
  },
  mounted() {
    // 设备名称
    this.$http
      .get(this.$Api.equipName)
      .then(res => {
        const { code, msg, data } = res.data || {};

        if (code !== 0) {
          return this.$message.error(msg);
        }

        this.equipNameList = _.concat(this.equipNameList, data);
      })
      .catch(err => {
        console.log(err);
        return false;
      });

    // 学院
    this.$http
      .get(this.$Api.academy)
      .then(res => {
        const { code, msg, data } = res.data || {};

        if (code !== 0) {
          return this.$message.error(msg);
        }
        this.academyNameList = _.concat(this.academyNameList, data);
      })
      .catch(err => {
        console.log(err);
        return false;
      });

    // 获取设备list
    this.$http
      .get(this.$Api.allList)
      .then(res => {
        const { code, msg, data } = res.data || {};

        if (code !== 0) {
          return this.$message.error(msg);
        }

        this.tableData = data;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  },
  methods: {
    
    changePwd() {
      this.dialogFormVisible = true;
      this.currentComponent = ChangePwd;
    },
    
    handleClose() {
      this.dialogFormVisible = false;
    },
    // 借用
    borrow(eid, index, rows) {
      this.$confirm("此操作将借用该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            eid: eid,
            sid: this.$store.state.Login.userInfo.uid
          };

          this.$http
            .post(this.$Api.borrow, this.$qs.stringify(params))
            .then(res => {
              const { code, msg, data } = res.data || {};

              if (code !== 0) {
                this.$message.error(msg);
                return;
              }

              this.$message({
                message: data,
                type: "success"
              });
              rows.splice(index, 1);
            })
            .catch(err => {
              console.log(err);
              return false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    // 获取图片
    getImage(index) {
      const params = {
        id: index.eid
      };

      this.$http
        .post(this.$Api.getImage, this.$qs.stringify(params))
        .then(res => {
          const { data } = res.data || {};

          this.dialogVisible = true;
          return "data:image/png;base64," + data;
        })
        .then(data => {
          this.verifyCode = data;
        });
    },

    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
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
    },

    // 搜索
    searchEquip() {
      if (this.timeout) return;
      const params = { eName: this.equipName, academy: this.academyName };
      this.$http
        .get(this.$Api.searchEquip, { params })
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
          this.currentPage = 1;
          this.tableData = data;
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    }
  }
};
</script>

<style lang='less'>
.equip-list {
  .search-equip {
    padding: 20px 0;
    border-bottom: 1px solid #409eff;
    .mobile-search {
      display: none;
    }
  }
  .block {
    margin: 10px;
  }
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
}
@media screen and (max-width: 865px) {
  .equip-list {
    .search-equip {
      .mobile-search {
        display: block;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .el-dialog__wrapper .el-dialog {
    width: 95% !important;
  }
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    overflow: auto;
  }
  .el-message-box {
    width: 95% !important;
  }
  .block {
    .el-pagination {
      .el-pagination__total {
        display: none;
      }
      .el-pagination__sizes {
        display: none;
      }
      .el-pagination__jump {
        display: none;
      }
    }
  }
}
</style>
