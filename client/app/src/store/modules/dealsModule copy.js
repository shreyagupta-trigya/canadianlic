// src/store/index.js
import axios from "axios"; // Assuming you use axios for HTTP requests
import { putUrl } from "../../boot/axios.js";
// import {leads, locations, users} from "./deal/users.js";
export default {
  namespaced: true,
  state: {
    dealDataObj: {
      deals: {},
      leads: {},
      contacts: {},
      locations: {},
      users: {},
    },
    usersArr: [],
    leadsArr: [],
    contactsArr: [],
    advisorsArr: [],
    locationsArr: [],
  },
  mutations: {
    SET_DATA(state, payload) {
      state.dealDataObj.deals = payload.deals || {};
      state.dealDataObj.leads = payload.leads || {};
      state.dealDataObj.contacts = payload.contacts || {};
      state.dealDataObj.locations = payload.locations || {};
      state.dealDataObj.users = payload.userData || {};
    },
    SET_USERS(state, payload) {
      state.usersArr = payload || [];
    },
    SET_ADVISORS(state, payload) {
      state.advisorsArr = payload || [];
    },
    SET_LOCATIONS(state, payload) {
      state.locationsArr = payload || [];
    },
    SET_CONTACTS(state, payload) {
      state.contactsArr = payload || [];
    },
    SET_LEADS(state, payload) {
      state.leadsArr = payload || [];
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
    },
    async fetchUsers({commit}) {
        try {
          const response = await axios.get(
            `${putUrl}deals/api/v1/get-users`
          ); 
          console.log("BOOT",putUrl,response.data?.users);
          commit('SET_USERS', response.data?.users);        
        } catch (error) {
          console.error('Error fetching deals:', error);
        }
        // console.log("fetchUsers", users);
        
        // commit('SET_USERS', users); 
    },
    async fetchLeads({commit}) {
      try {
        const response = await axios.get(
          `${putUrl}deals/api/v1/get-lead-data`
        ); 
        console.log("BOOT",putUrl,response.data?.leads);
        commit('SET_LEADS', response.data?.leads);        
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
      // commit('SET_LEADS', leads);    
    },
    async fetchContacts({commit}) {
      try {
        const response = await axios.get(
          `${putUrl}deals/api/v1/get-contacts`
        ); 
        console.log("BOOT",putUrl,response.data?.contacts);
        commit('SET_CONTACTS', response.data?.contacts);        
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
      // commit('SET_CONTACTS', contacts);    
    },
    async fetchLocations({commit}) {
      try {
        const response = await axios.get(
          `${putUrl}deals/api/v1/get-locations`
        ); 
        console.log("BOOT",putUrl,response.data?.locations);
        commit('SET_LOCATIONS', response.data?.locations);        
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
      // commit('SET_LOCATIONS', locations); 
    }
  },
  getters: {
    dealDataObj(state) {
      return state.dealDataObj || {};
    },
    usersArr(state) {
      return state.usersArr || []
    },
    contactsArr(state) {
      return state.contactsArr || []
    },
    advisorsArr(state) {
      return state.advisorsArr || []
    },
    locationsArr(state) {
      return state.locationsArr || []
    },
    leadsArr(state) {
      return state.leadsArr || []
    }
  },
};
