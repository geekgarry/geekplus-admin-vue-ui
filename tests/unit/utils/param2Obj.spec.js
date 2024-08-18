import { param2Obj } from '@/utils/index.js'
describe('Utils:param2Obj', () => {
  const url = 'https://github.com/geekgarry/geekplus-admin-vue-ui'

  it('param2Obj test', () => {
    expect(param2Obj(url)).toEqual({
      name: 'bill',
      age: '29',
      sex: '1',
      field: window.btoa('test'),
      key: '测试'
    })
  })
})
