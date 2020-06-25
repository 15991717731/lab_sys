import Axios from 'axios'
import context from '../main'
export function tostring(num) {
    return num = num.toString();
}

export function statusName(status) {
    switch (status) {
        case 0:
            return "可借用";
            break;
        case 1:
            return "已借出";
            break;
        case 2:
            return "报修中";
            break;
        case 3:
            return "已报废";
            break;
    }
}

export function bStatusValue(bStatus) {
    switch (bStatus) {
        case 1:
            return "已借用";
            break;
        case 2:
            return "同意";
            break;
        case 3:
            return "不同意";
            break;
    }
}

export function rStatusValue(rStatus) {
    switch (rStatus) {
        case 0:
            return "未申请";
            break;
        case 1:
            return "已申请";
            break;
        case 2:
            return "已归还";
            break;
    }
}



export function identifierStr(str) {
    const keyArr = str.split(",");
    var array = [];
    for (let i = 0; i < keyArr.length; i++) {
        const valueArr = keyArr[i].split(":");
        array.push(valueArr[0])
        array.push(valueArr[1])
    }

    if (array[0] === "id" && array[1] !== "null") {
        const eid = array[1];
        const arr = [eid, 0]
        return arr
    }

    if (array[2] === ' uid' && array[3] != "null") {
        const uid = array[3];
        const arr = [uid, 1]
        return arr;
    }

    if (new RegExp(/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/).test(str)) {
        const arr = [str, 2]
        return arr;
    }

    return ["other", 3]
}


export async function getEquipData(eid) {
    const params = { eid: eid };
    let res;
    res = await Axios.get(context.$Api.getEquipByEid, { params }).then(res => {
        return res
    });
    return res;
}


export async function getStudentMsg(uid) {
    const params = { sid: uid };
    let res;
    res = await Axios.get(context.$Api.studentMsg, { params }).then(res => {
        return res;
    });
    return res;
}

export function barDataArr(data) {
    let barArr = [0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
        switch (data[i].status) {
            case 0:
                barArr[0] = data[i].value;
                break;
            case 1:
                barArr[1] = data[i].value;
                break;
            case 2:
                barArr[2] = data[i].value;
                break;
            case 3:
                barArr[3] = data[i].value;
                break;
        }
    }
    return barArr;
}

    // 压缩图片
    // compress(fileObj, callback) {
    //     if (typeof FileReader === "undefined") {
    //       console.log("当前浏览器内核不支持base64图片压缩");
    //       toLoad(fileObj, callback);
    //     } else {
    //       try {
    //         var reader = new FileReader();
    //         reader.onload = function(e) {
    //           let image = document.getElementById("show-pic");
    //           // image.load(() => {
    //           var squareW = 700, //定义画布大小,也就是图片压缩之后的像素
    //             squareH = 600,
    //             canvas = document.createElement("canvas"),
    //             context = canvas.getContext("2d"),
    //             imageWidth = 0, //压缩图片大小
    //             imageHeight = 0,
    //             offsetX = 0,
    //             offsetY = 0,
    //             data = "";
    //           canvas.width = squareW;
    //           canvas.height = squareH;
    //           context.clearRect(0, 0, squareW, squareH);

    //           if (image.width > squareW) {
    //             imageWidth = Math.round(squareW);
    //             imageHeight = squareH;
    //             offsetX = Math.round((imageWidth - squareW) / 2);
    //           } else {
    //             imageHeight = Math.round(squareH);
    //             imageWidth = squareW;
    //             offsetY = Math.round((imageHeight - squareH) / 2);
    //           }
    //           context.drawImage(image, 0, 0, imageWidth, imageHeight);
    //           var data = canvas.toDataURL("image/jpeg");
    //           console.log(image.size);
    //           callback(data);
    //         };
    //         reader.readAsDataURL(fileObj);
    //       } catch (e) {
    //         console.log("压缩失败!");
    //         //调用不压缩方法
    //         toLoad(fileObj, callback);
    //       }
    //     }
    //   }