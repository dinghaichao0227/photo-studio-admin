<template>
  <div class="homeView">
    <el-header class="homeView-header">
      <div class="homeView-header-left">
        <h3>相森记</h3>
      </div>
      <div class="homeView-header-right">
        <span class="tab" @click="signOut">退出登录</span>
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
import Aside from "./Aside.vue";

export default {
  name: "homeView",
  components: {
    Aside,
  },
  data() {
    return {};
  },
  methods: {
    signOut() {
      sessionStorage.clear("token");
      this.$router.push("/login");
    },
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
    height: 40px;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    &-right {
      cursor: pointer;
    }
  }

  &-container {
    display: flex;
    flex: 1;
    overflow-y: auto;

    &-aside {
      text-align: left;
      line-height: 50px;
      background-color: #eeeeee;
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: auto;
    }
    &-main {
      flex: 1;
      background-color: #f1f1f1;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
