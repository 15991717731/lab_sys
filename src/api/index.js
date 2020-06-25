// const baseUrl = process.env.BASE_API;
const baseUrl = "http://59.110.55.19:9090";
const api = {
    // 登录
    login: baseUrl + '/login',
    // 学生个人中心
    studentMsg: baseUrl + '/student/getStudentInfo',
    // 修改资料
    modifiedStudent: baseUrl + '/student/updateStudentInfo',
    // 学院
    academy: baseUrl + '/college/getCollegeInfo',
    // 学生端设备list
    allList: baseUrl + '/equipment/getFreeEquipment',
    // 借用端口
    borrow: baseUrl + '/equipment/borrowEquipment',
    // 展示二维码接口
    getImage: baseUrl + '/QRCode/createQRCode',
    // 上传图片
    uploadImg: baseUrl + '/QRCode/readQRCode',
    // 根据id拿设备信息
    getEquipByEid: baseUrl + '/equipment/getEquipmentByEid',
    // 修改密码
    changePwd: baseUrl + '/student/updatePassword',
    // 设备名称
    equipName: baseUrl + '/equipment/getEquipmentName',
    // 搜索设备学生端
    searchEquip: baseUrl + '/equipment/getEquipmentByCondition',
    // 搜索设备老师端
    tSearchEquip: baseUrl + '/equipment/getEquipmentByConditions',
    // 老师端搜索的设备名称下拉单
    // getTidEquipment: baseUrl + '/equipment/getEquipmentNameByTid',
    // 审批列表
    approvalList: baseUrl + '/student/getCheckingEquipment',
    // 学生端归还设备
    repayEquip: baseUrl + '/equipment/returnEquipment',
    // 学生端折线图数据
    borrowNumber: baseUrl + '/student/getBorrowData',
    // 老师端的设备列表
    TEquipment: baseUrl + '/teacher/getManageEquipment',
    // 设备状态的接口
    equipmentStatus: baseUrl + '/equipment/status',
    // 老师的信息
    teacherMsg: baseUrl + '/teacher/getTeacherInfo',
    // 老师已审核
    teacherChecked: baseUrl + '/teacher/getManagedEquipment',
    // 老师未审核
    teacherCheck: baseUrl + '/teacher/getManagingEquipment',
    // 提交老师信息
    modifiedTeacher: baseUrl + '/teacher/updateTeacherInfo',
    // 老师审批借用信息
    updateBstatus:  baseUrl + '/teacher/updateManageBstatus',
    // 老师审批归还设备
    updateRstatus: baseUrl + '/teacher/updateManageRstatus',
    // 老师端修改密码
    teacherChangePwd: baseUrl + '/teacher/updatePassword',
    // 老师新增设备
    addEquipment: baseUrl + '/equipment/insertEquipment',
    // 老师端柱状图数据
    teacherBarData: baseUrl + '/equipment/getEquipmentCountByEName',
    // 老师端柱状图选择菜单
    teacherEquipName: baseUrl + '/equipment/getEquipmentNameByTid',
    // 老师端饼状图数据
    teacherPieData: baseUrl + '/equipment/getEquipmentCount',
    // 老师端修改设备信息
    teacherModifiedEquip: baseUrl + '/equipment/updateEquipmentInfo',
    // 老师端报修报废按钮
    teacherModifiedBtn: baseUrl + '/equipment/updateEquipmentStatus',
    // 管理员端报废报修列表
    adminTroubleList: baseUrl + '/admin/getMalfunctionEquipment', 
    // 管理员端报废报修列表搜索
    adminTroubleSearch: baseUrl + '/admin/getMalfunctionEquipmentByEid',
    // 管理员端设备列表
    adminAllList: baseUrl + '/admin/getAllEquipment',
    // 管理员端管理员信息
    adminMsg: baseUrl + '/admin/getAdminInfo',
    // 管理员端修改老师
    updateEquipmentTeacher: baseUrl + '/admin/updateEquipmentTeacher',
    // 管理员端老师
    teacherList: baseUrl + '/admin/getAllTeacher',
    // 管理员端删除老师
    adminDeleteTeacher: baseUrl + '/admin/deleteTeacher',
    // 管理员端新增老师
    adminAddTeacher: baseUrl + '/admin/insertTeacher',
    // 管理员端修改密码
    adminChangePwd: baseUrl + '/admin/updatePassword',
    // 管理员端修改设备老师列表下拉菜单
    teacherIdAndName: baseUrl + '/admin/getTeacherInfo',
    // 管理员端修改信息
    adminChangeMsg: baseUrl + '/admin/updateAdminInfo',
    // 管理员端全部列表搜索
    adminAllSearch: baseUrl + '/admin/getAllEquipmentByCondition',
    // 管理员端获取学生借用记录
    studentBorrowRecord: baseUrl + '/admin/getManageInfoBySid',
}
export default api;