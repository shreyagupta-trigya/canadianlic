// src/store/modules/subModule/index.js

import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

const state = {
  data: [], // Initial state for submodule
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
