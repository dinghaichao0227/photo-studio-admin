<template>
  <div class="roleEdit">
    <el-dialog title="修改角色" :visible.sync="isDialogEditVisible" @closed="handleDialogClosed">
      <el-form :model="form" :rules="rules" ref="form">
        <div class="top">
          <el-form-item label="姓名：" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
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
import { editRole } from '@/api/role.js';

export default {
  name: 'roleEdit',
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
      form: {
        name: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    loadingData() {
      this.formData.map((item) => {
        this.tableId = item.id;
        this.form.name = item.name;
      });
      // console.log(this.form)
    },
    async onSubmit() {
      this.isDialogEditVisible = false;
      try {
        const res = await editRole({
          id: this.tableId,
          name: this.form.name,
        });
        if (res.data.code === 200) {
          this.$emit('submit', true);
          return this.$message.success('修改成功');
        }
        console.log(res);
      } catch (error) {
        this.$emit('submit', false);
        this.$message.error('修改失败');
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
.roleEdit {
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
