import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/index'

import Welcome from '../pages/welcome.vue'
import Login from '../components/login.vue'
import Student from '../pages/student/index.vue'
import Teacher from '../pages/teacher/index.vue'
import Admin from '../pages/admin/index.vue'

import AllList from '../pages/student/allList.vue'
import Approval from '../pages/student/approval.vue'
import PersonalCenter from '../pages/student/personalCenter.vue'
import Identifier from '../pages/student/identifier.vue'
import BorrowNumber from '../pages/student/borrowNumber.vue'

import TAllList from '../pages/teacher/allList.vue';
import TEquipStatus from '../pages/teacher/equipstatus.vue';
import TPersonal from '../pages/teacher/personal.vue';
import Checked from '../pages/teacher/check.vue';
import Check from '../pages/teacher/checked.vue';
import TIdentifier from '../pages/teacher/identifier.vue';

import AAllList from '../pages/admin/allList.vue';
import TeacherList from '../pages/admin/teacherList.vue';
import APersonalCenter from '../pages/admin/personalCenter.vue';
import ARepair from '../pages/admin/repair.vue';
import AScraf from '../pages/admin/scrap.vue';
import Aidentifier from '../pages/admin/identifier.vue'


Vue.use(Router)

if (window.localStorage.getItem('isLogin')) {
  store.commit('setIsLogin', window.localStorage.getItem('isLogin'));
}

const routes = [
  {
    path: '/',
    component: Welcome,
    name: 'welcome',
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/student',
    component: Student,
    redirect: '/student/allList',
    children: [
      {
        path: 'allList',
        name: 'sallList',
        component: AllList,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'approval',
        name: 'approval',
        component: Approval,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'borrowNumber',
        name: 'borrowNumber',
        component: BorrowNumber,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'personalCenter',
        name: 'spersonalCenter',
        component: PersonalCenter,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'identifier',
        name: 'sidentifier',
        component: Identifier,
        meta: {
          requiresAuth: true
        },
      },
    ]
  },
  {
    path: '/teacher',
    component: Teacher,
    redirect: '/teacher/allList',
    children: [
      {
        path: 'allList',
        name: 'tallList',
        component: TAllList,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'checked',
        name: 'tchecked',
        component: Checked,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'check',
        name: 'tcheck',
        component: Check,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'equipStatus',
        name: 'equipStatus',
        component: TEquipStatus,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'identifier',
        name: 'tidentifier',
        component: TIdentifier,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'personalCenter',
        name: 'personalCenter',
        component: TPersonal,
        meta: {
          requiresAuth: true
        },
      },
    ]
  },
  {
    path: '/admin',
    component: Admin,
    redirect: '/admin/allList',
    children: [
      {
        path: 'allList',
        name: 'allList',
        component: AAllList,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'teacherList',
        name: 'teacherList',
        component: TeacherList,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'personalCenter',
        name: 'personalCenter',
        component: APersonalCenter,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'repair',
        name: 'repairList',
        component: ARepair,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'scrap',
        name: 'scrapList',
        component: AScraf,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'identifier',
        name: 'aidentifier',
        component: Aidentifier,
        meta: {
          requiresAuth: true
        },
      },
    ]
  }
]
const router = new Router({
  mode: 'hash',
  routes,
})

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.matched.some(r => r.meta.requiresAuth)) {
    // 通过vuex 如果当前有登录
    if (store.getters.isLogin) {
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  else {
    next();
  }
});

export default router;