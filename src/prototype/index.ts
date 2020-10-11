import Vue from "vue"

export function getBaseUrlApi() {
  return Vue.prototype.$config.BASE_URL_API
}