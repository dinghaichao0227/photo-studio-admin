<template>
  <div class="DrawerList">
    <el-dialog :visible.sync="dialogVisible">
      <template slot="title">
        <span class="g-size-l">数组详细</span>
      </template>
      <!-- <el-divider class="g-gap-m"></el-divider>s -->
      <el-descriptions title="用户信息" class="g-size-m">
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
        <el-descriptions-item label="参与活动">{{
          this.params.activity_name
        }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{ this.params.staff_name }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ this.params.remarks }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{ this.params.status }}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DrawerList',
  data() {
    return {
      dialogVisible: false,
      title: '数据详细',
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
        activity_name: '',
        staff_id: '',
        staff_name: '',
        status: '',
      },
    };
  },
  methods: {
    open(params) {
      this.dialogVisible = true;
      this.params = params;
    },
    onEdit() {
      //
    },
  },
};
</script>

<style></style>
