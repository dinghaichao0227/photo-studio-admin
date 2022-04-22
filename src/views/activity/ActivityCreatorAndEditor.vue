<template>
  <div class="ActivityCreatorAndEditor">
    <el-dialog :title="params.dialogType" :visible.sync="isDialogVisible" @closed="onDialogClosed">
      <el-form :model="form" v-loading="isLoading">
        <div class="top">
          <el-form-item label="姓名：" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>
        </div>
        <el-form-item
          class="contact_time"
          label="活动时间："
          :label-width="formLabelWidth"
          prop="date"
        >
          <div class="block">
            <el-date-picker
              v-model="form.contact_time"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item
          v-if="this.params.dialogType === '编辑'"
          label="状态："
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.status" autocomplete="off"></el-input>
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
import { reqStoreActivity, reqShowActivity, reqUpdateActivity } from '@/api/activity.js';
import { asyncTimeout } from '@/utils/helpers.js';
import { purifyTime } from '@/utils/Time.js';

export default {
  name: 'ActivityCreatorAndEditor',

  data() {
    return {
      isDialogVisible: false,
      isLoading: false,
      rules: {},
      params: {
        dialogType: '',
        activityId: 0,
      },
      form: {
        name: '',
        contact_time: '',
        // start_time: '',
        // end_time: '',
        status: '1',
      },
      formLabelWidth: '120px',
      value2: '',
    };
  },
  methods: {
    purifyTime,
    open(dialogType, activityId) {
      this.isDialogVisible = true;
      this.params.dialogType = dialogType;
      if (this.params.dialogType === '编辑') {
        this.params.activityId = activityId;
        this.initActivity();
      }
    },
    async initActivity() {
      try {
        this.isLoading = true;
        await asyncTimeout(1000);
        const time = [];
        const res = await reqShowActivity(this.params.activityId);
        time.push(purifyTime(res.data.data.start_time), purifyTime(res.data.data.end_time));
        console.log(time, 56);
        this.form.name = res.data.data.name;
        (this.form.contact_time = time), (this.form.status = res.data.data.status);
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
          start_time: this.form.contact_time[0],
          end_time: this.form.contact_time[1],
          status: this.form.status,
        };
        if (this.params.dialogType === '编辑') {
          await reqUpdateActivity(this.params.activityId, data);
        } else {
          await reqStoreActivity(data);
        }
        this.$emit('submit', true);
        return this.$message.success(this.params.dialogType === '编辑' ? '编辑成功' : '创建成功');
      } catch (error) {
        this.$emit('submit', false);
        console.log(error);
        return this.$message.success(this.params.dialogType === '编辑' ? '编辑失败' : '创建失败');
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
      this.form.contact_time = '';
      this.form.status = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
