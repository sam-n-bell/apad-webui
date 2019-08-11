import Vue from "vue";
import router from "../../router";

const state = {
	venues: []
};

const getters = {};

const actions = {
	createVenue: async ({ commit, dispatch }, venue) => {
		try {
            // POST to create venues
            // GET updated list of venues by called getVenues
            dispatch('getVenues')
		} catch (err) {
			// error message
		}
	},
	getVenues: async ({ commit }) => {
			// GET VENUES
            // commit('SET_VENUES', venues.data)
            //delete below dummy data once API works
        let request = await Vue.$http.get("/venues")
		commit('SET_VENUES', request.data)
	}
};

const mutations = {
	SET_VENUES(state, venues) {
		state.venues = venues;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};