<template>
  <el-dialog :title="params.dialogType" :visible.sync="isVisible" @closed="onDialogClosed">
    <el-form :model="form" v-loading="isLoading">
      <div class="g-flex">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期"> </el-date-picker>
          <!-- <el-input v-model="form.date" autocomplete="off"></el-input> -->
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="星期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.week"
            type="week"
            format="第 WW 周 dd日"
            placeholder="选择周"
          >
          </el-date-picker>
          <!-- <el-input v-model="form.week" autocomplete="off"></el-input> -->
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
          <!-- <el-input v-model="form.time" autocomplete="off"></el-input> -->
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
          <el-radio-group v-model="form.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
          <!-- <el-input v-model="form.sex" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
          <!-- <el-input v-model="form.birthday" autocomplete="off"></el-input> -->
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="区名称" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="form.area"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
          ></el-autocomplete>
          <!-- <el-input v-model="form.area" autocomplete="off"></el-input> -->
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
          <el-radio-group v-model="form.method">
            <el-radio label="2">上门</el-radio>
            <el-radio label="3">到店</el-radio>
          </el-radio-group>
          <!-- <el-input v-model="form.method" autocomplete="off"></el-input> -->
        </el-form-item>
      </div>
      <div class="g-flex">
        <el-form-item label="参与活动" :label-width="formLabelWidth">
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
      </div>
      <div class="g-flex">
        <el-form-item label="负责人" :label-width="formLabelWidth">
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
      params: {
        dialogType: '',
        orderId: 0,
        rowName: '',
        rowPhoneCode: '',
      },
      form: {
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
      formLabelWidth: '120px',
    };
  },
  methods: {
    orderTime,
    open(dialogType, orderId, rowName, rowPhoneCode) {
      this.isVisible = true;
      this.params.dialogType = dialogType;
      this.params.orderId = orderId;
      if (dialogType === '转化订单') {
        this.params.orderId = orderId;
        this.params.rowName = rowName;
        this.params.rowPhoneCode = rowPhoneCode;
        this.form.name = rowName;
        this.form.phone_code = rowPhoneCode;
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
        this.form.week = orderTime(res.data.data.week);
        this.form.name = res.data.data.name;
        this.form.phone_code = res.data.data.phon_code;
        this.form.sex = res.data.data.sex;
        this.form.birthday = orderTime(res.data.data.birthday);
        this.form.area = res.data.data.area;
        this.form.address = res.data.data.address;
        this.form.merchant = res.data.data.merchant;
        this.form.method = res.data.data.method;
        this.form.remarks = res.data.data.remarks;
        this.form.activity_id = res.data.data.activity_id;
        this.form.staff_id = res.data.data.staff_id;
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
        date: this.form.date,
        time: this.form.time,
        week: this.form.week,
        name: this.form.name,
        phone_code: this.form.phone_code,
        sex: this.form.sex,
        birthday: this.form.birthday,
        area: this.form.area,
        address: this.form.address,
        merchant: this.form.merchant,
        method: this.form.method,
        remarks: this.form.remarks,
        activity_id: this.form.activity_id,
        staff_id: this.form.staff_id,
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
      } finally {
        this.$message.success(this.params.dialogType === '编辑' ? '编辑失败' : '转化失败');
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
  },
  async mounted() {
    this.restaurants = this.loadAll();
    try {
      const params = { page: 1, size: 50 };
      const res = await reqGetActivity(params);
      this.getActivityId = res.data.date;
    } finally {
      //
    }
    try {
      const params = { page: 1, size: 50 };
      const res = await reqGetStaff(params);
      this.getStaffId = res.data.date;
    } finally {
      //
    }
  },
};
</script>
