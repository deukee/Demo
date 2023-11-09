
// 获取用户信息
export type userInfo = Login & {
  
  
  id: number,
  name?: string,
  classId?: string,
  isAdmin?: number,
  
}

// 修改用户信息
export type putUserInfo = userInfo

// 登录
export type Login = {
  studentId: string,
  password: string,
}
// 登录结果
export type LoginRes = {
  token: string
}

export interface Response<T> {
  status: number,
  msg: string,
  data: T
}