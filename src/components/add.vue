<template>
  <el-dialog title="新增弹窗" :visible.sync="isVisible" :close-on-click-modal="false">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      form: {},
      formLabelWidth: '120px',
    };
  },
  methods: {
    handleClose() {
      this.$emit('close', false);
    },
  },
};
</script>
