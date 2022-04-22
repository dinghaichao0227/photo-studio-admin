<template>
  <div class="404">
    <el-result icon="error" title="404" subTitle="亲，可能没有找到您需要的，您可以点击返回到首页">
      <template slot="extra">
        <el-button type="primary" @click="onSubmit" size="medium">返回</el-button>
      </template>
    </el-result>
  </div>
</template>
<script>
export default {
  name: '404',
  methods: {
    onSubmit() {
      this.$router.push('./Reservation');
    },
  },
};
</script>
