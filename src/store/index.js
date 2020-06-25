import Vue from 'vue';
import Vuex from 'vuex';

import Login from './modules/Login';

Vue.use(Vuex);


const state = {
    userInfo: {},
    isLogin: false,
}

const getters = {
    isLogin: state => state.isLogin,
    getInfo : state => state.userInfo,
    inputMsg : state => state.inputMsg
}

const mutations = {
    login(state, val) {
        if (val.code === 0) {
            state.isLogin = true;
            state.userInfo = val.data;
            
            if(state.userInfo.sex) {
                state.userInfo.sex = state.userInfo.sex.toString()
            }
        } else {
            state.isLogin = false;
        }
    },

    setIsLogin (state, isLogin) {
        state.islogin = isLogin;
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
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    modules: {
        Login,
    },
})