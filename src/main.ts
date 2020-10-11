import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

Vue.filter('fullName', function (item: any, inicieEn: any) {
  if(inicieEn == 'apellidos') {
    return item.paterno +' '+item.materno +' '+item.nombres
  }
  return item.nombres +' '+item.paterno +' '+item.materno
})

fetch(process.env.BASE_URL + "config.json")
  .then(async function(response) {
    const config = await response.json()
    Vue.prototype.$config = config
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('BtnAccess', require('./components/BtnAccess.vue').default);
Vue.component('BtnCancel', require('./components/BtnCancel.vue').default);
Vue.component('BtnClose', require('./components/BtnClose.vue').default);
Vue.component('BtnCreate', require('./components/BtnCreate.vue').default);
Vue.component('BtnDeleteFile', require('./components/BtnDeleteFile.vue').default);
Vue.component('BtnLogout', require('./components/BtnLogout.vue').default);
Vue.component('BtnViewFile', require('./components/BtnViewFile.vue').default);
Vue.component('BtnSubmit', require('./components/BtnSubmit.vue').default);
Vue.component('BtnSearch', require('./components/BtnSearch.vue').default);
Vue.component('FormChangePassword', require('./components/FormChangePassword.vue').default);
Vue.component('IconActionTable', require('./components/IconActionTable.vue').default);
Vue.component('ItemIconText', require('./components/ItemIconText.vue').default);
Vue.component('ItemMenu', require('./components/ItemMenu.vue').default);
Vue.component('Logo', require('./components/Logo.vue').default);
Vue.component('Title', require('./components/Title.vue').default);
Vue.component('SubTitle', require('./components/SubTitle.vue').default);
Vue.component('TitleCenter', require('./components/TitleCenter.vue').default);


