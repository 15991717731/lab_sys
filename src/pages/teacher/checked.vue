<template>
  <div>
    <div class="approval" v-for="(item, index) in List" :key="index">
      <div
        class="number"
      >审批编号：{{item.mid}}（{{item.bStatus === 3 ? "不同意" : item.rStatus === 2 ? "已归还" : "未归还"}}）</div>
      <div class="equip">
        <div class="equip-message">设备信息：</div>
        <div class="equip-information">
          <div class="equip-info mobile-html">名称：{{item.eName}}</div>
          <div class="equip-info mobile-html">编号：{{item.eid}}</div>

          <el-popover
            class="equip-info mobile-html"
            placement="top-start"
            title="参数"
            width="200"
            trigger="hover"
            :content="item.description"
          >
            <div slot="reference" class="description">参数：{{item.description}}</div>
          </el-popover>
        </div>
      </div>
      <div class="teacher">
        <div class="approver">借用人：</div>
        <div class="approver-information">
          <div class="mobile-html">姓名：{{item.uName}}</div>
          <div class="mobile-html">学号：{{item.uId}}</div>
          <div class="mobile-html">联系方式：{{item.tel}}</div>
        </div>
      </div>
      <div class="date">申请日期：{{item.bDate}}</div>
      <div class="date" v-if="item.rStatus === 2">归还日期：{{item.rDate}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tchecked",

  data() {
    let timeout = null;
    return {
      List: []
    };
  },

  mounted() {
    const params = { tid: this.$store.state.Login.userInfo.uid };
    this.$http
      .get(this.$Api.teacherChecked, { params })
      .then(res => {
        const { data, msg, code } = res.data || {};
        if (code !== 0) {
          // 节流处理
          this.timeout = setTimeout(() => {
            this.timeout = null;
          }, 3000);

          this.$message.error(msg);
          return;
        }
        this.List = data;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  },

  methods: {}
};
</script>

<style lang='scss'>
.approval {
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  padding: 20px;
  margin-bottom: 20px;
  font-size: 13px;
  .equip,
  .borrow,
  .teacher {
    flex: 2;
    margin: 5px;
    .equip-message,
    .approver,
    .borrow-title {
      padding: 8px;
      background-color: #fffacd;
    }
    .equip-information,
    .approver-information,
    .borrow-information {
      display: flex;
      flex-direction: row;
      padding: 8px;
      .mobile-html {
        flex: 1;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
      .el-steps {
        flex: 1;
      }
    }
  }

  .number {
    flex: 2;
    padding: 8px;
    background-color: #fffacd;
    margin: 5px;
  }
  .date {
    text-align: right;
  }
}
@media screen and (max-width: 768px) {
  .approval {
    padding: 5px;
    display: block;
    .equip,
    .borrow,
    .teacher {
      display: block;
      .equip-information,
      .approver-information,
      .borrow-information {
        display: block;
        .mobile-html {
          line-height: 25px;
        }
      }
    }
    .date {
      text-align: left;
    }
  }
}
</style>
