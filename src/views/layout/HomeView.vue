<template>
  <div class="homeView">
    <el-header class="homeView-header">
      <div class="left">
        <h2>相森记</h2>
      </div>
      <div class="right">
        <span>退出登录</span>
      </div>
    </el-header>
    <el-container class="homeView-container">
      <el-aside class="homeView-container-aside" width="200px">
        <Aside />
      </el-aside>
      <el-main class="homeView-container-main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";

export default {
  name: "homeView",
  components: {
    Aside,
  },
  data() {
    return {};
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
    background-color: #304156;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  &-container {
    display: flex;
    flex: 1;

    &-aside {
      text-align: left;
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
