<template>
  <div>
    <!-- 新增老师 -->
    <el-dialog title="新增老师" :visible.sync="addVisible">
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="老师姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="老师工号" prop="uid">
          <el-input v-model="addForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="addForm.sex" label="0">男</el-radio>
          <el-radio v-model="addForm.sex" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="addForm.nation"></el-input>
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
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">立即新增</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="admin-add-teacher">
      <el-button type="success" @click="addTeacher">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="uid" label="工号" width="130"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="academy" label="学院" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="nation" label="民族" width="100"></el-table-column>
      <el-table-column prop="tel" label="联系方式" width="200"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteTeacher(scope.row.uid, scope.$index, tableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { isInt } from "../../tools/rules";
export default {
  name: "teacherList",

  data() {
    let timeout = null;
    return {
      tableData: [],
      addVisible: false,
      addForm: {
        sex: "0"
      },
      academyOptions: [],
      rules: {
        uid: [
          { required: true, message: "老师工号不能为空", trigger: "blur" },
          { validator: isInt, message: "请输入数字", trigger: "change" }
        ],
        name: {
          required: true,
          message: "老师姓名不能为空",
          trigger: "blur"
        },
        nation: { required: true, message: "民族不能为空", trigger: "blur" },
        tel: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码"
          }
        ],
        academy: { required: true, message: "学院不能为空", trigger: "blur" }
      }
    };
  },
  mounted() {
    this.teacherList();
    this.getAcademyList();
  },
  methods: {
    // 老师列表
    teacherList() {
      this.$http.get(this.$Api.teacherList).then(res => {
        const { code, msg, data } = res.data || {};

        if (code !== 0) {
          this.$message.error(msg);
          return;
        }

        this.tableData = data || [];
      });
    },
    // 删除老师
    deleteTeacher(tid, index, rows) {
      this.$confirm("此操作将删除该老师的权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = { tid: tid };
          this.$http
            .post(this.$Api.adminDeleteTeacher, this.$qs.stringify(params))
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
              this.teacherList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    // 新增老师
    addTeacher() {
      this.addVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        const { academy, name, uid, tel, nation, sex } = this.addForm;
        const params = { tid: uid, name, nation, tel, academy, sex };
        if (valid) {
          this.$http
            .post(this.$Api.adminAddTeacher, this.$qs.stringify(params))
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
              this.addForm = {sex: "0"};
              this.teacherList();
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

    // 学院
    getAcademyList() {
      // 学院
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
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>

<style lang='scss'>
.admin-add-teacher {
  margin-bottom: 20px;
}

@media screen and (max-width: 600px) {
  .el-message-box {
    width: 95% !important;
  }
}
</style>
