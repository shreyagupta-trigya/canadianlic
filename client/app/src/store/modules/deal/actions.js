
import axios from 'axios';
import { putUrl } from "../../../boot/axios"
// import dataJs from './data.js'
export const fetchDeals = async ({ commit }, id) => {
  try {
    const response = await axios.get(
      `${putUrl}deals/api/v1/get-deals-byid/${id}`
    ); 
    console.log("BOOT",putUrl,response.data?.dealReponse);
    commit('SET_DEALS', response.data?.dealReponse);
    // const data = dataJs          
    // console.log("response.data", data,id);
    // commit('SET_DEALS',data);
  } catch (error) {
    console.error('Error fetching deals:', error);
  }
};
