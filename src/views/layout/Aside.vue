<template>
  <div class="aside">
    <div class="icon" @click="clickExtend">
      <i v-if="isCollapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <el-menu
      :default-active="$route.name"
      unique-opened
      :router="true"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      @select="handleOpen"
      background-color="#EEEEEE"
      text-color="#000"
      active-text-color="#fff"
    >
      <el-menu-item
        class="menu-item"
        v-for="item in navigation"
        :key="item.name"
        :index="item.name"
      >
        <i :class="iconManagement(item.meta)"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { navigation } from '@/router/routes';
export default {
  name: 'Aside',
  data() {
    return {
      navigation: navigation,
      isCollapse: false,
    };
  },
  methods: {
    clickExtend() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(index) {
      // this.$router.push({ name: index });
      this.$router.push({ name: index }).catch((error) => {
        return error;
        // console.log(error);
      });
    },
    iconManagement(iconList) {
      return iconList && iconList.icon ? iconList.icon : 'el-icon-setting';
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>

.icon {
  text-align: center;
  line-height: 75px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  border-right: none;
}
.el-menu-item.is-active {
  background-color: #009688 !important;
}
</style>
