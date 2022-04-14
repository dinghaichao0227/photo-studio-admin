<template>
  <div class="reservationCreate">
    <el-dialog
      title="创建预约订单"
      :visible.sync="isDialogCreateVisible"
      @closed="handleDialogClosed"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <div class="top">
          <el-form-item
            label="姓名："
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号："
            prop="phoneCode"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.phoneCode" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <el-form-item
          class="contactTime"
          label="预约时间："
          :label-width="formLabelWidth"
          prop="date"
        >
          <el-col :span="12">
            <el-form-item prop="date1">
              <el-time-picker
                placeholder="开始时间"
                v-model="form.contact_time"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onDialogCancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSubmit()" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { time } from "@/utils/Time.js";
import { createReservation } from "@/api/reservation.js";
export default {
  name: "ReservationCreate",
  props: {
    isVisible: { type: Boolean, required: true },
  },
  watch: {
    isVisible(newValue) {
      this.isDialogCreateVisible = newValue;
      console.log(newValue);
    },
    isDialogCreateVisible(newVal) {
      this.$emit("dialog-change", newVal);
      console.log(newVal, 22);
    },
  },
  data() {
    return {
      isDialogCreateVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 2, message: "最小长度2个字符", trigger: "blur" },
        ],
        phoneCode: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        // date: [
        //   {required: true}
        // ],
        // date1: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择开始",
        //     trigger: "change",
        //   },
        // ],
        // date2: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择结束时间",
        //     trigger: "change",
        //   },
        // ],
      },
      statusList: [
        {
          value: 0,
          title: "待沟通",
        },
        {
          value: 1,
          title: "已沟通",
        },
        {
          value: 2,
          title: "待定",
        },
        {
          value: 3,
          title: "已拒绝",
        },
      ],
      form: {
        name: "",
        phoneCode: "",
        contact_time: "",
        status: "",
        remarks: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    async onSubmit() {
      this.isDialogCreateVisible = false;
      try {
        await this.$refs.form.validate();
      } catch {
        return this.$message.warning("请完善表单");
      }
      try {
        const res = await createReservation({
          name: this.form.name,
          phone_code: this.form.phoneCode,
          contact_time: time(this.form.contact_time),
          remarks: this.form.remarks,
          status: this.form.status,
        });
        if (res.data.code === 200) {
          this.$emit("submit", true);
          return this.$message.success("创建成功");
        }
        console.log(res);
      } catch (error) {
        this.$emit("submit", false);
        this.$message.error("创建失败");
        console.log(error);
        return;
        //
      }
    },
    handleChange(item) {
      console.log(item);
    },
    onDialogCancel() {
      this.isDialogCreateVisible = false;
      this.$refs.form.resetFields();
    },
    handleDialogClosed() {
      this.$refs.form.resetFields();
    },
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

    // .line {
    //   margin-left: 150px;
    // }
  }
}
</style>
