
//state
const state = {
    staf: {
        id: "",
        password: "",
        idInfo: ""
    },
    userInfo: {

    },
    kingorld_token: '',
    isLogin: false,
    isSuccess: true,
    checkLogin: 0
};

//getters
const getters = {
    getUserInfo : state => state.userInfo,
}

//mutations 
const mutations = {
    updateStaf(state, staf) {
        state.staf = staf;
    },
    login(state, val) {
        if (val.code === 0) {
            state.isLogin = true;
            state.isSuccess = true;
            state.userInfo = val.data || {};
            
            if(/^[0-9]+.?[0-9]*/.test(state.userInfo.sex)) {
                state.userInfo.sex = state.userInfo.sex.toString()
            }
             
            state.checkLogin++;
        } else {
            state.isLogin = false;
            state.isSuccess = false;
            state.checkLogin++;
        }
    },
    changePwd(state, val) {
        state.userInfo.password = val;
    },
    changeInfo(state, val) {
        let obj = {};
        for(let i in val) {
            obj[i] = val[i];
        }
        state.userInfo = obj;
    }
};

//actions
const actions = {
    login(context, payload) {
        context.commit('login', payload);
    },
    changePwd(context, payload) {
        context.commit('changePwd', payload);
    },
    changeInfo(context, payload) {
        context.commit('changeInfo', payload);
    }
}


export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
}