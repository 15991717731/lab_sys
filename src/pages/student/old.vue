<template>
  <div class="student-identifier">
    <input
      type="file"
      id="id"
      name="image"
      @change="shangc($event)"
      accept="image/jpg, image/jpeg, image/png"
      capture="camera"
    />
    <component
      :equipmentMsg="equipmentMsg"
      :message="message"
      :studentMsg="studentMsg"
      :showRecord="showRecord"
      :is="currentComponent"
    ></component>
  </div>
</template>

<script>
import Api from "../../api";
import {
  identifierStr,
  statusName,
  getEquipData,
  getStudentMsg
} from "../../tools/func";
import BorrowEquipmentForm from "../../components/borrowEquipForm";
import StudentMsg from "../../components/studentMsg";
import Url from "../../components/url";
export default {
  name: "old",

  data() {
    let timeout = null;
    return {
      fileList: [],
      data: "",
      picPath: "",
      equipmentMsg: {
        academy: "",
        address: "",
        description: "",
        eName: "",
        eid: "",
        status: 0,
        tName: "",
        tel: ""
      },
      studentMsg: {},
      message: "",
      showRecord: false,
      currentComponent: ""
    };
  },
  mounted() {},
  methods: {
    shangc(e) {
      // let files = document.getElementById("id").files[0];
      let files = document.getElementById("id").files[0];
      //转码base64
      let reader = new FileReader();
      let imgFile;
      reader.readAsDataURL(files);
      reader.onload = e => {
        imgFile = e.target.result;
        let arr = imgFile.split(",");
        // arr[1] 就是图片的 Base64编码字符串

        //这里的 picPath 'data:image/png;base64,'+ base64为编码字符串拼接形成图片的
        this.picPath = arr[1];

        this.$http
          .post(Api.uploadImg, this.$qs.stringify({ base64Str: this.picPath }))
          .then(res => {
            const { code, msg, data } = res.data || {};

            if (code !== 0) {
              this.$message.error(msg);
              return;
            }

            getEquipData(data).then(res => {
            const { code, msg, data } = res.data || {};

            switch (code) {
              case 0:
                this.equipmentMsg = data;
                this.equipmentMsg.status = statusName(this.equipmentMsg.status);
                this.currentComponent = BorrowEquipmentForm;
                return;
                break;
              case 5003:
                this.message = msg;
                this.currentComponent = Message;
                break;
              default:
                context.$message.error(msg);
                return;
                break;
            }
          });

            // let message = identifierStr(data || {});

            // switch (message[1]) {
            //   case 0:
            //     getEquipData(message[0]).then(res => {
            //       this.equipmentMsg = res;
            //       this.equipmentMsg.status = statusName(
            //         this.equipmentMsg.status
            //       );
            //       this.currentComponent = BorrowEquipmentForm;
            //     });
            //     break;
            //   case 1:
            //     getStudentMsg(message[0]).then(res => {
            //       this.studentMsg = res;
            //       this.currentComponent = StudentMsg;
            //     });
            //     break;
            //   case 2:
            //     this.url = message[0];
            //     this.currentComponent = Url;
            //     break;
            //   default:
            //     this.$message.error("无法识别！");
            //     break;
            // }
          });
      };
    }
  }
};
</script>

<style lang='scss'>
.student-identifier {
  .display-equipment-message {
    margin-top: 20px;
  }
}
</style>
