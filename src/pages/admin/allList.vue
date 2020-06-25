<template>
  <div class="equip-list">
    <!-- 修改设备管理者 -->
    <el-dialog
      title="修改信息"
      :visible.sync="modifiedVisible"
      @close="closeDialog(modifiedList.tName)"
    >
      <el-form :model="modifiedList" ref="modifiedForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="设备名称" prop="eName">
          <el-input disabled v-model="modifiedList.eName"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="eid">
          <el-input disabled v-model="modifiedList.eid"></el-input>
        </el-form-item>
        <el-form-item label="设备地址" prop="address">
          <el-input disabled v-model="modifiedList.address"></el-input>
        </el-form-item>
        <el-form-item label="设备参数" prop="description">
          <el-input disabled v-model="modifiedList.description"></el-input>
        </el-form-item>
        <el-form-item label="老师姓名" prop="tName">
          <el-select @change="isSubmitTeacher" v-model="modifiedList.tName" placeholder="请选择">
            <el-option
              v-for="(item, index) in teacherIdName"
              :key="index"
              :label="item.name"
              :value="item.tid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院" prop="academy">
          <el-input disabled v-model="modifiedList.academy"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitModified('modifiedForm')">立即修改</el-button>
          <el-button @click="resetForm('modifiedForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查找 -->
    <div class="search-equip">
      <div class="equip-select">
        <span>设备名称：</span>
        <el-select v-model="equipName" placeholder="请选择">
          <el-option
            v-for="(item, index) in equipNameList"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </div>
      <div class="equip-select">
        <span>所属学院：</span>
        <el-select v-model="academyName" placeholder="请选择">
          <el-option
            v-for="(item,index) in academyNameList"
            :key="index"
            :label="item.name"
            :value="item.academy"
          ></el-option>
        </el-select>
      </div>

      <div class="equip-select">
        <span>设备状态：</span>
        <el-select v-model="statusName" placeholder="请选择">
          <el-option
            v-for="(item,index) in statusList"
            :key="index"
            :label="item.name"
            :value="item.status"
          ></el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-search" @click="searchEquip">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
      max-height="400px"
    >
      <el-table-column fixed prop="eName" label="设备名称" width="100"></el-table-column>
      <el-table-column prop="eid" label="设备编码" width="150"></el-table-column>
      <el-table-column
        prop="description"
        label="设备参数"
        width="200"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="address" label="设备地址" width="180"></el-table-column>
      <el-table-column prop="academy" label="所属学院" width="300" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="设备状态" width="150"></el-table-column>
      <el-table-column prop="tName" label="管理者姓名" width="150"></el-table-column>
      <el-table-column prop="tel" label="联系方式" width="150"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="changeTeacher(scope.row)">修改</el-button>
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
      <el-button type="primary" v-if="showSave" class="save-img" @click="saveImage">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import { statusName } from "../../tools/func";
export default {
  name: "allList",

  data() {
    let timeout = null;

    return {
      pagesize: 5,
      currentPage: 1,
      tableData: [],
      verifyCode: "",
      showSave: false,
      dialogVisible: false,
      // 修改
      modifiedVisible: false,
      modifiedList: {},
      teacherIdName: [],
      submitTeacher: false,
      // 搜索
      equipNameList: ["全部"],
      academyNameList: [
        {
          academy: 0,
          name: "全部"
        }
      ],
      statusList: [
        {
          status: -1,
          name: "全部"
        },
        {
          status: 0,
          name: "可借用"
        },
        {
          status: 1,
          name: "已借出"
        },
        {
          status: 2,
          name: "报修中"
        },
        {
          status: 3,
          name: "已报废"
        }
      ],
      statusName: -1,
      equipName: "全部",
      academyName: 0
    };
  },
  beforeMount() {
    // 第二次进入首页不再获取信息
    if (this.$store.state.Login.userInfo.uid) return;
    //获取信息
    const params = {
      aid: this.$route.query.id || this.$store.state.Login.userInfo.uid
    };

    this.$http
      .get(this.$Api.adminMsg, { params })
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
      })
      .catch(err => {
        console.error(err);
      });
  },
  mounted() {
    this.adminList();
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
  },
  methods: {
    // 获取列表
    adminList() {
      this.$http
        .get(this.$Api.adminAllList)
        .then(res => {
          const { code, msg, data } = res.data || {};

          if (code !== 0) {
            return this.$message.error(msg);
          }

          for (let i = 0; i < data.length; i++) {
            data[i].status = statusName(data[i].status);
          }
          this.tableData = data;
        })
        .catch(err => {
          console.log(err);
          return false;
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
          this.dialogVisible = true;
          return "data:image/png;base64," + res.data.data;
        })
        .then(data => {
          this.verifyCode = data;

          this.showSave = true;
        });
    },

    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    // dialog关闭事件
    closeDialog() {
      this.adminList();
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

    isSubmitTeacher() {
      this.submitTeacher = true;
    },

    changeTeacher(row) {
      this.modifiedVisible = true;
      this.modifiedList = row;
      this.teacherIdAndName();
    },

    submitModified(formName) {
      if (this.timeout) return;

      if (!this.submitTeacher) {
        this.$message.error("未修改老师！");
        return;
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            eid: this.modifiedList.eid,
            tid: this.modifiedList.tName
          };
          this.$http
            .post(this.$Api.updateEquipmentTeacher, this.$qs.stringify(params))
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
              this.modifiedVisible = false;
              this.submitTeacher = false;
              this.adminList();
            })
            .catch(err => {
              console.log(err);
              return;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 搜索
    searchEquip() {
      if (this.timeout) return;
      const params = {
        eName: this.equipName,
        academy: this.academyName,
        status: this.statusName
      };
      console.log(params);
      this.$http
        .get(this.$Api.adminAllSearch, { params })
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

          for (let i = 0; i < data.length; i++) {
            data[i].status = statusName(data[i].status);
          }
          this.currentPage = 1;
          this.tableData = data;
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    },

    // 获取老师id和name
    teacherIdAndName() {
      this.$http.get(this.$Api.teacherIdAndName).then(res => {
        const { code, msg, data } = res.data || {};

        if (code !== 0) {
          this.$message.error(msg);
          return;
        }

        this.teacherIdName = data || [];
      });
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>

<style lang='less'>
.equip-list {
  .search-equip {
    padding: 20px 0;
    border-bottom: 1px solid #409eff;
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
@media screen and (max-width: 600px) {
  .el-dialog__wrapper .el-dialog {
    width: 95% !important;
  }
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    overflow: auto;
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
