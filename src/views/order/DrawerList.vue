<template>
  <div class="DrawerList">
    <el-drawer title="数组详情" :visible.sync="drawer" :with-header="false" size="70%">
      <el-button @click="onEdit()" type="text" size="small" icon="el-icon-edit">编辑</el-button>
      <el-descriptions title="用户信息">
        <el-descriptions-item label="日期">{{ this.params.date }}</el-descriptions-item>
        <el-descriptions-item label="星期">{{ this.params.week }}</el-descriptions-item>
        <el-descriptions-item label="服务时间">{{ this.params.time }}</el-descriptions-item>
        <el-descriptions-item label="客户姓名">{{ this.params.name }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ this.params.phone_code }}</el-descriptions-item>
        <el-descriptions-item label="性别">
          <el-tag size="small">{{ this.params.sex }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="生日">{{ this.params.birthday }}</el-descriptions-item>
        <el-descriptions-item label="区名称">{{ this.params.area }}</el-descriptions-item>
        <el-descriptions-item label="具体地址">{{ this.params.address }}</el-descriptions-item>
        <el-descriptions-item label="商户">{{ this.params.merchant }}</el-descriptions-item>
        <el-descriptions-item label="上门/到店">
          <el-tag size="small">{{ this.params.method }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="参与活动">{{ this.params.activity_id }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{ this.params.staff_id }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ this.params.remarks }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'DrawerList',
  data() {
    return {
      drawer: false,
      params: {
        date: '',
        time: '',
        week: '',
        name: '',
        phone_code: '',
        sex: '',
        birthday: '',
        area: '',
        address: '',
        merchant: '',
        method: '',
        remarks: '',
        activity_id: '',
        staff_id: '',
      },
    };
  },
  methods: {
    open(params) {
      this.drawer = true;
      this.params = params;
    },
    onEdit() {
      //
    },
  },
};
</script>

<style></style>
