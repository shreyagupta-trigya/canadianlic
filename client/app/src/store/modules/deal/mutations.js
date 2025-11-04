export const SET_DEALS = (state, deal) => {
  state.dealDataObj.deals = deal?.deals || {};
  state.dealDataObj.leals = deal?.leads || {};
  state.dataInfo = deal?.deals || {"name":"test"};  
  
};
