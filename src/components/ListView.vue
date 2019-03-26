<template>
  <div>

    <el-card shadow="always" class="row-liste" v-if="items.length === 0">
      <el-row type="flex" align="middle">
        <el-col style="text-align: center; color: #a0a0a0;">
          <span> Aucun item </span>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-else shadow="always" v-for="(item, index) in items" :key="index" :body-style="bodyCardCss" class="row-liste">
      <el-row type="flex" align="middle">
        <el-col :span="2" class="align-center">
          <el-checkbox v-model="item.checked"></el-checkbox>
        </el-col>
        <el-col :span="10" style="display: flex;">
          <span>{{item.name}}</span>
        </el-col>
        <el-col :span="10" style="display: flex;">
          <div v-if="item.checked">
            <el-input-number :precision="2" v-model="item.price" controls-position="right" :min="0"/>
          </div>
        </el-col>
        <el-col :span="2" style="text-align: center;">
          <el-button type="danger" icon="el-icon-delete" circle @click="removeItem(index)"></el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ListView',

  props: {
    items: {
      type: Array
    }
  },

  data: () => ({
    bodyCardCss: {
      padding: '8px'
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
