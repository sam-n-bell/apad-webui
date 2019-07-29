import Vue from "vue";
import router from "../../router";

const state = {
	user_details: {},
	logged_in: false
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
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};