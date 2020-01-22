const install = (Vue, name = '$bus') => {
  const value = new Vue()
  Object.defineProperty(Vue, name, { value })
  Object.defineProperty(Vue.prototype, name, { value })
}
export default { install }
