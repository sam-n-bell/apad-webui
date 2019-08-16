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
    baseURL: 'https://flaskappmysql.appspot.com'
//  baseURL: 'http://127.0.0.1:8080'
});

//https://stackoverflow.com/q/52168928 helped understand how to apply Authorization Header before each request
axios_instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');
  return config;
}, (error) => {
  return Promise.reject(error);
});

//https://stackoverflow.com/questions/49564283/axios-http-call-is-always-treated-as-succeed
axios_instance.interceptors.response.use(
	response => {
		return response;
	},
	function(error) {
		if (error.response.status === 401) {
			store.dispatch("user/logout");
    }
    error.message = error.response.data;
		return Promise.reject(error);
	}
);

Vue.use(VueAxios, axios_instance)
Vue.$http = Vue.prototype.$http; //lets us use Vue.$http.___ in any file
Vue.$notify = Vue.prototype.$notify; //lets us use Vue.$notify in any file

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false

Vue.filter("time", function(value) {
	if (value) {
    return  moment(value, 'HH:mm:ss').format('h:mm a');
	}
});
Vue.filter('yesno', function(value) {
  return value ? 'Yes' : 'No';
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
