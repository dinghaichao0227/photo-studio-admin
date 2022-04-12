<template>
  <div class="Aside">
    <el-menu
      :default-active="$route.name"
      unique-opened
      :router="true"
      class="el-menu-vertical-demo"
      @select="handleOpen"
      background-color="#495a6f"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        v-for="item in navigation"
        :key="item.name"
        :index="item.name"
      >
        <i :class="IconManagement(item.meta)"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
      <!-- <el-menu-item index="Reservation">
        <i class="el-icon-menu"></i>
        <span slot="title">预约信息管理</span>
      </el-menu-item>
      <el-menu-item index="orderForm">
        <i class="el-icon-document"></i>
        <span slot="title">订单信息管理</span>
      </el-menu-item>
      <el-menu-item index="role">
        <i class="el-icon-setting"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-menu-item index="personnel">
        <i class="el-icon-setting"></i>
        <span slot="title">人员管理</span>
      </el-menu-item>
      <el-menu-item index="activity">
        <i class="el-icon-setting"></i>
        <span slot="title">活动管理</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
import { navigation } from "@/router/routes";
export default {
  name: "Aside",
  data() {
    return {
      navigation: navigation,
    };
  },
  methods: {
    handleOpen(index) {
      this.$router.push({ name: index }).catch((error) => error);
    },
    IconManagement(iconList) {
      return iconList && iconList.icon ? iconList.icon : "el-icon-setting";
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
</style>
