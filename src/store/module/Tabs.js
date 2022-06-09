const state = {
  editableTabs: [],
  editableTabsValue: '',
};
const getters = {
  activeName(state) {
    return state.editableTabsValue;
  },
};
const mutations = {
  ADD_TABS(state, tab) {
    if (!state.editableTabs.find((item) => item.path === tab.path)) {
      state.editableTabs.push(tab);
    }
  },
  SET_VALUE(state, path) {
    state.editableTabsValue = path;
  },
  REMOVE_TABS_NAME(state, tabName) {
    state.editableTabs = state.editableTabs.filter((tab) => tab.name !== tabName);
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
