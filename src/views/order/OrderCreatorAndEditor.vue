<template>
  <el-dialog :title="params.dialogType" :visible.sync="isVisible" :close-on-click-modal="false">
    <el-form :model="form" v-loading="isLoading">
      <div class="g-flex">
        <el-form-item label="预约ID" :label-width="formLabelWidth">
          <el-select v-model="form.advance_id" placeholder="请选择">
            <el-option
              v-for="item in getAdvance"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="服务时间" :label-width="formLabelWidth">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="星期" :label-width="formLabelWidth">
          <el-input v-model="form.week" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="客户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone_code" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-input v-model="form.birthday" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="北京市辖区名称" :label-width="formLabelWidth">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="具体地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="商户" :label-width="formLabelWidth">
          <el-input v-model="form.merchant" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上门/到店" :label-width="formLabelWidth">
          <el-input v-model="form.method" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="活动ID" :label-width="formLabelWidth">
          <el-select v-model="form.activity_id" placeholder="请选择">
            <el-option
              v-for="item in getActivityId"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动Name" :label-width="formLabelWidth">
          <el-select v-model="form.activity_name" placeholder="请选择">
            <el-option
              v-for="item in getActivityName"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="人员ID" :label-width="formLabelWidth">
          <el-select v-model="form.staff_id" placeholder="请选择">
            <el-option
              v-for="item in getStaffId"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员Name" :label-width="formLabelWidth">
          <el-select v-model="form.staff_name" placeholder="请选择">
            <el-option
              v-for="item in getStaffName"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input
          v-model="form.remarks"
          maxlength="50"
          type="textarea"
          autosize
          autocomplete="off"
          style="width: 500px"
        ></el-input>
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
import { reqShowOrder } from '@/api/order';
import { reqGetReservation } from '@/api/reservation';
import { reqGetActivity } from '@/api/activity';
import { reqGetStaff } from '@/api/staff';

export default {
  data() {
    return {
      isVisible: false,
      isLoading: false,
      getAdvance: [],
      getActivityId: [],
      getActivityName: [],
      getStaffId: [],
      getStaffName: [],
      params: { dialogType: '', orderId: 0 },
      form: {
        advance_id: '',
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
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    open(dialogType, orderId, reservationID) {
      this.isVisible = true;
      this.params.dialogType = dialogType;
      if (dialogType === '转化订单') {
        this.params.reservationID = reservationID;
      }
      if (dialogType === '编辑') {
        this.params.orderId = orderId;

        this.initOrder();
      }
    },
    // 回显
    async initOrder() {
      try {
        this.isLoading = true;
        await asyncTimeout(1000);
        const res = await reqShowOrder(this.params.orderId);
        // this.form.name = res.data.data.name;
        console.log(res);
      } finally {
        this.isLoading = false;
      }
    },
    async onSubmit() {
      // const api = this.params.dialogType ==='CREATE' ? reqStoreOrder : redUpdateOrder;
      const reqData = {
        name: this.form.name,
        region: this.form.region,
      };
      if (this.params.dialogType === '编辑') reqData.id = this.params.orderId;

      // await api(reqData);

      this.$message.success(this.params.dialogType === '编辑' ? '编辑成功' : '创建成功');
      this.$emit('submit');
      this.isVisible = false;
      // this.$emit('success');
    },
  },
  async mounted() {
    try {
      const params = { page: 1, size: 50 };
      const res = await reqGetReservation(params);
      this.getAdvance = res.data.data;
    } finally {
      //
    }
    try {
      const params = { page: 1, size: 50 };
      const res = await reqGetActivity(params);
      this.getActivityId = res.data.date;
      this.getActivityName = res.data.date;
    } finally {
      //
    }
    try {
      const params = { page: 1, size: 50 };
      const res = await reqGetStaff(params);
      this.getStaffId = res.data.date;
      this.getStaffName = res.data.date;
    } finally {
      //
    }
  },
};
</script>
