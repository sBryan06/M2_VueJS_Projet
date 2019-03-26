<template>
  <div>
    <h1>Mes listes</h1>
    <el-button type="primary" icon="el-icon-plus" @click="openAddListModal">Ajouter une liste</el-button>
    <el-table
      :data="filteredLists"
      style="width: 50%">
      <el-table-column
        label="Titre"
        prop="title">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header">
          <!-- <el-input
            v-model="search"
            size="mini"
            @change="filteredLists"
            placeholder="Type to search"/> -->
            <input type="text" v-model="search" placeholder="Search title.." class="filter-search-input"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="openList(scope.row.id)"
            icon="el-icon-view"
            circle></el-button>
          <el-button
            size="small"
            type="danger"
            @click="removeFromList(scope.row.id)"
            icon="el-icon-delete"
            circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- modal pour ajouter une liste -->
    <add-list-modal v-if="addListModalVisible" @close="closeAddListModal" @add-list="addList" />
  </div>
</template>

<script>
import AddListModal from '@/components/AddListModal.vue'

export default {
  name: 'Lists',

  components: {
    AddListModal
  },

  data: () => ({
    lists: [],
    search: '',
    addListModalVisible: false
  }),

  mounted () {
    this.lists = JSON.parse(localStorage.getItem('lists')) || []
  },

  methods: {
    openAddListModal () {
      this.addListModalVisible = true
    },

    closeAddListModal () {
      this.addListModalVisible = false
    },

    openList (listId) {
      console.log(listId)
      this.$router.push({ name: 'list', params: { id: listId } })
    },

    addList (newList) {
      if (newList.hasOwnProperty('id') && newList.hasOwnProperty('title') && newList.hasOwnProperty('items')) {
        this.lists.push(newList)
      }
    },

    removeFromList (listId) {
      const index = this.lists.findIndex(list => list.id === listId)
      this.lists.splice(index, 1)
    }
  },

  computed: {
    filteredLists () {
      return this.lists.filter(data => data.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  },

  watch: {
    lists: {
      handler () {
        localStorage.setItem('lists', JSON.stringify(this.lists))
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .filter-search-input {
    -webkit-appearance: none;
    background-color: #FFF;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 50%;
    height: 28px;
    line-height: 28px;
  }

  .filter-search-input:focus {
    border-color: #409EFF;
    outline: 0;
  }
</style>
