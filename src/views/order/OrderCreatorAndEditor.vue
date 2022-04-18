<template>
  <el-dialog title="新增弹窗" :visible.sync="isVisible" :close-on-click-modal="false">
    <el-form :model="form" v-loading="isLoading">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { asyncTimeout } from '@/utils/helpers';
// import {reqShowOrder} from '@/api/order';

export default {
  data() {
    return {
      isVisible: false,
      isLoading: false,
      params: { pageType: '', orderId: 0 },
      form: {
        name: '',
        region: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    open(pageType, orderId) {
      this.isVisible = true;
      this.params.pageType = pageType;
      if (pageType === 'EDIT') {
        this.params.orderId = orderId;
        this.initOrder();
      }
    },
    // 回显
    async initOrder() {
      try {
        this.isLoading = true;
        await asyncTimeout(1000);
        // const res = await reqShowOrder(this.params.orderId);
        // console.log(res);
        this.form.name = '123';
        this.form.region = 'shanghai';
      } finally {
        this.isLoading = false;
      }
    },
    async onSubmit() {
      // const api = this.params.pageType ==='CREATE' ? reqStoreOrder : redUpdateOrder;
      const reqData = {
        name: this.form.name,
        region: this.form.region,
      };
      if (this.params.pageType === 'EDIT') reqData.id = this.params.orderId;

      // await api(reqData);

      this.$message.success(
        this.params.pageType === 'CREATE' ? 'CReate success.' : 'Edit success.'
      );
      this.$emit('submit');
      this.isVisible = false;
      // this.$emit('success');
    },
  },
};
</script>
