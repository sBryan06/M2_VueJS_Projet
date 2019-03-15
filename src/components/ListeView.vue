<template>
  <div>
    <el-card shadow="always" v-for="(item, index) in items" :key="index" :body-style="bodyCardCss" class="row-liste">
      <el-row type="flex" align="middle">
        <el-col :span="2">
          <el-checkbox v-model="item.checked"></el-checkbox>
        </el-col>
        <el-col :span="6" style="display: flex;">
          <span>{{item.name}}</span>
        </el-col>
        <el-col :span="12" style="display: flex;">
          <div v-if="item.checked">
            <el-input type="number" v-model.number="item.price"/>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: center;">
          <el-button type="danger" icon="el-icon-delete" circle @click="removeItem(index)"></el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ListeView',

  props: {
    items: {
      type: Array
    }
  },

  data: () => ({
    bodyCardCss: {
      padding: '5px'
    }
  }),

  methods: {
    removeItem (index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style>
  .row-liste {
    margin-bottom: 5px;
  }
</style>
