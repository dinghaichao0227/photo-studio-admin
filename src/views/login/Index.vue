<template>
  <div class="login">
    <div class="login-left">
      <el-card class="login-left-card">
        <h1>Sign in</h1>
        <p class="size">A minimalist layout for Login pages</p>
        <el-form ref="form" :model="form" label-width="80px">
          <div class="username">
            <el-input v-model="form.username" placeholder="用户名："></el-input>
          </div>
          <div class="password">
            <el-input
              v-model="form.password"
              placeholder="密码："
              show-password
            ></el-input>
          </div>
          <div class="button">
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
    <div class="login-right">
      <img class="login-right-image" :src="img" alt="" />
    </div>
  </div>
</template>

<script>
import image from "@/assets/520.png";
export default {
  name: "login",
  data() {
    return {
      img: image,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // sessionStorage.setItem("token");
      this.$router.push("./reservation");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;

  &-left {
    &-card {
      width: 550px;
      height: 500px;
      // border: 1px solid rgb(213, 213, 213);
      // box-shadow: 0px 1px 1px rgb(213, 213, 213);
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .size {
        color: #888;
        padding-bottom: 20px;
      }
      .username,
      .password {
        width: 460px;
        height: 60px;
        padding-bottom: 20px;

        ::v-deep .el-input__inner {
          height: 60px;
        }
      }

      .button {
        width: 480px;
        height: 50px;
        padding-top: 50px;
        display: flex;
        align-items: center;

        .el-button--primary {
          width: 460px;
          height: 62px;
        }
      }
    }
  }
  &-right {
      width: 550px;
      height: 500px;
     
    &-image {
      width: 100%;
      height: 100%;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      background-position: 100%, 100%;
    }
  }
}
.el-input--medium .el-input__inner {
  height: 100px;
  line-height: 100px;
}
</style>
