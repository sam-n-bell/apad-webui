import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './plugins/element.js';
import moment from 'moment';

const axios_instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

Vue.use(VueAxios, axios_instance)

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false

Vue.filter("time", function(value) {
	if (value) {
    return  moment(value, 'HH:mm:ss').format('h:mm a');
	}
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
