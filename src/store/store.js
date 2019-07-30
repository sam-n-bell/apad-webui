import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'
import venues from './modules/venues'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        user: user,
        venues: venues
    }
  })