<template>
  <div>
    <div class="approval" v-for="(item, index) in List" :key="index">
      <div class="number">审批编号：{{item.mid}}</div>
      <div class="equip">
        <div class="equip-message">设备信息：</div>
        <div class="equip-information">
          <div class="equip-info mobile-html">名称：{{item.eName}}</div>
          <div class="equip-info mobile-html">编号：{{item.eid}}</div>
          
          <el-popover class="equip-info mobile-html"
            placement="top-start"
            title="参数"
            width="200"
            trigger="hover"
            :content="item.description">
          <div slot="reference" class="description">参数：{{item.description}}</div>
          </el-popover>
        </div>
      </div>
      <div class="teacher">
        <div class="approver">审批人：</div>
        <div class="approver-information">
          <div class="mobile-html">姓名：{{item.uName}}</div>
          <div class="mobile-html">工号：{{item.uId}}</div>
          <div class="mobile-html">联系方式：{{item.tel}}</div>
        </div>
      </div>
      <div class="borrow">
        <div class="borrow-information">
          <el-steps :active="item.bStatus === 1 ? 1 : item.rStatus === 2 ? 3 : 2" >
            <el-step title="已申请" status="success"></el-step>
            <el-step
            :description="item.opinion"
            :title='item.bStatus === 1 ? "审批中" : item.bStatus === 2 ? "同意" :"不同意"'
            :status='item.bStatus === 1 ? "wait" : item.bStatus === 2 ? "success" : "error"'
            ></el-step>
            <el-step
            v-if="item.bStatus === 2"
            :title='item.rStatus === 2 ? "已归还" : "未归还"'
            :status='item.rStatus === 2 ? "success" : "wait"'
            ></el-step>
          </el-steps>
          <div class="borrow-btn">
            <el-button v-if="item.bStatus === 2 && item.rStatus === 0" type="primary" @click="repayEquip(item.eid, item.mid)">归还</el-button>  
          </div>
        </div>
      </div>
      
    <div class="date">申请日期：{{item.bDate}}</div>
    </div>
    </div>
    
</template>

<script>
export default {
  name: "approval",

  data() {
    let timeout = null;
    return {
      List: []
    };
  },

  mounted() {
    this.getApprovalList();
  },
  methods: {
    // 获取审批单列表
    getApprovalList() {
      const params = {sid: this.$store.state.Login.userInfo.uid};
      this.$http.get(this.$Api.approvalList, {params}).then(res => {
        
        const { data, msg, code } = res.data || {};

        if (code !== 0) {
          this.$message.error(msg);
          return;
        }

        this.List = data;
      }).catch(err => {
        console.log(err);
        return false
      });
    },
    repayEquip(eid, mid) {
      if(this.timeout) return;
      const params = {eid: eid, sid: this.$store.state.Login.userInfo.uid, mid: mid}
      this.$http.post(this.$Api.repayEquip, this.$qs.stringify(params)).then(res => {
        const {code, msg, data} = res.data || {};

        if (code !== 0) {
          // 节流处理
          this.timeout = setTimeout(() => {
            this.timeout = null;
          }, 3000);
          this.$message.error(msg);
          return;
        }

        this.$message({ message: data, type: "success" });
        this.getApprovalList();

      }).catch(err => {
        console.log(err);
      })
    }
  }
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
    .equip,.borrow, .teacher {
      flex: 2;
      margin: 5px;
      overflow: hidden;
      .equip-message,.approver,.borrow-title {       
        padding: 8px;
        background-color: #fffacd;
      }
      .equip-information,.approver-information,.borrow-information {
        display: flex;
        flex-direction: row;
        padding: 8px;
        .mobile-html {
          flex: 1;
          overflow:hidden; 
          text-overflow:ellipsis; 
          white-space:nowrap;
        }
        .el-steps {
          flex: 1;
        }
        .borrow-btn {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
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
    .equip,.borrow, .teacher {
      display: block;
      .equip-information,.approver-information,.borrow-information {
        display: block;
        .mobile-html {
          line-height: 25px;
        }
      }
    }
    .date {
      text-align: center;
    }
  }
}
</style>
