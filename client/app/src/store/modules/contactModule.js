// src/store/index.js
import axios from "axios"; // Assuming you use axios for HTTP requests
import { putUrl } from "../../boot/axios.js";
export default {
  namespaced: true,
  state: {
    contactDataObj: {
        contacts: {},
        subDetails: {},
        faimlyTree: {},
        leads: {},
        festivals: [],
        eContacts: [],
        childs: [],
        siblings: [],
        parents: [],
        scoreBoard: [],
        policiesContact: [],
        contactResult: []
    }
  },
  mutations: {
    SET_DATA(state, payload) {
      const fetvalArr = payload.festivals.map(item => (item.festivals));
      const childsArr = payload.dependentChildren.map(item => (item.dependentChildren));
      const siblingsArr = payload.contactSubDetails.map(item => (item.contactSubDetails));
      const parentsArr = payload.dependentParents.map(item => (item.dependentParents));
      const eContactArr = payload.emergencyContact.map(item => (item.contactEmergencyDetails));
      state.dealDataObj.contacts = payload.contactResult[0]?.contacts || {};
      state.dealDataObj.subDetails = payload.contactSubDetails[0]?.contactSubDetails || {};
      state.dealDataObj.faimlyTree = payload.faimlyTree[0]?.faimlyTree || {};
      state.dealDataObj.leads = payload.leadInformations[0]?.leadInformations || {};
      state.dealDataObj.festivals = fetvalArr || [];
      state.dealDataObj.eContacts = eContactArr|| [];
      state.dealDataObj.childs = childsArr || [];
      state.dealDataObj.siblings = siblingsArr || [];
      state.dealDataObj.parents = parentsArr || [];
      state.dealDataObj.scoreBoard = payload.userData || [];
      state.dealDataObj.policiesContact = payload.userData || [];
      state.dealDataObj.contactResult = payload.userData || [];
    },
  },
  actions: {
    async fetchContacts({ commit }, id) {
        console.log("Action fetchData triggered with ID:", id);
        try {
          const response = await axios.get(
            `${putUrl}contact/api/v1/getcontact/${id}`
          ); 
          console.log("BOOT",putUrl,response.data);
          commit('SET_DATA', response.data?.data);
          // const data = dataJs          
          // console.log("response.data", data,id);
          // commit('SET_DEALS',data);
        } catch (error) {
          console.error('Error fetching deals:', error);
        }
    }
  },
  getters: {
    contactDataObj(state) {
      return state.contactDataObj || {};
    },
  },
};
