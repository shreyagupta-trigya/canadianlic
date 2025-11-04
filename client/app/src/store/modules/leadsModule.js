import axios from "axios";
import { putUrl } from "../../boot/axios.js";

export default {
    namespaced : true,
    state :{
        leadDataObj :{
            leads : {},
            description : {},
            familyTree : {},
            festivals : [],
            emergencyContact : [],
            parents : [],
            childerns : [],
            siblings : [],
        }
    },
    mutations:{
        SET_DATA(state,payload){
            console.log("payload ==>>>>>>>>",payload?.faimlyTree[0]?.faimlyTree)
            state.leadDataObj.leads = payload?.leadResult[0]?.leads || {},
            state.leadDataObj.description = payload?.leadsDescription[0]?.leadsDescription || {},
            state.leadDataObj.familyTree = payload?.faimlyTree[0]?.faimlyTree || {},
            state.leadDataObj.festivals = payload?.festivals || [],
            state.leadDataObj.emergencyContact = payload?.emergencyContact || [],
            state.leadDataObj.parents = payload?.dependentParents || [],
            state.leadDataObj.childerns = payload?.dependentChildren || [],
            state.leadDataObj.siblings = payload?.leadSiblings || []
        }
    },
    actions : {
        async fetchData ({commit},id) {
            try {
                console.log("id ACTION ====>>>>>>>>>>>",id)
                const response = await axios.get(`${putUrl}lead/api/v1/getLeadById/${id}`);
                commit("SET_DATA",response.data?.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
    },
    getters: {
        leadDataObj (state) {
            return state.leadDataObj || {}
        }
    }
}