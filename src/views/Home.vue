<template>
  <div class="home">
    <h1>Bienvenue sur Shopping list</h1>
    <p>
      Cette application a été réalisé dans le cadre du module Framework JS.
    </p>

    <el-card class="box-card" v-if="lastModifiedList">
      <div slot="header" class="clearfix">
        <el-row type="flex">
          <el-col :span="22">
            <h3 style="margin: 0;"> Dernière liste modifiée </h3>
          </el-col>

          <el-col :span="2" class="align-center">
            <el-button type="primary" size="small" icon="el-icon-view" circle plain @click="openLastModifiedList"></el-button>
          </el-col>
        </el-row>
      </div>
      <span> {{lastModifiedList.title}}  </span>
    </el-card>
  </div>
</template>

<style scope>
  .box-card {
    width: 350px;
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',

  methods: {
    openLastModifiedList () {
      this.$router.push({ name: 'list', params: { id: this.lastModifiedList.id } })
    }
  },

  computed: {
    ...mapGetters([
      'lastModifiedList'
    ])
  }
}

</script>
