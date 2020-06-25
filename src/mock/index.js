import Mock from 'mockjs';

const loginData = {
  "code": 0,
  "msg": "success",
  "data": {}
}

const loginDat = {
  "code": 0,
  "msg": "success",
  "data": {
    "uid": "03161187",
    "password": "123456",
    "name": "wmy",
    "sex": 1,
    "nation": "汉",
    "academy": "通信与信息工程学院",
    "grade": "2016",
    "major": "通信工程",
    "clazz": "通工1606",
    "tel": "15917114484"
  }
}

const studentData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": {
      "uid": "03161186",
      "password": "123456",
      "name": "wmy",
      "sex": 1,
      "nation": "汉",
      "academy": "通信与信息工程学院",
      "grade": "2016",
      "major": "通信工程",
      "clazz": "通工1606",
      "tel": "15917114484",
      firstLogin: 0
    }
  }
}

const academyData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [{
      academy: "0",
      name: '通信与信息工程学院'
    }, {
      academy: "1",
      name: '计算机学院',
    }, {
      academy: "2",
      name: '数学院'
    }, {
      academy: "3",
      name: '电子工程学院'
    }]
  }
}

const modified = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": {}
  }
}

const teachData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": {
      uid: "123456",
      name: "廖雪峰",
      sex: 0,
      nation: "维吾尔",
      academy: 0,
      tel: "13892400625",
      firstLogin: 0,
      clazz: "",
      grade: "",
      major: "",
    }
  }
}

const equipmentData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": {
      eid: "0213456121",
      tid: "0516454823154",
      e_name: "示波器",
      address: "通院101",
      academy: 0,
      descripton: "fdasfdafdasfdsafdasfsafndjhfdasfdasfdsfasdfadsfdasfdfsafdfaasf",
      status: 0
    }
  }
}

const allList = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        eid: "0213456121",
        tid: "0516454823154",
        e_name: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafdasfdafdfdksafndkjfuhifdansfkdasnfahufeuwfadfadfgaewaefdsafd",
        tel: "15991717731"
      },
      {
        eid: "0213456122",
        tid: "0516454823154",
        e_name: "示波器",
        address: "通院101",
        academy: 0,
        description: "",
        tel: "15991717731"
      },
      {
        eid: "0213456123",
        tid: "0516454823154",
        e_name: "示波器",
        address: "通院101",
        academy: 0,
        description: "",
        tel: "15991717731"
      },
      {
        eid: "0213456124",
        tid: "0516454823154",
        e_name: "示波器",
        address: "通院101",
        academy: 0,
        description: "",
        tel: "15991717731"
      },
    ]
  };
}

const borrow = () => {
  return {
    "code": 1,
    "msg": "success",
    "data": {}
  }
}

const getImage = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": {}
  }
}

const uploadImage = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": "设备ID: '0123', 设备名称: 'aaa', 设备地址: 'bbb'"
  }
}

const newPwd = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": {}
  }
}

const equipName = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": ["0", "1", "示波器", "焊枪", "面包板", "电源", "钳子", "网线", "焊锡"]
  }
}

const searchEquip = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [{
      eid: "0213456121",
      tid: "0516454823154",
      e_name: "示波器",
      address: "通院101",
      academy: 0,
      description: "",
      tel: "15991717731"
    },
    {
      eid: "0213456122",
      tid: "0516454823154",
      e_name: "示波器",
      address: "通院101",
      academy: 0,
      description: "",
      tel: "15991717731"
    },
    {
      eid: "0213456123",
      tid: "0516454823154",
      e_name: "示波器",
      address: "通院101",
      academy: 0,
      description: "",
      tel: "15991717731"
    },
    ]
  }
}

const approvalList = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        "bDate": "2020-04-15T01:51:09.795Z",
        "bStatus": 1,
        "description": "打发打发发达多发点爱上发涩发我但是发热健康和",
        "eName": "string",
        "eid": "string",
        "mid": 0,
        "opinion": "string",
        "rDate": "2020-04-15T01:51:09.795Z",
        "rStatus": 0,
        "tel": "string",
        "uId": "03161186",
        "uName": "王梦媛"
      }, {
        "bDate": "2020-04-15T01:51:09.795Z",
        "bStatus": 2,
        "description": "打发打发发达多发点爱上发涩发我但是发热健康和",
        "eName": "string",
        "eid": "string",
        "mid": 0,
        "opinion": "string",
        "rDate": "2020-04-15T01:51:09.795Z",
        "rStatus": 0,
        "tel": "string",
        "uId": "string",
        "uName": "string"
      }, {
        "bDate": "2020-04-15T01:51:09.795Z",
        "bStatus": 2,
        "description": "打发打发发达多发点爱上发涩发我但是发热健康和",
        "eName": "string",
        "eid": "string",
        "mid": 0,
        "opinion": "string",
        "rDate": "2020-04-15T01:51:09.795Z",
        "rStatus": 2,
        "tel": "string",
        "uId": "string",
        "uName": "string"
      }, {
        "bDate": "2020-04-15T01:51:09.795Z",
        "bStatus": 3,
        "description": "打发打发发达多发点爱上发涩发我但是发热健康和",
        "eName": "string",
        "eid": "string",
        "mid": 0,
        "opinion": "string",
        "rDate": "2020-04-15T01:51:09.795Z",
        "rStatus": 0,
        "tel": "string",
        "uId": "string",
        "uName": "string"
      }
    ]
  }
}

const teacherEquipList = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        status: 0
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        status: 0
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        status: 0
      },
    ]
  }

}

const equipStatus = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        status: 1,
        name: "可借用",
      },
      {
        status: 2,
        name: "已借用",
      },
      {
        status: 3,
        name: "已报修",
      },
      {
        status: 4,
        name: "已报废",
      }
    ]
  }
}

const checkedData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [{
      "bDate": "2020-04-14T06:04:19.823Z",
      "bStatus": 3,
      "description": "string",
      "eName": "string",
      "eid": "string",
      "opinion": "string",
      "rDate": "2020-04-14T06:04:19.823Z",
      "rStatus": 0,
      "tel": "string",
      "uName": "string",
      "uId": "03161186"
    },{
      "bDate": "2020-04-14T06:04:19.823Z",
      "bStatus": 2,
      "description": "string",
      "eName": "string",
      "eid": "string",
      "opinion": "string",
      "rDate": "2020-04-14T06:04:19.823Z",
      "rStatus": 0,
      "tel": "string",
      "uName": "string",
      "uId": "03161186"
    },{
      "bDate": "2020-04-14T06:04:19.823Z",
      "bStatus": 2,
      "description": "string",
      "eName": "string",
      "eid": "string",
      "opinion": "string",
      "rDate": "2020-04-14T06:04:19.823Z",
      "rStatus": 2,
      "tel": "string",
      "uName": "string",
      "uId": "03161186"
    }
  ]
  }
}

const checkData = () => {
  return {
    "code": 0,
    "data": [
      {
        "bDate": "2020-04-14T06:19:05.325Z",
        "bStatus": 1,
        "description": "string",
        "eName": "string",
        "eid": "string",
        "opinion": "string",
        "rDate": "2020-04-14T06:19:05.325Z",
        "rStatus": 0,
        "tel": "string",
        "uName": "string",
        "uId": "03161186"
      },{
        "bDate": "2020-04-14T06:19:05.325Z",
        "bStatus": 2,
        "description": "string",
        "eName": "string",
        "eid": "string",
        "opinion": "string",
        "rDate": "2020-04-14T06:19:05.325Z",
        "rStatus": 0,
        "tel": "string",
        "uName": "string",
        "uId": "03161186"
      },{
        "bDate": "2020-04-14T06:19:05.325Z",
        "bStatus": 3,
        "description": "string",
        "eName": "string",
        "eid": "string",
        "opinion": "string",
        "rDate": "2020-04-14T06:19:05.325Z",
        "rStatus": 0,
        "tel": "string",
        "uName": "string",
        "uId": "03161186"
      },{
        "bDate": "2020-04-14T06:19:05.325Z",
        "bStatus": 2,
        "description": "string",
        "eName": "string",
        "eid": "string",
        "opinion": "string",
        "rDate": "2020-04-14T06:19:05.325Z",
        "rStatus": 1,
        "tel": "string",
        "uName": "string",
        "uId": "03161186"
      }
    ],
    "msg": "success"
  }
}

const updateBData = () => {
  return {
    "code": 0,
    "data": "string",
    "msg": "string"
  }

}

const updateRData = () => {
  return {
    "code": 0,
    "data": "string",
    "msg": "string"
  }

}

const studentRepay = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": "string",
  }
}

const addEquipData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": "string"
  }
}


const teacherBarData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [10, 20, 5, 31]
  }
}

const teacherPieData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      { value: 335, name: '示波器', status: 0 },
      { value: 310, name: '焊枪', status: 0 },
      { value: 234, name: '面包板', status: 0 },
      { value: 135, name: '电源', status: 0 },
    ]
  }
}

const teacherBarData2 = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [5, 20, 5, 31]
  }
}

const ModifiedEquipmentData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": ""
  }
}

const teacherRepairData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        eid: "0213456123",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456124",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456125",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456122",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
      {
        eid: "0213456123",
        eName: "示波器",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      }
    ]
  }
}

const teacherScrapData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        eid: "0213456123",
        eName: "焊枪",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
    ]
  }
}

const teacherSearchRepair = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        eid: "0213456123",
        eName: "焊枪",
        address: "通院101",
        academy: 0,
        description: "dafhdafhudnfkasdfjdsahfdaskjnefhusadjcdshfoasfhdkjbfajdsf",
        date: "2019-5-15"
      },
    ]
  }
}

const LineData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      ['2019-10-10', 200],
      ['2019-10-11', 400],
      ['2019-10-12', 650],
      ['2019-10-13', 500],
      ['2019-10-14', 250],
      ['2019-10-15', 300],
      ['2019-10-16', 450],
      ['2019-10-17', 300],
      ['2019-10-18', 100]
    ]
  }
}

const byEid = () => {
  return {
    "code": 0,
    "data": {
      "academy": "string",
      "address": "string",
      "description": "string",
      "eName": "string",
      "eid": "string",
      "status": 0,
      "tName": "string",
      "tel": "string"
    },
    "msg": "string"
  }
}

const teacherBarSelect = () => {
  return {
    "code": 0,
    "msg": "sccess",
    "data": ['a', 'b']
  }
}

const modifiedStatusData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": ""
  }
}

const adminAllList = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [{
      eid: "0213456121",
      tName: "aaa",
      eName: "示波器",
      address: "通院101",
      academy: 0,
      status: 0,
      description: "dafdasfdafdfdksafndkjfuhifdansfkdasnfahufeuwfadfadfgaewaefdsafd",
      tel: "15991717731"
    },
    {
      eid: "0213456122",
      tid: "0516454823154",
      eName: "示波器",
      address: "通院101",
      academy: 0,
      status: 1,
      description: "",
      tel: "15991717731"
    },
    ]
  }
}

const AdminUserInfo = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": {
      uid: "123456",
      name: "廖雪峰",
      sex: 0,
      nation: "维吾尔",
      academy: 0,
      tel: "13892400625",
      firstLogin: 0,
      clazz: "",
      grade: "",
      major: "",
    }
  }
}

const deleteTeacher = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": ""
  }
}

const teacherListData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        uid: "123456",
        name: "廖雪峰",
        sex: 0,
        nation: "维吾尔",
        academy: 0,
        tel: "13892400625",
        firstLogin: 0,
        clazz: "",
        grade: "",
        major: "",
      },
      {
        uid: "123456",
        name: "廖雪峰",
        sex: 0,
        nation: "维吾尔",
        academy: 0,
        tel: "13892400625",
        firstLogin: 0,
        clazz: "",
        grade: "",
        major: "",
      },
      {
        uid: "123456",
        name: "廖雪峰",
        sex: 0,
        nation: "维吾尔",
        academy: 0,
        tel: "13892400625",
        firstLogin: 0,
        clazz: "",
        grade: "",
        major: "",
      },
      {
        uid: "123456",
        name: "廖雪峰",
        sex: 0,
        nation: "维吾尔",
        academy: 0,
        tel: "13892400625",
        firstLogin: 0,
        clazz: "",
        grade: "",
        major: "",
      },
    ]
  }
}

const addTeacherData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": ""
  }
}

const normalData = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": ""
  }
}

const teacherIdAndName = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        id: "2323456",
        name: "aaa",
      },
      {
        id: "2323457",
        name: "aab",
      },
      {
        id: "2323458",
        name: "aac",
      },
      {
        id: "2323459",
        name: "aad",
      }
    ]
  }
}

const studentBorrowRecord = () => {
  return {
    "code": 0,
    "msg": "success",
    "data": [
      {
        eid: "123",
        eName: "示波器",
        bStatus: 2,
        rStatus: 0,
        rDate: "2019-8-9",
        bDate: "2019-9-8",
      },

      {
        eid: "123",
        eName: "示波器",
        bStatus: 3,
        rStatus: 0,
        rDate: "2019-8-9",
        bDate: "",
      },
      {
        eid: "123",
        eName: "示波器",
        bStatus: 2,
        rStatus: 1,
        rDate: "2019-8-9",
        bDate: "",
      },
      {
        eid: "123",
        eName: "示波器",
        bStatus: 2,
        rStatus: 2,
        rDate: "2019-8-9",
        bDate: "",
      }
    ]
  }
}

const updateEquipmentTeacher = () => {
  return {
    code: 0,
    msg: "success",
    data: {

    }
  }
}

// 登录页面
Mock.mock('/login?id=03161186&password=123456&idInfo=0', 'get', loginData)
// Mock.mock('/login?id=03161187&password=123456&idInfo=0', 'get', loginDat)
Mock.mock('/login?id=123456&password=123456&idInfo=1', 'get', loginData);
Mock.mock('/login?id=123456&password=123456&idInfo=2', 'get', loginData);

// 学生端个人中心页面
Mock.mock('/student/getStudentInfo?sid=03161186', 'get', studentData)

// 学生归还设备
Mock.mock('/equipment/returnEquipment', 'post', studentRepay)

// 学院参数
Mock.mock('/college/getCollegeInfo', 'get', academyData)

// 修改资料
Mock.mock('/student/updateStudentInfo', 'post', modified)

// 学生端设备列表
Mock.mock('/equipment/getFreeEquipment', 'get', allList)

// 借用设备
Mock.mock('/equipment/borrowEquipment', 'post', borrow);

// 获取二维码
Mock.mock('/QRCode/createQRCode', 'post', getImage);

// 上传图片
Mock.mock('/QRCode/readQRCode', 'post', uploadImage);

// 根据id拿设备信息
Mock.mock('/equipment/getEquipmentByEid?eid=0123', 'get', byEid)

// 修改密码
Mock.mock('/student/updatePassword', 'post', newPwd)

// 设备名称
Mock.mock('/equipment/getEquipmentName', 'get', equipName)

// 搜索设备
Mock.mock('/equipment/getEquipmentByCondition', 'get', searchEquip)

// 审批列表
Mock.mock('/student/getCheckingEquipment?sid=03161186', 'get', approvalList)

// 学生端折线图数据
Mock.mock('/student/getBorrowData?sid=03161186', 'get', LineData)

// 老师端列表
Mock.mock('/teacher/getManageEquipment?tid=123456', 'get', teacherEquipList)

//设备状态接口
Mock.mock('/equipment/status', 'get', equipStatus)

//老师信息接口
Mock.mock('/teacher/getTeacherInfo?tid=123456', teachData)

// 老师已审核接口
Mock.mock('/teacher/getManagedEquipment?tid=123456', 'get', checkedData)

// 老师未审核接口
Mock.mock('/teacher/getManagingEquipment?tid=123456', 'get', checkData)

// 老师修改信息接口
Mock.mock('/teacher/updateTeacherInfo', 'post', modified)

// 老师审批借用信息
Mock.mock('/teacher/updateManageBstatus', 'post', updateBData)

// 老师审批归还设备
Mock.mock('/teacher/updateManageRstatus', 'post', updateRData)

// 老师新增设备
Mock.mock('/equipment/insertEquipment', 'post', addEquipData)

// 老师端柱状图数据
Mock.mock('/equipment/getEquipmentCountByEName?tid=123456&eName=a', 'get', teacherBarData)
Mock.mock('/equipment/getEquipmentCountByEName?tid=123456&eName=b', 'get', teacherBarData2)

// 老师柱状图select
Mock.mock('/equipment/getEquipmentNameByTid?tid=123456', 'get', teacherBarSelect)

// 老师端饼状图数据
Mock.mock('/equipment/getEquipmentCount?tid=123456', 'get', teacherPieData);

// 老师端修改设备信息
Mock.mock('/equipment/updateEquipmentInfo', 'post', ModifiedEquipmentData)

// 老师端报修报废列表
Mock.mock('/admin/getMalfunctionEquipment?status=2', 'get', teacherRepairData)
Mock.mock('/admin/getMalfunctionEquipment?status=3', 'get', teacherScrapData)

//老师端报修列表搜索
Mock.mock('/teacher/searchRepairEquipment?&eid=0123', 'get', teacherSearchRepair);

//老师端报废列表搜索
Mock.mock('/teacher/searchScraEquipment?eid=0123', 'get', teacherSearchRepair)

//老师端报修报废
Mock.mock('/equipment/updateEquipmentStatus?eid=0213456122&status=2', 'post', modifiedStatusData);
Mock.mock('/equipment/updateEquipmentStatus?eid=0213456122&status=3', 'post', modifiedStatusData);

// 管理员端设备列表
Mock.mock('/admin/getAllEquipment', 'get', adminAllList);

// 管理员端管理员信息
Mock.mock('/admin/getAdminInfo?aid=123456', 'get', AdminUserInfo);

// 管理员端设备变正常
Mock.mock('/equipment/updateEquipmentStatus', 'post', normalData);

// 管理员端老师列表
Mock.mock('/admin/getAllTeacher', 'get', teacherListData)

// 管理员端删除老师
Mock.mock('/admin/deleteTeacher', 'post', deleteTeacher);

// 管理员端新增老师
Mock.mock('/admin/insertTeacher', 'post', addTeacherData);

// 管理员端修改密码
Mock.mock('/admin/updatePassword', 'post', newPwd);

// 管理员端修改老师
Mock.mock('/admin/updateEquipmentTeacher', 'post', updateEquipmentTeacher);

// 管理员端修改老师下拉菜单
Mock.mock('/admin/getTeacherInfo', 'get', teacherIdAndName);

// 管理员端获取学生借用记录
Mock.mock('/student/record?sid=03161186', 'get', studentBorrowRecord);