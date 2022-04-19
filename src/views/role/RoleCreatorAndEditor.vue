<template>
  <div class="role">
    <el-dialog
      :title="params.dialogType"
      :visible.sync="isDialogVisible"
      @closed="handleDialogClosed"
    >
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
import { reqStoreRole, reqUpdateRole, rquShowRole } from '@/api/role.js';
import { asyncTimeout } from '@/utils/helpers';

export default {
  name: 'roleCreate',
  data() {
    return {
      isLoading: false,
      params: {
        dialogType: '',
        tableId: 0,
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
    open(dialogType, tableId) {
      this.isDialogVisible = true;
      this.params.dialogType = dialogType;
      this.params.tableId = tableId;
      if (dialogType === 'UPDATE') {
        console.log(tableId, 78);
        this.initRole();
      }
    },
    async initRole() {
      try {
        this.isLoading = true;
        await asyncTimeout(1000);
        const res = await rquShowRole(this.params.tableId);
        this.form.name = res.data.name;
        console.log(res);
        // console.log(this.params)
      } finally {
        this.isLoading = false;
      }
    },
    // initForm() {
    //   this.form.name = '123';
    //   console.log(this.form.name)
    // },
    async onSubmit() {
      this.isDialogVisible = false;
      try {
        if (this.params.dialogType === 'UPDATE') {
          const data = { name: this.form.name, status: 1 };
          await reqUpdateRole({
            data,
          });
          this.$message.success('编辑成功');
        } else {
          await reqStoreRole({
            name: this.form.name,
          });
          this.$emit('submit', true);
          this.$message.success('创建成功');
        }
      } catch (error) {
        return this.dialogType === 'UPDATE'
          ? this.$message.error('编辑失败')
          : this.$message.error('创建失败');
      }
    },
    handleChange(item) {
      console.log(item);
    },
    async onDialogCancel() {
      const res = await rquShowRole(this.params.tableId);
      console.log(res);
      this.isDialogVisible = false;
    },
    handleDialogClosed() {},
  },
};
</script>
