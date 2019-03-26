import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    lists: [],
    suggestions: [],
    lastModifiedList: null
  },

  getters: {
    lists: state => {
      return state.lists
    },

    filteredLists: (state, getters) => (searchText) => {
      return getters.lists.filter(list => list.title.toLowerCase().includes(searchText.toLowerCase()))
    },

    getListById: (state, getters) => (id) => {
      return getters.lists.find(list => list.id === id)
    },
    suggestions: state => {
      return state.suggestions
    },

    lastModifiedList: (state) => {
      return state.lastModifiedList
    }
  },

  mutations: {
    ADD_LIST (state, newList) {
      state.lists.push(newList)
    },

    REMOVE_LIST (state, listId) {
      const index = state.lists.findIndex(list => list.id === listId)
      state.lists.splice(index, 1)
    },

    ADD_SUGGESTION (state, suggestion) {
      state.suggestions.push({ value: suggestion })
    },

    UPDATE_LIST_ITEMS (state, payload) {
      const list = state.lists.find(list => list.id === payload.listId)

      if (list) {
        list.items = payload.items
      }
    },

    UPDATE_LIST_BUDGET (state, payload) {
      const list = state.lists.find(list => list.id === payload.listId)

      if (list) {
        list.budget = payload.budget
      }
    },

    UPDATE_LAST_MODIFIED_LIST (state, listId) {
      const list = state.lists.find(list => list.id === listId)
      state.lastModifiedList = list
    },

    initialiseStore (state) {
      // Check if the ID exists
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    }
  }
})

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state))
})

export default store
