import { defineStore } from 'pinia'
import { getInfo, login, logout } from '@/api/login'
import {
  getExpiresIn,
  getToken,
  removeToken,
  setExpiresIn,
  setToken
} from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

const useUserStore = defineStore('user', {
  state: (): {
    token?: string
    expiresIn: number
    name: string
    avatar: string
    roles: any[]
    permissions: string[]
  } => ({
    token: getToken(),
    expiresIn: Number(getExpiresIn()),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  }),
  actions: {
    // 登录
    login(userInfo: {
      username: string
      password: string
      code: string
      uuid: string
    }) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then(
            ({
              data: { access_token: accessToken, expires_in: expiresIn }
            }) => {
              setToken(accessToken)
              this.token = accessToken
              setExpiresIn(expiresIn)
              this.expiresIn = expiresIn
              resolve(1)
            }
          )
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user
            const avatar =
              user.avatar === '' || user.avatar == null
                ? defAva
                : import.meta.env.VITE_APP_BASE_API + user.avatar

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.name = user.userName
            this.avatar = avatar
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve(1)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})

export default useUserStore
