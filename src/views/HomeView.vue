<template>
  <div class="homeView">
    <el-header class="homeView-header">Header</el-header>
    <el-container class="homeView-container">
      <el-aside class="homeView-container-aside" width="200px">Aside</el-aside>
      <el-main class="homeView-container-main">Main</el-main>
    </el-container>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "homeView",
  components: {
    // HelloWorld,
  },
};
</script>

<style lang="scss" scoped>
.homeView {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-header {
    height: 50px;
    line-height: 50px;
    background-color: #304156;
    flex-shrink: 0;
  }

  &-container {
    display: flex;
    flex: 1;

    &-aside {
      text-align: left;
      padding-left: 20px;
      line-height: 50px;
      background-color: #495a6f;
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: auto;
    }
    &-main {
      flex: 1;
      background-color: #e9eef3;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
