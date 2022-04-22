<template>
  <div class="ReservationCreatorAndEditor">
    <el-dialog :title="params.dialogType" :visible.sync="isDialogVisible" @closed="onDialogClosed">
      <el-form :model="form" v-loading="isLoading">
        <div class="top">
          <el-form-item label="姓名：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width: 440px"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" :label-width="formLabelWidth">
            <el-input v-model="form.phone_code" autocomplete="off" style="width: 440px"></el-input>
          </el-form-item>
        </div>
        <el-form-item
          class="contactTime"
          label="预约时间："
          :label-width="formLabelWidth"
          prop="date"
        >
          <el-time-select
            placeholder="起始时间"
            v-model="form.startTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="form.endTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: form.startTime,
            }"
          >
          </el-time-select>
        </el-form-item>
        <div v-if="this.params.dialogType === '编辑'" class="bottom">
          <el-form-item label="状态：" :label-width="formLabelWidth">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="remarks" label="备注：" :label-width="formLabelWidth">
            <el-input
              v-model="form.remarks"
              maxlength="50"
              type="textarea"
              autosize
              autocomplete="off"
              style="width: 440px"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onDialogCancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSubmit()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqStoreReservation,
  reqShowReservation,
  reqUpdateReservation,
} from '@/api/reservation.js';
import { asyncTimeout } from '@/utils/helpers';
export default {
  name: 'ReservationCreatorAndEditor',
  data() {
    return {
      isDialogVisible: false,
      isLoading: false,
      params: {
        dialogType: '',
        reservationID: 0,
        reservationName: '',
        reservationPhoneCode: '',
      },
      rules: {},
      statusList: [
        {
          id: '0',
          title: '待沟通',
        },
        {
          id: '1',
          title: '已沟通',
        },
        {
          id: '2',
          title: '待定',
        },
        {
          id: '3',
          title: '已拒绝',
        },
      ],
      form: {
        name: '',
        phone_code: '',
        startTime: '',
        endTime: '',
        status: '',
        remarks: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    open(dialogType, reservationID, reservationName, reservationPhoneCode) {
      this.isDialogVisible = true;
      this.params.dialogType = dialogType;
      this.params.reservationID = reservationID;
      if (dialogType === '编辑') {
        this.params.reservationID = reservationID;
        this.params.reservationName = reservationName;
        this.params.reservationPhoneCode = reservationPhoneCode;
        console.log(reservationID, reservationName, reservationPhoneCode);
        this.initReservation();
      }
    },
    async initReservation() {
      try {
        this.isLoading = true;
        await asyncTimeout(1000);
        const res = await reqShowReservation(this.params.reservationID);
        let timeList = [];
        timeList.push(res.data.data.contact_time.replace('-', ','));
        timeList[0].split(',');
        this.form.name = res.data.data.name;
        this.form.phone_code = res.data.data.phone_code;
        this.form.startTime = timeList[0].split(',')[0];
        this.form.endTime = timeList[0].split(',')[1];
        this.form.status = res.data.data.status;
        this.form.remarks = res.data.data.status;
        console.log(res);
      } finally {
        this.isLoading = false;
      }
    },
    async onSubmit() {
      this.isDialogVisible = false;
      try {
        const data = {
          name: this.form.name,
          phone_code: this.form.phone_code,
          contact_time: this.form.startTime + '-' + this.form.endTime,
          remarks: this.form.remarks,
          status: this.form.status,
        };
        if (this.params.dialogType === '编辑') {
          await reqUpdateReservation(this.params.reservationID, data);
        } else {
          const res = await reqStoreReservation(data);
          console.log(res);
        }
        this.$emit('submit', true);
        this.$message.success(this.params.dialogType === '编辑' ? '编辑成功' : '创建成功');
      } catch (error) {
        this.$emit('submit', false);
        this.$message.error('创建失败');
        console.log(error);
        return;
        //
      }
    },
    handleChange(item) {
      console.log(item);
    },
    onDialogCancel() {
      this.isDialogVisible = false;
    },
    onDialogClosed() {
      this.form.name = '';
      this.form.phone_code = '';
      this.form.startTime = '';
      this.form.endTime = '';
      this.form.status = '';
      this.form.remarks = '';
    },
  },
};
</script>
