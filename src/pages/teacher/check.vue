<template>
  <div>
    <div class="approval" v-for="(item, index) in List" :key="index" v-if="haveList">
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
        <div class="approver">借用人：</div>
        <div class="approver-information">
          <div class="mobile-html">姓名：{{item.uName}}</div>
          <div class="mobile-html">学号：{{item.uId}}</div>
          <div class="mobile-html">联系方式：{{item.tel}}</div>
        </div>
      </div>
      <div class="borrow">
        <div class="borrow-title">借用审批：</div>
        <div class="borrow-information">
          <el-steps :active="item.bStatus === 1 ? 1 : 2">
            <el-step title="已申请" status="success"></el-step>
            <el-step
          :description="item.opinion"
          :title='item.bStatus === 1 ? "待审核" : item.bStatus === 2 ? "同意" :"不同意"'
          :status='item.bStatus === 1 ? "wait" : item.bStatus === 2 ? "success" : "error"'
            ></el-step>
          </el-steps>
          <div class="borrow-btn teacher-approval">
            <div class="borrow-button">
                <el-button size="mini" @click="agree(item.mid, item.uId, item.eid, 2, item.opinion)" type="primary" v-if="item.bStatus === 1" round>同意</el-button>
                <el-button size="mini" @click="agree(item.mid, item.uId, item.eid, 3, item.opinion)" type="danger" v-if="item.bStatus === 1" round>不同意</el-button>
            </div>
            <div class="borrow-opinion">
                <el-input
                 v-if="item.bStatus === 1"
                  placeholder="请输入审核意见"
                v-model="item.opinion"
                clearable>
                </el-input>
            </div>
          </div>
        </div>
      </div>
      
      <div class="borrow">
        <div class="borrow-title" v-if="item.rStatus !== 0">归还审批：</div>
        <div class="borrow-information" v-if="item.rStatus !== 0">
          <el-steps :active="0">
            <el-step
            :title='item.rStatus === 0 ? "待申请" : "已申请"'
            :status='item.rStatus === 0 ? "wait" : "success"'
            ></el-step>
            <el-step
            :title='item.rStatus === 2 ? "已归还" : "待审核"'
            :status='item.rStatus === 2 ? "success" : "wait"'
            ></el-step>
          </el-steps>
          <div class="borrow-btn">
            <el-button size="mini" @click="repay(item.mid, item.uId, item.eid, 2)" type="primary" v-if="item.rStatus === 1" round>确认</el-button>
          </div>
        </div>
      </div>
      <div class="date">申请日期：{{item.bDate}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tcheck",

  data() {
    let timeout = null;
    return {
      List: [],
      isClick: true,
      haveList: true,
      opinion: "",
    };
  },

  mounted() {
      this.getList();
  },

  methods: {
      getList(){
    const params = { tid: this.$store.state.Login.userInfo.uid };
    this.$http
      .get(this.$Api.teacherCheck, { params })
      .then(res => {
        const { data, msg, code } = res.data || {};
        
        if (data === null) {
          this.haveList = false
        }

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
      agree(mid, uid, eid, res, opinion) {
          const params = {bStatus: res, eid: eid, sid: uid, opinion: opinion, mid: mid }
          this.$http.post(this.$Api.updateBstatus, this.$qs.stringify(params)).then(res=>{
              const {code, msg, data} = res.data || {};

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
            this.getList();
          }).catch(err=>{

          })
      },

      repay(mid, uid, eid, res){
          const params = {rStatus: res, eid: eid, sid: uid, mid }
          this.$http.post(this.$Api.updateRstatus, this.$qs.stringify(params)).then(res=>{
              const {code, msg, data} = res.data || {};

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
            this.getList();
          }).catch(err=>{
            console.log(err);
          })
      },
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
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        }
        .el-steps {
          flex: 1;
        }
        .teacher-approval {
          display: flex;
          flex-direction: column;
          .borrow-opinion {
            flex: 1;
            margin-top: 10px;
          }
          .borrow-button {
              flex: 1;
          }
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
