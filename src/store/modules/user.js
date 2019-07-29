import Vue from "vue";
import router from "../../router";

const state = {
	user_details: {},
	logged_in: false,
	users_list: []
};

const getters = {};

const actions = {
	login: async ({ commit }, credentials) => {
		try {
			// let login_response = await Vue.$http.get();
			// commit("SET_USER", login_response.data);
			/**comment out below two once api works */
			localStorage.setItem('auth_token', "abc123");
			commit("SET_USER_DETAILS", credentials);

			commit("SET_LOGGED_IN", true);
		} catch (err) {
			// error message
		}
	},
	logout: async ({ commit }) => {
		localStorage.removeItem("auth_token");
		router.push('/login');
		commit("SET_USER_DETAILS", {});
		commit("SET_LOGGED_IN", false);
        router.push('/login');
	},
	getUsers: async ({ commit }) => {
		try {
			// GET USERS
			// commit('SET_USERS_LIST', users.data)
			commit('SET_USERS_LIST', [
				{
					user_id: 1,
					name: 'sam bell',
					email: 'sam.bell@utexas.edu',
					administrator: 1,
				}
			])
		} catch (err) {
			this.$notify.error('Coudn\'t get list of users');
		}
	}
};

const mutations = {
	SET_USER_DETAILS(state, user) {
		state.user_details = user;
		console.log(`state user is` ,state.user_details);
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