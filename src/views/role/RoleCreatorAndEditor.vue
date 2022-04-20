<template>
  <div class="role">
    <el-dialog :title="params.dialogType" :visible.sync="isDialogVisible" @closed="onDialogClosed">
      <el-form :model="form" v-loading="isLoading">
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 200px"></el-input>
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
import { reqStoreRole, reqUpdateRole, reqShowRole } from '@/api/role.js';
import { asyncTimeout } from '@/utils/helpers';

export default {
  name: 'roleCreate',
  data() {
    return {
      isLoading: false,
      params: {
        dialogType: '',
        roleId: 0,
      },

      isDialogVisible: false,
      rules: {},
      form: {
        name: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    open(dialogType, roleId) {
      this.isDialogVisible = true;
      this.params.dialogType = dialogType;
      this.params.roleId = roleId;
      if (dialogType === '编辑') {
        this.params.roleId = roleId;

        this.initRole();
      }
    },
    async initRole() {
      try {
        this.isLoading = true;
        await asyncTimeout(1000);
        const res = await reqShowRole(this.params.roleId);
        this.form.name = res.data.data.name;
      } finally {
        this.isLoading = false;
      }
    },

    async onSubmit() {
      this.isDialogVisible = false;
      try {
        if (this.params.dialogType === '编辑') {
          const data = { name: this.form.name, status: 1 };
          await reqUpdateRole(this.params.roleId, {
            data,
          });
        } else {
          await reqStoreRole({
            name: this.form.name,
          });
        }
        this.$emit('submit', true);
        this.$message.success(this.params.dialogType === '编辑' ? '编辑成功' : '创建成功');
      } catch (error) {
        return this.dialogType === '编辑'
          ? this.$message.error('编辑失败')
          : this.$message.error('创建失败');
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
    },
  },
};
</script>
