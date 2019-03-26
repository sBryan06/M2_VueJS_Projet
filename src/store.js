import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {

  state: {
    count: 0,
    todos: [
      { id: 1, text: 'Item 1', done: true },
      { id: 2, text: 'Item 2', done: false }
    ]
  },

  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.lenght
    }
  }
}
