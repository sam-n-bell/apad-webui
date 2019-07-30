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
		try {
			// GET VENUES
            // commit('SET_VENUES', venues.data)
            //delete below dummy data once API works
            let venues_list = []
            let venue1 = {
                venue_id: 1,
                name: 'Highland Lanes',
                address: '999 Texas HWY Austin TX 78759',
                activities: 'bowling',
                open_time: '08:00:00',
                close_time: '20:00:00',
            };
            let venue2 = {
                venue_id: 1,
                name: 'Walnut Creek Volleyball Courts',
                address: '186 Parmer ln  Austin TX 78760',
                activities: 'volleyball',
                open_time: '08:00:00',
                close_time: '20:00:00',
            }
            venues_list.push(venue1, venue2);
			commit('SET_VENUES', venues_list);
		} catch (err) {
			this.$notify.error('Coudn\'t get list of venues');
		}
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