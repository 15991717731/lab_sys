<template>
  <div class="student-identifier">
    <div class="take-photo">
      <video id="v" style=" width: 45%;height: 100%;display: inline-block; margin-right: 9%"></video>
      <canvas id="canvas" style="display:none;"></canvas>
      <img src style="display: none;width: 45%;height: 100%;" id="photo" alt="photo" />
      <el-button
        type="primary"
        id="take"
        style="display: block; margin: 10px auto;"
        @click="takePhoto"
      >拍照</el-button>
    </div>
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
import context from "../../main";
import Axios from "axios";
import {
  identifierStr,
  statusName,
  getEquipData,
  getStudentMsg
} from "../../tools/func";
import BorrowEquipmentForm from "../../components/borrowEquipForm";
import StudentMsg from "../../components/studentMsg";
import Message from "../../components/message";
export default {
  name: "new",

  data() {
    let timeout = null;
    return {
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
  mounted() {
    this.init();
  },
  methods: {
    takePhoto(videoPlaying) {
      let that = this;
      if (videoPlaying) {
        let canvas = document.getElementById("canvas");
        let photo = document.getElementById("photo");
        let vWidth = v.videoWidth;
        let vHeight = v.videoHeight;
        canvas.width = vWidth;
        canvas.height = vHeight;
        photo.style.width = vWidth;
        photo.style.height = vHeight;
        photo.style.display = "inline-block";
        canvas.getContext("2d").drawImage(v, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL("image/png");

        document.getElementById("photo").setAttribute("src", data);
        this.picPath = data.slice(22);

        context.$http
          .post(
            context.$Api.uploadImg,
            context.$qs.stringify({ base64Str: this.picPath })
          )
          .then(res => {
            const { code, msg, data } = res.data || {};

            if (code !== 0) {
              context.$message.error(msg);
              return;
            }

            getEquipData(data).then(res => {
              const { code, msg, data } = res.data || {};

              switch (code) {
                case 0:
                  this.equipmentMsg = data;
                  this.equipmentMsg.status = statusName(
                    this.equipmentMsg.status
                  );
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
          });
      }
    },
    init() {
      // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // navigator.mediaDevices.getUserMedia提示用户给予使用媒体输入的许可
      if (navigator.mediaDevices.getUserMedia === undefined) {
        // constraints指定了请求的媒体类型和对应的参数
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先，如果有getUserMedia的话，就获得它
          var getUserMedia =
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
          if (!getUserMedia) {
            return Promise.reject(new Error("此浏览器未实现媒体输入许可。"));
          }

          // 否则，为老的navigator.getUserMedia方法包裹一个Promise
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      const constraints = {
        video: true,
        audio: false
      };
      let videoPlaying = false;
      let v = document.getElementById("v");
      let promise = navigator.mediaDevices.getUserMedia(constraints);
      promise
        .then(stream => {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in v) {
            v.srcObject = stream;
          } else {
            // 防止再新的浏览器里使用它，应为它已经不再支持了
            v.src = window.URL.createObjectURL(stream);
          }
          // video元数据加载后触发
          v.onloadedmetadata = function(e) {
            v.play();
            videoPlaying = true;
          };
        })
        .catch(err => {
          console.error(err.name + ": " + err.message);
        });
      this.takePhoto(videoPlaying);
    }
  }
};
</script>

<style lang='scss'>
.student-identifier {
  .take-photo {
    width: 100%;
  }
}
</style>
