<template>
  <el-card class="staff">
    <div>
      <el-button icon="el-icon-plus" size="small" type="primary" @click="onCreate"
        >创建新订单</el-button
      >
    </div>

    <el-form inline size="mini" class="g-gap">
      <el-form-item>
        <el-input placeholder="请输入客户姓名" v-model="form.name" clearable> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain icon="el-icon-search" @click="onShow" type="primary">Search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-refresh-left" @click="onClear">Reset</el-button>
      </el-form-item>
    </el-form>
    <!-- <activity-create
          :isVisible="isDialogCreateVisible"
          @dialog-change="handleDialogChange"
          @submit="handleSubmit"
        /> -->
    <el-table :data="tableData" v-loading="isLoading" style="width: 100%">
      <el-table-column label="员工名称" prop="name" width="100px"> </el-table-column>
      <el-table-column label="手机号" prop="photo_code" width="120px"> </el-table-column>
      <el-table-column label="角色名称" prop="rule_id" width="120px"> </el-table-column>
      <el-table-column label="颜色" prop="color" width="100px"></el-table-column>
      <el-table-column label="状态" prop="status" width="100px"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="g-gap-s g-align-right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- <activity-edit
      :isEditVisible="isEditDialogVisible"
      :formData="formData"
      :time="time"
      @dialog-change="handleEditDialog"
      @submit="handleSubmit"
    /> -->
  </el-card>
</template>

<script>
// import ActivityCreate from './ActivityCreate.vue';
// import ActivityEdit from './ActivityEdit.vue';
import { reqGetActivity, reqDelActivity } from '@/api/activity.js';
import { purifyTime } from '@/utils/Time.js';
export default {
  name: 'staff',
  components: {
    // ActivityCreate,
    // ActivityEdit,
  },
  data() {
    return {
      isDialogCreateVisible: false,
      isEditDialogVisible: false,
      isLoading: false,
      time: '',
      createdTime: '',
      updatedTime: '',
      formData: [],
      total: null,
      pageAndSize: {
        page: 1,
        size: 10,
      },
      tableData: [],
      search: '',
      form: {
        name: '',
      },
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
      (this.form.name = ''), this.getReservationData();
    },
    handleSizeChange(val) {
      this.pageAndSize.size = val;
      console.log(`每页 ${val} 条`);
      this.getActivityData();
    },
    handleCurrentChange(val) {
      this.pageAndSize.page = val;
      this.getActivityData();

      console.log(`当前页: ${val}`);
    },
    handleSubmit() {
      this.getActivityData();
    },
    async getActivityData() {
      try {
        const res = await reqGetActivity(this.pageAndSize);
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
    handleDialogChange(newVal) {
      this.isDialogCreateVisible = newVal;
    },
    handleEditDialog(newValue) {
      this.isEditDialogVisible = newValue;
    },
    onCreate() {
      this.isDialogCreateVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.isEditDialogVisible = true;
      this.formData.push(row);
      this.time = row.contact_time;
      // console.log(this.formData, 77)
    },
    async handleDelete(index, row) {
      try {
        const res = await reqDelActivity({
          id: row.id,
        });
        if (res.data.code === 200) {
          this.getActivityData();
          return this.$message.success('创建成功');
        }
        console.log(res);
      } catch (error) {
        this.$message.success('创建成功');
        return this.getActivityData();
      }
    },
    handleStatusName(status) {
      const statusNameList = {
        0: '待沟通',
        1: '已沟通',
        2: '待定',
        3: '已拒绝',
      };
      return statusNameList[status];
    },
  },
  mounted() {
    this.getActivityData();
  },
};
</script>
