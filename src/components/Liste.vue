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
          <el-input-number placeholder="Entrez quelque chose" v-model="budget">
          </el-input-number>
        </el-col>
      </el-row>

      <liste-view :items="data.items" class="liste-view"/>

      <el-tag :type="budgetError ? 'danger': 'info'" class="total-price"> Total : {{currentTotal}} €</el-tag>
    </div>

  </div>
</template>

<script>
import ListeView from '@/components/ListeView.vue'

export default {
  name: 'liste',

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  components: {
    ListeView
  },

  data: () => ({
    form: {
      newItem: ''
    },
    budget: 50,
    suggestions: []
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
        this.data.items.push(c)

        this.enrichSuggestions(this.form.newItem)

        this.form.newItem = ''
      }
    },

    enrichSuggestions (name) {
      var found = this.suggestions.find(
        sugestion => sugestion.value.toLowerCase() === name.toLowerCase()
      )
      if (!found) {
        this.suggestions.push({ value: name })
      }
    },

    handleSelect (item) {
      this.addItem()
    },
    querySearch (queryString, cb) {
      var suggestions = this.suggestions
      var results = queryString ? suggestions.filter(sugg => sugg.value.toLowerCase().includes(queryString.toLowerCase())) : suggestions
      // call callback function to return suggestions
      console.log(results)
      cb(results)
    }
  },
  computed: {
    currentTotal () {
      return this.data.items.reduce((acc, current) => current.checked ? (acc += current.price) : acc, 0)
    },

    budgetError () {
      return this.budget < this.currentTotal
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
