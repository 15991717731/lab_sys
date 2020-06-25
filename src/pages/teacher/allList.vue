<template>
  <div class="equip-list">
    <!-- 新增 -->
    <el-dialog title="新增设备" :visible.sync="addVisible">
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="设备名称" prop="eName">
          <el-input v-model="addForm.eName"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="eid">
          <el-input v-model="addForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="设备地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="设备参数" prop="description">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="academy">
          <el-select v-model="addForm.academy" placeholder="请选择所属学院">
            <el-option
              v-for="(item, index) in academyOptions"
              :key="index"
              :label="item.name"
              :value="item.academy"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">立即新增</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改密码 -->
    <component
      :dialogFormVisible="dialogFormVisible"
      :is="currentComponent"
      @closeDialog="handleClose"
    ></component>
    <!-- 修改设备信息 -->
    <el-dialog title="修改信息" :visible.sync="modifiedVisible">
      <el-form
        :model="modifiedList"
        :rules="rules"
        ref="modifiedForm"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="设备名称" prop="eName">
          <el-input v-model="modifiedList.eName"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="eid">
          <el-input disabled v-model="modifiedList.eid"></el-input>
        </el-form-item>
        <el-form-item label="设备地址" prop="address">
          <el-input v-model="modifiedList.address"></el-input>
        </el-form-item>
        <el-form-item label="设备参数" prop="description">
          <el-input v-model="modifiedList.description"></el-input>
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
    <!-- 查询 -->
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
        <el-button type="success" @click="addEquipment">新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
    >
      <el-table-column fixed prop="eName" label="设备名称" width="100"></el-table-column>
      <el-table-column prop="eid" label="设备编码" width="150"></el-table-column>
      <el-table-column
        prop="description"
        label="设备参数"
        width="300"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="address" label="设备地址" width="150"></el-table-column>
      <el-table-column prop="academy" label="所属学院" width="300"></el-table-column>
      <el-table-column prop="status" label="当前状态" width="150"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            class="equip-search"
            type="success"
            size="small"
            @click="modified(scope.row)"
          >修改</el-button>
          <el-button
            class="equip-search"
            type="primary"
            size="small"
            @click="getImage(scope.row)"
          >二维码</el-button>
          <el-button
            class="equip-search"
            type="warning"
            size="small"
            @click="fault(scope.row.eid, 2)"
          >报修</el-button>
          <el-button
            class="equip-search"
            type="danger"
            size="small"
            @click="fault(scope.row.eid, 3)"
          >报废</el-button>
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
import { isInt } from "../../tools/rules";
import { statusName, statusBg } from "../../tools/func";
import Vue from "vue";
import ChangePwd from "../../components/tChangePwd";
export default {
  name: "tallList",

  data() {
    let timeout = null;
    return {
      pagesize: 5,
      currentPage: 1,
      tableData: [],
      verifyCode: "",
      dialogVisible: false,
      // 修改
      modifiedVisible: false,
      modifiedList: {},
      // 新增
      addVisible: false,
      addForm: {
        eName: "",
        academy: "",
        address: "",
        eid: "",
        description: ""
      },
      academyOptions: [],
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
      equipName: "全部",
      academyName: 0,
      statusName: -1,
      //修改密码
      dialogFormVisible: false,
      currentComponent: "",
      rules: {
        eid: [
          { required: true, message: "设备id不能为空", trigger: "blur" },
          { validator: isInt, message: "请输入数字", trigger: "change" }
        ],
        address: {
          required: true,
          message: "设备地址不能为空",
          trigger: "blur"
        },
        eName: { required: true, message: "设备名称不能为空", trigger: "blur" },
        academy: { required: true, message: "学院不能为空", trigger: "blur" }
      }
    };
  },

  beforeMount() {
    // 第二次进入首页不再获取信息和弹出修改密码
    if (this.$store.state.Login.userInfo.uid) return;
    //获取信息
    const params = {
      tid: this.$route.query.id || this.$store.state.Login.userInfo.uid
    };

    this.$http
      .get(this.$Api.teacherMsg, { params })
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
    this.getAllEquipment();
    this.getEquipName();
    this.getAcademyName();
  },
  methods: {
    // 修改密码
    changePwd() {
      this.dialogFormVisible = true;
      this.currentComponent = ChangePwd;
    },
    
    handleClose() {
      this.dialogFormVisible = false;
    },
    // 获取学院名称
    getAcademyName() {
      this.$http
        .get(this.$Api.academy)
        .then(res => {
          const { code, msg, data } = res.data || {};

          if (code !== 0) {
            return this.$message.error(msg);
          }
          this.academyOptions = data;
          this.academyNameList = _.concat(this.academyNameList, data);
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    },
    // 获取设备名称
    getEquipName() {
      const params = { tid: this.$store.state.Login.userInfo.uid || this.$route.query.id };
      this.$http
        .get(this.$Api.teacherEquipName, { params })
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
    },
    // 获取设备list
    getAllEquipment() {
      const params = {
        tid: this.$route.query.id || this.$store.state.Login.userInfo.uid
      };
      this.$http
        .get(this.$Api.TEquipment, { params })
        .then(res => {
          const { code, msg, data } = res.data || {};

          if (code !== 0) {
            return this.$message.error(msg);
          }

          this.tableData = data;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].status = statusName(this.tableData[i].status);
          }
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
      const params = {
        eName: this.equipName,
        academy: this.academyName,
        status: this.statusName,
        tid: this.$store.state.Login.userInfo.uid
      };
      this.$http
        .get(this.$Api.tSearchEquip, { params })
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

    //报修报废
    fault(eid, res) {
      if (this.timeout) return;

      this.$confirm("此操作将使设备变为故障设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = { eid: eid, status: res };
          this.$http
            .post(this.$Api.teacherModifiedBtn, this.$qs.stringify(params))
            .then(res => {
              const { data, msg, code } = res.data || {};

              // 节流处理
              this.timeout = setTimeout(() => {
                this.timeout = null;
              }, 3000);

              if (code !== 0) {
                this.$message.error(msg);
                return;
              }

              this.$message({
                message: msg,
                type: "success"
              });
              this.getAllEquipment();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    // 新增
    addEquipment() {
      this.addVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        const params = Object.assign(
          {},
          { tid: this.$store.state.Login.userInfo.uid },
          this.addForm
        );
        if (valid) {
          this.$http
            .post(this.$Api.addEquipment, this.$qs.stringify(params))
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
              this.addVisible = false;
              this.getAllEquipment();
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 修改
    modified(row) {
      this.modifiedVisible = true;
      this.modifiedList = {
        eid: row.eid,
        academy: row.academy,
        address: row.address,
        description: row.description,
        eName: row.eName
      };
    },

    submitModified(formName) {
      if (this.timeout) return;

      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            tid: this.$store.state.Login.userInfo.uid,
            eid: this.modifiedList.eid,
            address: this.modifiedList.address,
            description: this.modifiedList.description,
            eName: this.modifiedList.eName
          };
          this.$http
            .post(this.$Api.teacherModifiedEquip, this.$qs.stringify(params))
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
                message: "修改成功！",
                type: "success"
              });
              this.modifiedVisible = false;
              this.getAllEquipment();
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
    }
  }
};
</script>

<style lang='less'>
.equip-list {
  .search-equip {
    border-bottom: 1px solid #409eff;
    .equip-select {
      margin: 10px;
      .equip-search {
        text-align: right;
      }
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
@media screen and (max-width: 600px) {
  .el-dialog__wrapper .el-dialog {
    width: 95% !important;
  }
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    overflow: auto
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
