<template>
  <div id="app">

<!-- @select="handleSelectItem" -->
    <el-menu class="nav" mode="horizontal"
      :router="true"
      default-active="/"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#00b2ff">
      <el-menu-item index="/" :route="{name: 'home'}">
        <i class="el-icon-menu"></i>
        <span slot="title">Accueil</span>
      </el-menu-item>
      <el-menu-item index="/lists" :route="{name: 'lists'}">
        <i class="el-icon-document"></i>
        <span slot="title">Mes listes</span>
      </el-menu-item>
      <el-menu-item index="/about" :route="{name: 'about'}">
        <i class="el-icon-info"></i>
        <span slot="title">A propos</span>
      </el-menu-item>
    </el-menu>

    <router-view class="app-content"/>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* display: flex; */
}

.app-content {
  width: 100%;
  padding: 10px;
}

.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
