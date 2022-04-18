<template>
  <div class="ActivityCreate">
    <el-dialog
      title="创建预约订单"
      :visible.sync="isDialogCreateVisible"
      @closed="handleDialogClosed"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <div class="top">
          <el-form-item label="姓名：" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <el-form-item
          class="contactTime"
          label="活动时间："
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onDialogCancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSubmit()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createPlan } from '@/api/plan.js';
export default {
  name: 'ActivityCreate',
  props: {
    isVisible: { type: Boolean, required: true },
  },
  watch: {
    isVisible(newValue) {
      this.isDialogCreateVisible = newValue;
      console.log(newValue);
    },
    isDialogCreateVisible(newVal) {
      this.$emit('dialog-change', newVal);
      console.log(newVal, 22);
    },
  },
  data() {
    return {
      isDialogCreateVisible: false,
      rules: {},
      form: {
        name: '',
        start_time: '',
        end_time: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    async onSubmit() {
      this.isDialogCreateVisible = false;
      try {
        await this.$refs.form.validate();
      } catch {
        return this.$message.warning('请完善表单');
      }
      try {
        const res = await createPlan({
          name: this.form.name,
          start_time: this.form.start_time,
          end_time: this.form.end_time,
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
.ActivityCreate {
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
