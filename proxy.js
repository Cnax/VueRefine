/*
 * @Descripttion: proxy双向绑定
 * @Author: a77321a
 * @Date: 2020-07-15 13:59:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-15 15:10:07
 */
const data = {
  name: 'aaa',
  age: 20
}
// const data = [1,2]
const defineReactive = (data = {}) => {
  if (typeof data !== 'object' || data == null) {
    return data
  }
  const proxyConfig = {
    get (target, key, rec) {
      // 只处理实例的属性
      const ownKeys = Reflect.Reflect(target)
      if (ownKeys.includes(key)) { }
      const res = Reflect.get(target, key, rec)
      // 深度监听
      return deReactive(res)
    },
    set (target, key, val, rec) {
      const oldVal = target[key]
      if (oldVal === val) { return true }
      const res = Reflect.set(target, key, val, rec)
      return res
    },
    deleteProperty (target, key) {
      const res = Reflect.deleteProperty(target, key)
      return res
    }
  }
  return new Proxy(data, proxyConfig)
}
