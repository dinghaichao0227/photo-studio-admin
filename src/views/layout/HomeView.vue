<template>
  <div class="homeView">
    <el-header class="homeView-header" height="40px">
      <div class="homeView-header-left">
        <h3>相森记</h3>
      </div>
      <div class="homeView-header-right">
        <span class="tab" @click="signOut">退出登录</span>
      </div>
    </el-header>
    <el-container class="homeView-container">
      <el-aside class="homeView-container-aside" width="auto">
        <Aside />
      </el-aside>
      <el-main class="homeView-container-main">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          :closable="isCloable"
          @tab-remove="removeTab"
          @tab-click="onClickTab"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.path"
            :label="item.meta.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ts-nocheck
import { mapState, mapMutations } from 'vuex';
import Aside from './Aside.vue';

export default {
  name: 'homeView',
  components: {
    Aside,
  },
  computed: {
    ...mapState({
      editableTabs: (state) => state.Tabs.editableTabs,
    }),
    editableTabsValue: {
      get() {
        return this.$store.state.Tabs.editableTabsValue;
      },
      set(val) {
        this.SET_VALUE(val);
      },
    },
    isCloable() {
      return this.editableTabs.length === 1 ? false : true;
    },
  },
  watch: {
    $route(val) {
      this.ADD_TABS(val);
      this.SET_VALUE(this.$route.name);
    },
  },
  data() {
    return {
      tabRouter: [],
    };
  },
  methods: {
    ...mapMutations(['ADD_TABS', 'SET_VALUE', 'REMOVE_TABS_NAME']),

    signOut() {
      sessionStorage.clear('token');
      this.$router.push('/login');
    },
    onClickTab(tab) {
      console.log(tab);
      this.$router.push(tab.name);
    },
    removeTab(tabName) {
      const isActive = this.editableTabsValue === tabName ? true : false;
      let tabList = this.editableTabs.findIndex((tab) => tab.name === tabName);
      console.log(tabList, 8764);
      if (isActive) {
        if (tabList === 0) {
          this.REMOVE_TABS_NAME(tabName);
          this.editableTabsValue = this.editableTabs[0].name;
          this.$router.push(this.editableTabs[0].name);
        }
        if (tabList === this.editableTabs.length - 1) {
          this.REMOVE_TABS_NAME(tabName);
          this.editableTabsValue = this.editableTabs[this.editableTabs.length - 1].name;
          this.$router.push(this.editableTabs[this.editableTabs.length - 1].name);
        }
        if (tabList) {
          this.REMOVE_TABS_NAME(tabName);
          this.editableTabsValue = this.editableTabs[tabList - 1].name;
          this.$router.push(this.editableTabs[tabList - 1].name);
        }
      } else {
        this.REMOVE_TABS_NAME(tabName);
      }
    },
  },
  mounted() {},
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
