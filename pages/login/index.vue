<script setup lang='ts'>
import { MessagePlugin } from 'tdesign-vue-next'
import request from '@/utils/request'
import { usePluginStateStore } from '@/store/user'
import type { Login, LoginRes } from '@/types/user'

const isRegister = ref<boolean>(false) // 判断是否是注册状态
const formModel = ref<Login>({
  studentId: '20200000',
  password: '123456'

})
const store = usePluginStateStore()
const router = useRouter()
const form = ref()

watch(isRegister, () => {
  formModel.value = {
    studentId: '',
    password: ''
  }
})
const getLoginAPI = (data:{ studentId :string, password:string }) => {
  return request.post<LoginRes>('/api/login', data)
}
const login = async (Result:{ validateResult:any, firstError:any }) => {
  if (Result.validateResult === true) {
    const res = await getLoginAPI(formModel.value)
    store.setToken(res.data.token)
    MessagePlugin.success('提交成功')
    router.push({ name: 'user' })
  } else {
    console.log('Validate Errors: ', Result.firstError, Result.validateResult)
    MessagePlugin.warning(Result.firstError)
  }
}
const getRegisterAPI = (data:{ studentId :string, password:string }) => {
  return request.post('/api/register', data)
}
const register = async () => {
  const res = await getRegisterAPI(formModel.value)
  if (res.data.status === 0) {
    MessagePlugin.success(res.data.msg)
    // 切换到登录
    isRegister.value = false
  } else {
    MessagePlugin.error(res.data.msg)
  }
}

const rules = {
  studentId: [
    { required: true, message: '请输入学号', type: 'error', trigger: 'blur' },
    {
      pattern: /^2020\d{4}$/,
      message: '学号是以2020开头的8位数',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', type: 'error', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,12}$/,
      message: '密码必须是6-12位的非空字符',
      trigger: 'blur'
    }
  ]

}
</script>
<!-- flex-col items-center justify-center flex  :label-width="0" :colon="true" -->
<template>
  <div class="absolute bottom-0 flex flex-col justify-center w-full h-full ">
    <div>
      <t-row>
        <img src="http://sqlmother.yupi.icu/assets/logo.e43a01a1.png" class="absolute top-0 left-0" alt="">
        <t-col :span="6" :offset="3">
          <t-form v-if="!isRegister" ref="form" :data="formModel" :rules="rules" @submit="login">
            <t-form-item>
              <h1>登录</h1>
            </t-form-item>
            <t-form-item label="学号" name="studentId">
              <t-input v-model="formModel.studentId" />
            </t-form-item>

            <t-form-item label="密码" name="password">
              <t-input v-model="formModel.password" type="password" />
            </t-form-item>

            <t-form-item>
              <t-button theme="primary" type="submit" class="w-full">
                提交
              </t-button>
            </t-form-item>
            <t-form-item>
              <t-link theme="primary" @click="isRegister = true">
                跳转链接
              </t-link>
            </t-form-item>
          </t-form>

          <!-- 注册 -->
          <t-form v-else ref="form" :data="formModel" :rules="rules" @submit="register">
            <t-form-item>
              <h1>注册</h1>
            </t-form-item>
            <t-form-item label="学号" name="studentId">
              <t-input v-model="formModel.studentId" />
            </t-form-item>

            <t-form-item label="密码" name="password">
              <t-input v-model="formModel.password" type="password" />
            </t-form-item>

            <t-form-item>
              <t-button theme="primary" type="submit" class="w-full">
                提交
              </t-button>
            </t-form-item>
            <t-form-item>
              <t-link theme="primary" @click="isRegister = false">
                跳转链接
              </t-link>
            </t-form-item>
          </t-form>
        </t-col>
      </t-row>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
