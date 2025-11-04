// src/store/index.js
import axios from "axios"; // Assuming you use axios for HTTP requests
import { putUrl } from "../../boot/axios.js";
export default {
  namespaced: true,
  state: {
    investmateDataObj: {
      deals: {},
      leads: {},
      contacts: {},
      locations: {},
      users: {},
    }
  },
  mutations: {
    SET_DATA(state, payload) {
      state.dealDataObj.deals = payload.deals || {};
      state.dealDataObj.leads = payload.leads || {};
      state.dealDataObj.contacts = payload.contacts || {};
      state.dealDataObj.locations = payload.locations || {};
      state.dealDataObj.users = payload.userData || {};
    },
  },
  actions: {
    async fetchDeals({ commit }, id) {
        console.log("Action fetchData triggered with ID:", id,commit);
        try {
          const response = await axios.get(
            `${putUrl}deals/api/v1/get-deals-byid/${id}`
          ); 
          console.log("BOOT",putUrl,response.data?.dealReponse);
          commit('SET_DATA', response.data?.dealReponse);
          // const data = dataJs          
          // console.log("response.data", data,id);
          // commit('SET_DEALS',data);
        } catch (error) {
          console.error('Error fetching deals:', error);
        }
    }
  },
  getters: {
    dealDataObj(state) {
      return state.dealDataObj || {};
    },
  },
};
