// 判断是否为整数
export function isInt(rule, value, callback) {
    var reg = new RegExp(/^[0-9]*$/)
    if (!reg.test(value)) {
        return callback(new Error('请输入数字值'));
    }
    callback();
}

// 修改密码//修改密码的规则
export const validatePass = (rule, value, callback) => {
    if (value === "") {
        return callback(new Error("请输入密码"));
    }

    if (this.ruleForm.checkPass !== "") {
        this.$refs.ruleForm.validateField("checkPass");
    }

    callback();
};
export const validatePass2 = (rule, value, callback) => {
    if (value === "") {
        return callback(new Error("请再次输入密码"));
    }

    if (value !== this.ruleForm.pass) {
        return callback(new Error("两次输入密码不一致!"));
    }

    return callback();
};


