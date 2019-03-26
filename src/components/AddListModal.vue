<template>
  <el-dialog title="Nouvelle liste" :visible.sync="dialogFormVisible" width="25%"
    @close="closeDialog">
    <el-form :model="form">
      <el-form-item label="Nom">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Annuler</el-button>
      <el-button type="primary" :disabled="!formIsValid" @click="addList">Ajouter</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddListModal',

  data: () => ({
    dialogFormVisible: true,
    formLabelWidth: '120px',
    form: {
      name: ''
    }
  }),

  methods: {
    closeDialog () {
      this.dialogFormVisible = false
      this.$emit('close')
    },

    addList () {
      if (!this.formIsValid) {
        return
      }

      var uniqid = require('uniqid')

      const newList = {
        id: uniqid.time(),
        title: this.form.name,
        items: [],
        budget: 50
      }
      this.$emit('add-list', newList)

      this.closeDialog()
    }
  },

  computed: {
    formIsValid () {
      return this.form.name !== null && this.form.name.trim() !== ''
    }
  }
}
</script>
