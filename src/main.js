import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import ToggleButton from 'vue-js-toggle-button'
import PrettyCheckbox from 'pretty-checkbox-vue'
import VueMask from 'v-mask'

Vue.use(PrettyCheckbox)
Vue.use(ToggleButton)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueMask)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
