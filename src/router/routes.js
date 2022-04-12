import HomeView from "../views/layout/HomeView.vue";

export const navigation = [
  {
    path: "reservation",
    name: "Reservation",
    meta: { icon: "el-icon-s-claim", title: "预约信息管理" },
    component: () => import("../views/reservation/Index.vue"),
  },
  {
    path: "orderForm",
    name: "orderForm",
    meta: { icon: "el-icon-menu", title: "订单信息管理" },
    component: () => import("../views/order_form/Index.vue"),
  },
  {
    path: "role",
    name: "role",
    meta: { icon: "el-icon-s-custom", title: "角色管理" },
    component: () => import("../views/role/Index.vue"),
  },
  {
    path: "personnel",
    name: "personnel",
    meta: { icon: "el-icon-user", title: "人员管理" },
    component: () => import("../views/personnel/Index.vue"),
  },
  {
    path: "activity",
    name: "activity",
    meta: { icon: "", title: "活动管理" },
    component: () => import("../views/activity/Index.vue"),
  },
];

export const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/reservation",
    component: HomeView,
    children: [...navigation],
  },
];
