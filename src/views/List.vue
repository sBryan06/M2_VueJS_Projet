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
          <el-input-number placeholder="Entrez quelque chose" v-model="data.budget" :min="0" controls-position="right" :precision="2"/>
          &nbsp; €
        </el-col>
      </el-row>

      <list-view :items="data.items" class="liste-view"/>

      <el-tag :type="budgetError ? 'danger': 'info'" class="total-price"> Total : {{currentTotal}} €</el-tag>
    </div>

  </div>
</template>

<script>
import ListView from '@/components/ListView.vue'

export default {
  name: 'List',

  components: {
    ListView
  },

  data: () => ({
    form: {
      newItem: ''
    },
    suggestions: [],
    lists: []
  }),

  created () {
    this.lists = JSON.parse(localStorage.getItem('lists')) || []
    this.suggestions = JSON.parse(localStorage.getItem('suggestions')) || []
  },

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
        localStorage.setItem('suggestions', JSON.stringify(this.suggestions))
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
      if (this.data.items) {
        return parseFloat(this.data.items.reduce((acc, current) => current.checked ? (acc += parseFloat(current.price)) : acc, 0).toFixed(2))
      } else {
        return 0
      }
    },

    budgetError () {
      return this.data.budget < this.currentTotal
    },

    data () {
      const index = this.lists.findIndex(list => list.id === this.$route.params.id)
      return this.lists[index]
    }
  },
  watch: {
    data: {
      handler () {
        localStorage.setItem('lists', JSON.stringify(this.lists))
        localStorage.setItem('lastModifiedList', JSON.stringify(this.data))
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
