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
		try {
			// let login_response = await Vue.$http.get(); check pwd/email, return user object and token
			credentials.administrator = true;
			let user = credentials;
			localStorage.setItem('auth_token', "abc123"); //set token for http requests
			commit("SET_CURRENT_USER", user); //set to user object returned from python service

			commit("SET_LOGGED_IN", true);
		} catch (err) {
			// error message
		}
	},
	logout: async ({ commit }) => {
		localStorage.removeItem("auth_token");
		router.push('/login');
		commit("SET_CURRENT_USER", {});
		commit("SET_LOGGED_IN", false);
        router.push('/login');
	},
	getUsers: async ({ commit }) => {
		try {
			// GET USERS
			// commit('SET_USERS_LIST', users.data)
			console.log('getting user data')
			let request = await Vue.$http.get('/users')
			// commit('SET_USERS_LIST', [
			// 	{
			// 		user_id: 1,
			// 		name: 'sam bell',
			// 		email: 'sam.bell@utexas.edu',
			// 		administrator: 1,
			// 	}
			// ])
			commit('SET_USERS_LIST',request.data)
		} catch (err) {
			this.$notify.error('Coudn\'t get list of users');
		}
	}
};

const mutations = {
	SET_CURRENT_USER(state, user) {
		console.log('setting current user');
		state.current_user = user;
		console.log(`state user is` ,state.current_user);
	},
	SET_LOGGED_IN(state, boolean_status) {
		state.logged_in = boolean_status;
		console.log(`state logged_in is ${state.logged_in}`);
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