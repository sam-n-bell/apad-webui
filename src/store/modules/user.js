import Vue from "vue";
import router from "../../router";

const state = {
	current_user: {},
	logged_in: false,
	users_list: []
};

const getters = {};

const actions = {
	login: async ({ commit }, credentials) => {
		let login_response = await Vue.$http.post('/login',credentials); //check pwd/email, return user object and token
		localStorage.setItem('auth_token', login_response.data.token); //set token for http requests
		commit("SET_CURRENT_USER",login_response.data.user); //set to user object returned from python service
		commit("SET_LOGGED_IN", true);
	},
	logout: async ({ commit }) => {
		localStorage.removeItem("auth_token");
		commit("SET_CURRENT_USER", {});
		commit("SET_LOGGED_IN", false);
        router.push('/login');
	},
	getUsers: async ({ commit }) => {
		let request = await Vue.$http.get('/users')
		commit('SET_USERS_LIST',request.data)
	}
};

const mutations = {
	SET_CURRENT_USER(state, user) {
		state.current_user = user;
	},
	SET_LOGGED_IN(state, boolean_status) {
		state.logged_in = boolean_status;
	},
	SET_USERS_LIST(state, users) {
		state.users_list = users;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};