<template>
  <el-dialog :title="params.dialogType" :visible.sync="isVisible" @closed="onDialogClosed">
    <el-form :model="form" v-loading="isLoading" class="g-flex-list">
      <div class="g-flex">
        <div class="g-flex-list">
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="星期" :label-width="formLabelWidth">
            <el-select v-model="form.week" placeholder="请选择" style="width: 220px">
              <el-option
                v-for="item in weekList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务时间" :label-width="formLabelWidth">
            <el-time-select
              v-model="form.time"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
              }"
              placeholder="选择时间"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="客户名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone_code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="form.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth">
            <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="g-flex-list">
          <el-form-item label="区名称" :label-width="formLabelWidth">
            <el-autocomplete
              style="width: 220px"
              class="inline-input"
              v-model="form.area"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="具体地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商户" :label-width="formLabelWidth">
            <el-input v-model="form.merchant" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务类型" :label-width="formLabelWidth">
            <el-radio-group v-model="form.method">
              <el-radio label="上门">上门</el-radio>
              <el-radio label="到店">到店</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="参与活动" :label-width="formLabelWidth">
            <el-select
              v-model="form.activity_id"
              style="width: 220px"
              placeholder="请选择"
              @change="onActivity"
            >
              <el-option
                v-for="item in getActivityId"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" :label-width="formLabelWidth">
            <el-select
              v-model="form.staff_id"
              style="width: 220px"
              placeholder="请选择"
              @change="onStaff"
            >
              <el-option
                v-for="item in getStaffId"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-input v-model="form.status" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </div>
      <div>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="form.remarks"
            maxlength="50"
            type="textarea"
            autosize
            autocomplete="off"
            style="width: 560px"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { asyncTimeout } from '@/utils/helpers';
import { reqStoreOrder, reqUpdateOrder, reqShowOrder } from '@/api/order';
import { reqGetActivity } from '@/api/activity';
import { reqGetStaff } from '@/api/staff';
import { loadAll } from './config/AreaList';
import { orderTime } from '@/utils/Time.js';

export default {
  name: 'OrderCreatorAndEditor',
  data() {
    return {
      isVisible: false,
      isLoading: false,
      restaurants: [],
      getAdvance: [],
      getActivityId: [],
      getStaffId: [],
      activityName: '',
      staffName: '',
      weekList: [
        {
          value: '周一',
          name: '周一',
        },
        {
          value: '周二',
          name: '周二',
        },
        {
          value: '周三',
          name: '周三',
        },
        {
          value: '周四',
          name: '周四',
        },
        {
          value: '周五',
          name: '周五',
        },
        {
          value: '周六',
          name: '周六',
        },
        {
          value: '周日',
          name: '周日',
        },
      ],
      params: {
        dialogType: '',
        orderId: 0,
        reservationId: 0,
        reservationName: '',
        reservationPhoneCode: '',
      },
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
        status: '1',
      },
      formLabelWidth: '120px',
      reservation: {},
    };
  },
  methods: {
    orderTime,
    open(dialogType, orderId, reservationId, reservationName, reservationPhoneCode) {
      this.isVisible = true;
      this.params.dialogType = dialogType;
      if (dialogType === '转化订单') {
        this.form.name = reservationName;
        this.form.phone_code = reservationPhoneCode;
        this.params.reservationId = reservationId;
        console.log(reservationId, reservationName, reservationPhoneCode);
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
        this.form.date = orderTime(res.data.data.date);
        this.form.time = res.data.data.time;
        this.form.week = res.data.data.week;
        this.form.name = res.data.data.name;
        this.form.phone_code = res.data.data.phone_code;
        this.form.sex = res.data.data.sex;
        this.form.birthday = orderTime(res.data.data.birthday);
        this.form.area = res.data.data.area;
        this.form.address = res.data.data.address;
        this.form.merchant = res.data.data.merchant;
        this.form.method = res.data.data.method;
        this.form.remarks = res.data.data.remarks;
        this.form.activity_id = res.data.data.activity_name;
        this.form.activity_name = res.data.data.activity_name;
        this.form.staff_id = res.data.data.staff_name;
        this.form.staff_name = res.data.data.staff_name;
        this.form.status = res.data.data.status;
        console.log(res);
      } finally {
        this.isLoading = false;
      }
    },
    loadAll,
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    async onSubmit() {
      // const api = this.params.dialogType ==='CREATE' ? reqStoreOrder : redUpdateOrder;
      const reqData = {
        advance_id: this.params.reservationId,
        date: orderTime(this.form.date),
        time: this.form.time,
        week: this.form.week,
        name: this.form.name,
        phone_code: this.form.phone_code,
        sex: this.form.sex,
        birthday: orderTime(this.form.birthday),
        area: this.form.area,
        address: this.form.address,
        merchant: this.form.merchant,
        method: this.form.method,
        remarks: this.form.remarks,
        activity_id: this.form.activity_id,
        activity_name: this.activityName,
        staff_id: this.form.staff_id,
        staff_name: this.staffName,
        status: this.form.status,
      };
      try {
        if (this.params.dialogType === '转化订单') {
          const res = await reqStoreOrder(reqData);
          console.log(res, 3);
        } else {
          const res = await reqUpdateOrder(this.params.orderId, reqData);
          console.log(res, 5);
        }
        this.$message.success(this.params.dialogType === '编辑' ? '编辑成功' : '转化成功');
        this.$emit('submit');
        this.isVisible = false;
        // this.$emit('success');
      } catch {
        this.$message.error(this.params.dialogType === '编辑' ? '编辑失败' : '转化失败');
        this.$emit('submit');
        this.isVisible = false;
      }
    },
    onDialogClosed() {
      this.isVisible = false;
      this.form.date = '';
      this.form.time = '';
      this.form.week = '';
      this.form.name = '';
      this.form.phone_code = '';
      this.form.sex = '';
      this.form.birthday = '';
      this.form.area = '';
      this.form.address = '';
      this.form.merchant = '';
      this.form.method = '';
      this.form.remarks = '';
      this.form.activity_id = '';
      this.form.staff_id = '';
    },
    async onActivity(id = 1) {
      try {
        const params = { page: 1, size: 50 };
        const res = await reqGetActivity(params);
        this.getActivityId = res.data.date;
        let odj = {};
        odj = this.getActivityId.find((item) => {
          return item.id === id;
        });
        this.activityName = odj.name;
      } finally {
        //
      }
    },
    async onStaff(id = 1) {
      try {
        const params = { page: 1, size: 50 };
        const res = await reqGetStaff(params);
        this.getStaffId = res.data.date;
        let odj = {};
        odj = this.getStaffId.find((item) => {
          return item.id === id;
        });
        this.staffName = odj.name;
      } finally {
        //
      }
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.onActivity();
    this.onStaff();
  },
};
</script>
