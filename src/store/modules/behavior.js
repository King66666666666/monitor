import {reqBehavior} from '@/api'

const state = {
  behaviors:[]
}
const actions = {
  async getBehaviors(context){
    let result = await reqBehavior()
    if(result.status === 200){
      context.commit('GETBEHAVIOR',result.data)
    }
  }
}
const mutations = {
  GETBEHAVIOR(state,data){
    state.behaviors = data
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
