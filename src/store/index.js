import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import behavior from './modules/behavior'
import users from "@/store/modules/users";
import performance from "@/store/modules/performance";
import error from "@/store/modules/error"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    behavior,
    users,
    performance,
    error
  },
  getters
})

export default store
