import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  state: {
    userInfo:{}
  },
  mutations: {//不能异步操作  是改变状态池（state）里面数据的唯一路径
    changeLogin(state, status) {
      state.userInfo = status;
    }
  },
  actions: {//通过调用mutations里面的方法改变state
    loginAction({ commit }, user) {
      commit('changeLogin', user);
    }
  },
})

export default store

// export default new Vuex.Store({
//   modules: {
//     app,
//     settings,
//     user
//   },
//   getters,
//   state: {
//     userInfo:{}
//   },
//   mutations: {//不能异步操作  是改变状态池（state）里面数据的唯一路径
//     changeLogin(state, status) {
//       state.userInfo = status;
//     }
//   },
//   actions: {//通过调用mutations里面的方法改变state
//     loginAction({ commit }, user) {
//       commit('changeLogin', user);
//     }
//   },
//   modules: {
    
//   }
// })