<template>
  <el-card class="staff" shadow="hover">
    <div>
      <el-button icon="el-icon-plus" size="small" type="primary" @click="onCreate"
        >创建新订单</el-button
      >
    </div>

    <el-form inline size="mini" class="g-gap">
      <el-form-item>
        <el-input placeholder="请输入客员工姓名" v-model="form.name" clearable> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain icon="el-icon-search" @click="onShow" type="primary">Search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-refresh-left" @click="onClear">Reset</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" v-loading="isLoading" style="width: 100%">
      <el-table-column label="员工名称" prop="name" width="100px"> </el-table-column>
      <el-table-column label="手机号" prop="phone_code" width="120px"> </el-table-column>
      <el-table-column label="角色ID" prop="rule_id" width="120px">
        <template slot-scope="scope">
          <span v-for="item in ruleList" :key="item.id" :label="item.name" :value="item.id">
            <span v-if="scope.row.rule_id == item.id">{{ item.name }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="颜色" prop="color" width="100px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            circle
            :style="{ background: isColor ? scope.row.color : '' }"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" width="100px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '1' ? 'success' : 'danger'">{{
            scope.row.status === '1' ? '在职' : '离职'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="onEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="您确定删除吗？" @confirm="onDelete(scope.row)">
            <el-button
              style="margin-left: 8px"
              slot="reference"
              plain
              size="small"
              icon="el-icon-delete"
              type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="g-gap-s g-align-right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <staff-creator-and-editor ref="StaffCreatorAndEditor" @submit="handleSubmit" />
  </el-card>
</template>

<script>
import StaffCreatorAndEditor from './StaffCreatorAndEditor.vue';
import { reqGetStaff, reqDelStaff } from '@/api/staff.js';
import { reqGetRole } from '@/api/role.js';

import { purifyTime } from '@/utils/Time.js';
export default {
  name: 'staff',
  components: {
    StaffCreatorAndEditor,
  },
  data() {
    return {
      isColor: true,
      isDialogCreateVisible: false,
      isEditDialogVisible: false,
      isLoading: false,
      ruleList: [],
      time: '',
      createdTime: '',
      updatedTime: '',
      formData: [],
      total: null,
      pageSizes: [50, 100],
      pageAndSize: {
        page: 1,
        size: 10,
      },
      tableData: [],
      search: '',
      form: {
        name: '',
      },
      ruleId: null,
    };
  },
  methods: {
    purifyTime,
    onShow() {
      this.tableData = this.tableData.filter(
        (data) => !this.form.name || data.name.toLowerCase().includes(this.form.name.toLowerCase())
      );
      this.total = this.tableData.length;
    },
    onClear() {
      (this.form.name = ''), this.getStaffData();
    },
    handleSizeChange(val) {
      this.pageAndSize.size = val;
      console.log(`每页 ${val} 条`);
      this.getStaffData();
    },
    handleCurrentChange(val) {
      this.pageAndSize.page = val;
      this.getStaffData();

      console.log(`当前页: ${val}`);
    },
    handleSubmit() {
      this.getStaffData();
    },
    async getStaffData() {
      try {
        const res = await reqGetStaff(this.pageAndSize);
        this.tableData = res.data.date;
        this.total = res.data.total;
        if (res.data.code === 200) {
          this.isLoading = false;
          return;
        }
      } catch {
        this.isLoading = true;
        return;
      }
    },
    onCreate() {
      this.$refs.StaffCreatorAndEditor.open('创建员工');
    },
    onEdit(row) {
      this.$refs.StaffCreatorAndEditor.open('编辑', row.id);
    },
    async onDelete(row) {
      try {
        const res = await reqDelStaff(row.id);
        if (res.data.code === 200) {
          this.getStaffData();
          return this.$message.success('删除成功');
        }
        console.log(res);
      } catch (error) {
        this.$message.success('删除失败');
        return this.getStaffData();
      }
    },
  },
  async mounted() {
    this.getStaffData();
    this.getStaffData();
    const res = await reqGetRole({
      page: 1,
      size: 100,
    });
    this.ruleList = res.data.data;
  },
};
</script>
