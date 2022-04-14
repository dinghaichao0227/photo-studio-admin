import HomeView from "../views/layout/HomeView.vue";
import Login from "../views/login/Index.vue";

export const navigation = [
  {
    path: "reservation",
    name: "Reservation",
    meta: { icon: "el-icon-s-claim", title: "预约信息管理" },
    component: () => import("../views/reservation/Index.vue"),
  },
  {
    path: "orderForm",
    name: "OrderForm",
    meta: { icon: "el-icon-menu", title: "订单信息管理" },
    component: () => import("../views/orderForm/Index.vue"),
  },
  {
    path: "role",
    name: "Role",
    meta: { icon: "el-icon-s-custom", title: "角色管理" },
    component: () => import("../views/role/Index.vue"),
  },
  {
    path: "personal",
    name: "Personal",
    meta: { icon: "el-icon-user", title: "人员管理" },
    component: () => import("../views/personal/Index.vue"),
  },
  {
    path: "activity",
    name: "Activity",
    meta: { icon: "", title: "活动管理" },
    component: () => import("../views/activity/Index.vue"),
  },
];

export const routes = [
  {
    path: "/",
    name: "HomeView",
    redirect: "/reservation",
    component: HomeView,
    children: [...navigation],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,

    // component: () => import("../views/login/Index.vue"),
  },
];
