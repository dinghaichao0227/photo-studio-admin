<template>
  <div class="reservationCreate">
    <el-dialog
      title="编辑预约订单"
      :visible.sync="isDialogEditVisible"
      @closed="handleDialogClosed"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <div class="top">
          <el-form-item label="姓名：" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone_code" :label-width="formLabelWidth">
            <el-input v-model="form.phone_code" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <el-form-item
          class="contactTime"
          label="预约时间："
          :label-width="formLabelWidth"
          prop="contactTime"
        >
          <el-time-select
            placeholder="起始时间"
            v-model="form.start_time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="form.end_time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: form.start_time,
            }"
          >
          </el-time-select>
        </el-form-item>
        <div class="bottom">
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
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSubmit" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editReservation } from '@/api/reservation.js';

export default {
  name: 'ReservationCreate',
  props: {
    isEditVisible: { type: Boolean, required: true },
    formData: Array,
    time: String,
  },
  watch: {
    isEditVisible(newValue) {
      this.isDialogEditVisible = newValue;
      // this.loadingData();
    },
    isDialogEditVisible(newVal) {
      this.$emit('dialog-change', newVal);
      this.loadingData();
    },
  },
  data() {
    return {
      isDialogEditVisible: false,
      tableId: '',
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
        start_time: '',
        end_time: '',
        status: '',
        remarks: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    loadingData() {
      this.formData.map((item) => {
        this.tableId = item.id;
        this.form.name = item.name;
        this.form.phone_code = item.phone_code;
        this.form.status = item.status;
        this.form.remarks = item.remarks;
        let timeList = [];
        timeList.push(item.contact_time.replace('-', ','));
        timeList[0].split(',');
        this.form.start_time = timeList[0].split(',')[0];
        this.form.end_time = timeList[0].split(',')[1];
      });
    },
    async onSubmit() {
      this.isDialogEditVisible = false;
      try {
        const res = await editReservation({
          id: this.tableId,
          name: this.form.name,
          phone_code: this.form.phone_code,
          contact_time: this.form.startTime + '-' + this.form.endTime,
          status: this.form.status,
          remarks: this.form.remarks,
        });
        if (res.data.code === 200) {
          this.$emit('submit', true);
          return this.$message.success('创建成功');
        }
        console.log(res);
      } catch (error) {
        this.$emit('submit', false);
        this.$message.error('创建失败');
        console.log(error);
        return;
        //
      }
    },
    cancelDialog() {
      this.isDialogEditVisible = false;
    },
    handleDialogClosed() {
      //
    },
  },
  mounted() {
    this.loadingData();
  },
};
</script>

<style lang="scss" scoped>
.reservationCreate {
  display: flex;
  flex-direction: column;

  .top,
  .bottom {
    display: flex;

    .remarks {
      margin-left: -15px;
    }
  }
  .contactTime {
    ::v-deep .el-input__inner {
      width: 190px;
    }
  }
}
</style>
