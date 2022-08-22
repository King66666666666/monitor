import axios from "axios";

export const reqBehavior = () => {
  return axios({
    url:'/api/behaviors',
    method:'get'
  })
}
export const reqUser = () => {
  return axios({
    url:'/api/users',
    method:'get'
  })
}
export const reqError = () => {
  return axios({
    url:'/api/errors',
    method:'get'
  })
}
export const reqPerformance = () => {
  return axios({
    url:'/api/performance',
    method:'get'
  })
}
