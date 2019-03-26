<template>
  <div>
    <h1>{{data.title}}</h1>

    <div class="align-center">
      <el-row style="width: 50%; display: flex; justify-content: space-between;">
        <el-col :span="12" style="display: flex;">
          <el-autocomplete
            class="inline-input"
            v-model="form.newItem"
            :fetch-suggestions="querySearch"
            placeholder="Entrez quelque chose"
            :trigger-on-focus="false"
            @select="handleSelect"
            @keyup.enter.native="addItem"></el-autocomplete>

          <el-button type="primary" @click="addItem">Ajouter</el-button>
        </el-col>
        <el-col :span="12" style="display: flex; justify-content: flex-end; align-items: center;">
          Budget: &nbsp;
          <el-input-number placeholder="Entrez quelque chose" v-model="budget" :min="0" controls-position="right" :precision="2"/>
          &nbsp; €
        </el-col>
      </el-row>

      <list-view :items="listItems" class="liste-view"/>

      <el-tag :type="budgetError ? 'danger': 'info'" class="total-price"> Total : {{currentTotal}} €</el-tag>
    </div>

  </div>
</template>

<script>
import ListView from '@/components/ListView.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'List',

  components: {
    ListView
  },

  data: () => ({
    form: {
      newItem: ''
    }
  }),

  methods: {
    /**
     * Allow to add a item
     */
    addItem () {
      if (this.form.newItem !== '') {
        const c = {
          name: this.form.newItem,
          checked: false,
          price: 0
        }

        this.listItems.push(c)

        this.enrichSuggestions(this.form.newItem)

        this.form.newItem = ''
      }
    },

    /**
     * Allow to enrich suggestions
     */
    enrichSuggestions (name) {
      var found = this.suggestions.find(
        sugestion => sugestion.value.toLowerCase() === name.toLowerCase()
      )
      if (!found) {
        this.$store.commit('ADD_SUGGESTION', name)
      }
    },

    /**
     * Callback when a item is selected in autocomplete
     */
    handleSelect (item) {
      this.addItem()
    },

    /**
     * Return the result for autocomplete
     */
    querySearch (queryString, cb) {
      var suggestions = this.suggestions
      var results = queryString ? suggestions.filter(sugg => sugg.value.toLowerCase().includes(queryString.toLowerCase())) : suggestions
      cb(results)
    }
  },
  computed: {
    ...mapGetters([
      'suggestions'
    ]),

    /**
     * Compute the total price of checked items
     */
    currentTotal () {
      if (this.data.items) {
        return parseFloat(this.listItems.reduce((acc, current) => current && current.checked ? (acc += parseFloat(current.price)) : acc, 0).toFixed(2))
      } else {
        return 0
      }
    },

    /**
     * Check if total is greater than budget
     */
    budgetError () {
      return this.budget < this.currentTotal
    },

    /**
     * Get data for list
     */
    data () {
      return this.$store.getters.getListById(this.$route.params.id)
    },

    /**
     * Return the items of list
     */
    listItems () {
      return this.data.items
    },

    /**
     * Allow to get and set the budget of the list
     */
    budget: {
      get () {
        return this.data.budget
      },
      set (budget) {
        this.$store.commit('UPDATE_LIST_BUDGET', {
          listId: this.data.id,
          budget: budget
        })
        this.$store.commit('UPDATE_LAST_MODIFIED_LIST', this.data.id)
      }
    }
  },

  watch: {
    listItems: {
      handler () {
        this.$store.commit('UPDATE_LIST_ITEMS', {
          listId: this.data.id,
          items: this.listItems
        })
        this.$store.commit('UPDATE_LAST_MODIFIED_LIST', this.data.id)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .align-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .liste-view {
    margin-top: 30px;
    width: 50%;
  }
  .total-price {
    font-size: 20pt;
  }
</style>
