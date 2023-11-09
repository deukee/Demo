export const usePluginStateStore = defineStore('big-user',
  () => {
    const token = ref('')
    const setToken = (t:string) => (token.value = t) // 设置token
    return {
      token,
      setToken

    }
  }, {
    persist: true
  })
