<template>
  <div>
    <!-- 当前示例包含：输入框、单选、多选、日期 等场景 -->
    <!-- editableCellState 用于控制某些单元格为只读状态 -->
    <t-table
      ref="tableRef"
      row-key="id"
      :columns="columns"
      :data="data"
      :editable-cell-state="editableCellState"
      bordered
      lazy-load
    />
    <br>

    <!-- 示例代码有效，勿删 -->
    <t-space>
      <t-button @click="validateTableData">
        校验
      </t-button>
      <t-button @click="onExit">
        退出
      </t-button>
    </t-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input, MessagePlugin } from 'tdesign-vue-next'
import request from '@/utils/request'
import { usePluginStateStore } from '@/store/user'
import type { userInfo, Response } from '@/types/user'
const store = usePluginStateStore()
const router = useRouter()
const data = ref<userInfo[]>([])

// 获取用户详情
const getUserAPI = () => {
  // return request.get<Response<userInfo>>('/my/userinfo')
  return request.get<userInfo>('/my/userinfo')
}
const getUserData = async () => {
  const res = await getUserAPI()
  // if (typeof res.data.data === 'object') {
  //   data.value = res.data.data
  // } else if (typeof res.data.data === 'array') {
  console.log(res.data)
  // @ts-expect-error
  data.value = [...res.data.data]

  // }
}
getUserData()
// 修改用户信息  {id,name, class, studentId,password}
const putUserAPI = (data:{ id:number, name:string, classId:string, studentId:string, password:string }) => {
  return request.post('/my/userinfo', data)
}
const putUserData = async (data:{ id:number, name:string, classId:string, studentId:string, password:string }) => {
  const res = await putUserAPI(data)
  MessagePlugin.success(res.data.msg)
  getUserData()
}
const align = ref('left')
// 退出登录
const onExit = () => {
  store.setToken('')
  router.push({ name: 'login' })
}
// 用于控制哪些行或哪些单元格不允许出现编辑态，参数有 { row, col, rowIndex, colIndex }
const editableCellState = (cellParams:any) => {
  // 第一行不允许编辑
  const { row } = cellParams
  return row.studentId !== '20200000'
}

const tableRef = ref()
// 用于提交前校验数据（示例代码有效，勿删）
const validateTableData = () => {
  // 仅校验处于编辑态的单元格
  tableRef.value.validateTableData().then((result:any) => {
    console.log('validate result: ', result)
  })
}

const columns = computed(() => [
  {
    title: '姓名',
    colKey: 'name',

    align: align.value,
    // 编辑状态相关配置，全部集中在 edit
    edit: {
      // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
      // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autofocus: true
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext:any) => ({
        onBlur: () => {
          console.log('失去焦点', editContext)
        },
        onEnter: (ctx:any) => {
          ctx?.e?.preventDefault()
          console.log('onEnter', ctx)
        }
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onEnter'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context:any) => {
        putUserData(context.newRowData)

        // MessagePlugin.success('Success');
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form
      rules: [
        // { required: true, message: '不能为空' },
        { max: 10, message: '字符数量不能超过 10', type: 'warning' }
      ],
      // 默认是否为编辑状态
      defaultEditable: true
    }
  },

  {
    title: '班级',
    colKey: 'classId',
    align: align.value,
    // 编辑状态相关配置，全部集中在 edit
    edit: {
      // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
      // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autofocus: true
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext:any) => ({
        onBlur: () => {
          console.log('失去焦点', editContext)
        },
        onEnter: (ctx:any) => {
          ctx?.e?.preventDefault()
          console.log('onEnter', ctx)
        }
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onEnter'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context:any) => {
        putUserData(context.newRowData)
        // MessagePlugin.success('Success');
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form
      rules: [
        // { required: true, message: '不能为空' },
        { max: 10, message: '字符数量不能超过 10', type: 'warning' }
      ],
      // 默认是否为编辑状态
      defaultEditable: true
    }
  },

  {
    title: '学号',
    colKey: 'studentId',
    align: align.value,
    // 编辑状态相关配置，全部集中在 edit
    edit: {
      // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
      // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autofocus: true
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext:any) => ({
        onBlur: () => {
          console.log('失去焦点', editContext)
        },
        onEnter: (ctx:any) => {
          ctx?.e?.preventDefault()
          console.log('onEnter', ctx)
        }
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onEnter'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context:any) => {
        putUserData(context.newRowData)
        // MessagePlugin.success('Success');
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form
      rules: [
        { required: true, message: '不能为空' },

        {
          pattern: /^2020\d{4}$/,
          message: '学号是以2020开头的8位数',
          trigger: 'blur'
        }

      ],
      // 默认是否为编辑状态
      defaultEditable: true
    }
  },
  {
    title: '密码',
    colKey: 'password',
    align: align.value,
    // 编辑状态相关配置，全部集中在 edit
    edit: {
      // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
      // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autofocus: true
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: editContext => ({
        onBlur: () => {
          console.log('失去焦点', editContext)
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault()
          console.log('onEnter', ctx)
        }
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onEnter'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        putUserData(context.newRowData)
        // MessagePlugin.success('Success');
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form
      rules: [
        { required: true, message: '不能为空' },
        {
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '密码必须是6-12位的非空字符',
          trigger: 'blur'
        }

      ],
      // 默认是否为编辑状态
      defaultEditable: true
    }
  }
])
</script>
