import {reqPerformance} from '@/api'

const state = {
  performance:[]
}
const actions = {
  async getPerformance(context){
    let result = await reqPerformance()
    if(result.status === 200){
      context.commit('GETPERFORMANCE',result.data)
    }
  }
}
const mutations = {
  GETPERFORMANCE(state,data){
    state.performance = data
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
