import fs from 'fs'
import path from 'path'

fs.readFile(path.join('D:/web_project/Nuxt/demo/starter-3/data/user.json'), (err, data) => {
  // console.log(JSON.parse(data.toString()));

})

export default defineEventHandler(async (event) => {
  const data = getQuery(event)
  // const body = readRawBody(event)
  // const method = getMethod(event).toUpperCase()
  const formdata = readFormData(event)
  let body
  // if (method !== 'GET') body = await readBody(event)
  // const {req,res} = event.node
  console.log(formdata)

  console.log(data)
  // getValidatedQuery(event)

  return {
    status: 200,
    msg: 'sucees',
    data: [
      {
        key: 1,
        firstName: 'zs',
        class: '111',
        studentId: '1',
        password: '123'
      },
      {
        key: 2,
        firstName: 'zs',
        class: '111',
        studentId: '1',
        password: '123'
      },
      {
        key: 3,
        firstName: 'zs',
        class: '111',
        studentId: '1',
        password: '123'
      },
      {
        key: 4,
        firstName: 'admin',
        class: '111',
        studentId: 'vip',
        password: '123'
      }
    ]
  }
})
