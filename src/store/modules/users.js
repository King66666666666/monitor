import {reqUser} from '@/api'

const state = {
  users:[]
}
const actions = {
  async getUsers(context){
    let result = await reqUser()
    if(result.status === 200){
      context.commit('GETUSER',result.data)
    }
  }
}
const mutations = {
  GETUSER(state,data){
    state.users = data
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
