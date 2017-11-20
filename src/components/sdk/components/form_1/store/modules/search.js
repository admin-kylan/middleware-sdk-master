/**
 * Created by Kylan on 2017/10/2.
 */
const state = {
    searchModelKeyValue: {},
    complexSearchModelKeyValue: {},
    searchType: null,
    selectModelArray: []
}

const mutations = {
    INIT_SEARCH_MODEL (state) {
        state.searchModelKeyValue = {}
    },
    INIT_COMPLEX_SEARCH_MODEL (state){
        state.complexSearchModelKeyValue = {}
    },
    INIT_SEARCH_TYPE (state, value){
        state.searchType = value;
    },
    INIT_SELECT_MODEL_ARRAY (state){
        state.selectModelArray = [];
    },
    ASSIGNMENT_SEARCH_MODEL (state, value) {
        state.searchModelKeyValue = value
    },
    ASSIGNMENT_COMPLEX_SEARCH_MODEL (state, value) {
        state.complexSearchModelKeyValue = value
    },
    ASSIGNMENT_SEARCH_TYPE (state, value){
        state.searchType = value
    },
    ASSIGNMENT_SELECT_MODEL_ARRAY (state, value){
        state.selectModelArray = value
    }
}

const actions = {
    initReachModel ({ commit }) {
        // do something async
        commit('INIT_SEARCH_MODEL')
    },
    assignmentSearchModel ({ commit }, value) {
        // do something async
        commit('ASSIGNMENT_SEARCH_MODEL', value)
    }
}

const getters = {
    getSearchModelKeyValue(state){
        return state.searchModelKeyValue;
    },
    getComplexSearchModelKeyValue(state){
        return state.complexSearchModelKeyValue;
    },
    getSearchType(state){
        return state.searchType;
    },
    getSelectModelArray(state){
        return state.selectModelArray;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
