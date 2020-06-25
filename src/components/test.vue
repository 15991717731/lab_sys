<template>
  <div class="student-identifier">
    <div class="photo-upload">
      <div class="take-tip">移动端拍照时请尽量少包含与二维码无关信息</div>
      <a target="_black" class="file">
        选择文件
        <input
          type="file"
          id="show-img"
          name="image"
          ref="input_btn"
          @change="readQR($event)"
          accept="image/*"
          mutiple="mutiple"
        />
      </a>

      <img id="show-pic" src="../assets/img_bg.png" alt />
      <el-button type="text" :loading="loading"></el-button>
    </div>
    <component
      :equipmentMsg="equipmentMsg"
      :message="message"
      :is="currentComponent"
      :borrowBtn="borrowBtn"
    ></component>
  </div>
</template>

<script>
const imageConversion = require("image-conversion");
import { statusName, getEquipData } from "../tools/func";
import BorrowEquipmentForm from "./borrowEquipForm";
import Message from "./message";
import ResultsMsg from "../components/resultsMsg";
export default {
  name: "sidentifier",

  props: {
    borrowBtn: Boolean
  },

  data() {
    let timeout = null;
    return {
      fileImg: "",
      data: "",
      picPath: "",
      message: "",
      maxSize: 1024 * 1024,
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
      showRecord: false,
      loading: false,
      currentComponent: ""
    };
  },
  mounted() {
    this.isIos();
  },
  methods: {
    isIos() {
      //获取浏览器的userAgent,并转化为小写
      var ua = navigator.userAgent.toLowerCase(); //判断是否是苹果手机，是则是true
      var isIos = ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1;
      if (isIos) {
        document.getElementById("show-img").removeAttribute("capture");
      }
    },
    readQR(e) {
      this.currentComponent = "";
      this.loading = true;

      this.fileImg = this.$refs.input_btn.files[0];
      let that = this;
      if (this.fileImg.size > this.maxSize) {
        imageConversion
          .compressAccurately(this.fileImg, {width: 300, height: 450,size: 200})
          .then(res => {
            this.QR(res);
            console.log(res);
          });
      } else {
        this.QR(this.fileImg);
      }
    },

    // 上传图片
    QR(res) {
      var imageFile = new FormData();
      imageFile.append("image", res);
      imageFile.append("groupId", 64)
      // 请求头
      let config = {
        //添加请求头
        headers: {
          "Content-Type": "multipart/form-data;boundary = " + new Date().getTime()
        }
      };
      console.log(imageFile.get("image"));
      this.$http.post(this.$Api.uploadImg, imageFile, config).then(res => {
        const { code, msg, data } = res.data || {};

        this.loading = false;

        if (code !== 0) {
          this.$message.error(msg);
          return;
        }

        if (JSON.parse(data).error_code) {
          this.$message.error("无法识别！");
          return;
        }

        const { log_id, codes_result_num, codes_result } =
          JSON.parse(data) || {};

        if (codes_result_num === 0) {
          this.$message.error("未识别到二维码");
          return;
        }

        if (codes_result_num >= 2 || codes_result[0].text.length > 1) {
          this.message = codes_result;
          this.currentComponent = ResultsMsg;
          return;
        }

        const qr = codes_result[0].text[0];
        getEquipData(qr).then(res => {
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
              this.$message.error(msg);
              return;
              break;
          }
        });
      });
    },

    toLoad(data) {
      this.picPath = data.split(",")[1];

      this.$http
        .post(
          this.$Api.uploadImg,
          this.$qs.stringify({ base64Str: this.picPath })
        )
        .then(res => {
          const { code, msg, data } = res.data || {};

          this.loading = false;

          if (code !== 0) {
            this.$message.error(msg);
            return;
          }

          if (JSON.parse(data).error_code) {
            this.$message.error("无法识别！");
            return;
          }

          const { log_id, codes_result_num, codes_result } =
            JSON.parse(data) || {};

          if (codes_result_num === 0) {
            this.$message.error("未识别到二维码");
            return;
          }

          if (codes_result_num >= 2 || codes_result[0].text.length > 1) {
            this.message = codes_result;
            this.currentComponent = ResultsMsg;
            return;
          }

          const qr = codes_result[0].text[0];
          getEquipData(qr).then(res => {
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
                this.$message.error(msg);
                return;
                break;
            }
          });
        });
    }
  }
};
</script>

<style lang='scss'>
.student-identifier {
  .photo-upload {
    height: 50px;
    margin-bottom: 20px;
    .take-tip {
      font-size: 8px;
      color: red;
      margin-bottom: 10px;
    }
    .file {
      position: relative;
      display: inline-block;
      background: #409eff;
      border: 1px solid #409eff;
      border-radius: 4px;
      padding: 8px 12px;
      overflow: hidden;
      color: #fff;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
      #show-img {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
      }
    }
    #show-pic {
      height: 45px;
    }
  }
}
</style>
