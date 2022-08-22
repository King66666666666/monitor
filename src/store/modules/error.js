import {reqError} from '@/api'

const state = {
  errors:[]
}
const actions = {
  async getError(context){
    let result = await reqError()
    if(result.status === 200){
      context.commit('GETERROR',result.data)
    }
  }
}
const mutations = {
  GETERROR(state,data){
    state.errors = data
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
