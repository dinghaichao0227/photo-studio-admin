<template>
  <div class="StaffCreatorAndEditor">
    <el-dialog :title="params.dialogType" :visible.sync="isDialogVisible" @closed="onDialogClosed">
      <el-form :model="form" v-loading="isLoading">
        <div class="top">
          <el-form-item label="员工姓名：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" :label-width="formLabelWidth">
            <el-input v-model="form.phone_code" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>
        </div>
        <div class="bottom">
          <el-form-item label="角色ID：" :label-width="formLabelWidth">
            <el-select v-model="form.rule_id" placeholder="请选择">
              <el-option
                v-for="item in ruleIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="颜色：" :label-width="formLabelWidth">
          <el-color-picker v-model="form.color"></el-color-picker>
          <!-- <el-input v-model="form.color" autocomplete="off" style="width: 440px"></el-input> -->
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.status" @change="onStatus">
            <el-radio label="1">在职</el-radio>
            <el-radio label="2">离职</el-radio>
          </el-radio-group>
          <!-- <el-input v-model="form.status" autocomplete="off" style="width: 440px"></el-input> -->
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
import { reqStoreStaff, reqShowStaff, reqUpdateStaff } from '@/api/staff.js';
import { reqGetRole } from '@/api/role.js';

import { asyncTimeout } from '@/utils/helpers.js';
export default {
  name: 'StaffCreatorAndEditor',
  data() {
    return {
      isDialogVisible: false,
      isLoading: false,
      ruleIdList: [],
      params: {
        dialogType: '',
        staffId: 0,
      },
      rules: {},
      form: {
        name: '',
        phone_code: '',
        rule_id: '', //角色ID
        status: '',
        color: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    open(dialogType, staffId) {
      this.isDialogVisible = true;
      this.params.dialogType = dialogType;
      this.params.staffId = staffId;
      if (dialogType === '编辑') {
        this.params.staffId = staffId;
        this.initStaff();
      }
    },
    onStatus(i) {
      console.log(i);
    },
    async initStaff() {
      try {
        this.isLoading = true;
        await asyncTimeout(1000);
        const res = await reqShowStaff(this.params.staffId);
        this.form.name = res.data.data.name;
        this.form.phone_code = res.data.data.phone_code;
        this.form.status = res.data.data.status;
        this.form.color = res.data.data.color;
        this.form.rule_id = res.data.data.rule_id;
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
          color: this.form.color,
          rule_id: this.form.rule_id,
          status: this.form.status,
        };
        if (this.params.dialogType === '编辑') {
          await reqUpdateStaff(this.params.staffId, data);
        } else {
          const res = await reqStoreStaff(data);
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
      this.form.color = '';
      this.form.status = '';
      this.form.rule_id = '';
    },
  },
  async mounted() {
    const res = await reqGetRole({
      page: 1,
      size: 100,
    });
    console.log(res);
    this.ruleIdList = res.data.data;
  },
};
</script>
