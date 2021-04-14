import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
  })
}

export function getInfo(token) {
  return request({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

export function register() {
  return request({
    url: '/user/registUser',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
