<template>
  <div class="aside">
    <el-menu
      :default-active="$route.name"
      unique-opened
      :router="true"
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
    };
  },
  methods: {
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
.el-menu-vertical-demo {
  border-right: none;
}
.el-menu-item.is-active {
  background-color: #009688 !important;
}
</style>
