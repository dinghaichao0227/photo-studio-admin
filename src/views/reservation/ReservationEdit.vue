<template>
  <div class="reservationCreate">
    <el-dialog
      title="编辑预约订单"
      :visible.sync="isDialogEditVisible"
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
            prop="phone_code"
            :label-width="formLabelWidth"
          >
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
            v-model="form.contact_time1"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="form.contact_time2"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: form.contact_time1,
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
          <el-form-item
            class="remarks"
            label="备注："
            :label-width="formLabelWidth"
          >
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
        <el-button type="primary" @click="onSubmit" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ReservationCreate",
  props: {
    isEditVisible: { type: Boolean, required: true },
    formData: Array,
  },
  watch: {
    isEditVisible(newValue) {
      this.isDialogEditVisible = newValue;
      // this.loadingData();
    },
    isDialogEditVisible(newVal) {
      this.$emit("dialog-change", newVal);
      this.loadingData();
    },
  },
  data() {
    return {
      isDialogEditVisible: false,
      tableId: "",
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 2, message: "最小长度2个字符", trigger: "blur" },
        ],
        phone_code: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        contactTime: [{ required: true, message: "请选择时间" }],
      },
      statusList: [
        {
          id: "0",
          title: "待沟通",
        },
        {
          id: "1",
          title: "已沟通",
        },
        {
          id: "2",
          title: "待定",
        },
        {
          id: "3",
          title: "已拒绝",
        },
      ],
      form: {
        name: "",
        phoneCode: "",
        contact_time1: "",
        contact_time2: "",
        status: "",
        remarks: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    loadingData() {
      this.formData.map((item) => {
        // console.log(item);
        this.form = item;
        item.contact_time.replace("-", ",");
        let time = [];
        time.push(item.contact_time.replace("-", ","));
        console.log(time);
        // console.log(item.contact_time.replace("-", ","));
        // console.log(item.contact_time.split(",").join());
        return;
      });
      // console.log(this.form)
    },
    async onSubmit() {
      this.isDialogEditVisible = true;
      try {
        await this.$refs.form.validate();
      } catch {
        return this.$message.warning("请完善表单");
      }
    },
    cancelDialog() {
      this.$refs.form.resetFields();
      this.isDialogEditVisible = false;
    },
    handleDialogClosed() {
      this.$refs.form.resetFields();
      // this.form.name = "";
      // this.form.phoneCode ="";
      // this.form.contactTime = "";
      // this.form.status = "";
      // this.form.remarks = "";
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
