<template>
  <el-card class="role" shadow="hover">
    <div>
      <el-button icon="el-icon-plus" size="small" type="primary" @click="onCreate"
        >创建新订单</el-button
      >
    </div>

    <el-form inline size="mini" class="g-gap">
      <el-form-item>
        <el-input placeholder="请输入角色姓名" v-model="form.name" clearable> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain icon="el-icon-search" @click="onShow" type="primary">Search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-refresh-left" @click="onClear">Reset</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="isLoading">
      <el-table-column label="ID" prop="id" width="100px"> </el-table-column>
      <el-table-column label="角色姓名" prop="name" width="150px"> </el-table-column>created_at
      <el-table-column label="创建时间" prop="created_at">
        <template slot-scope="scope">
          {{ purifyTime(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="updated_at">
        <template slot-scope="scope">
          {{ purifyTime(scope.row.updated_at) }}
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="onEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="您确定删除吗？" @confirm="handleDelete(scope.row)">
            <el-button
              style="margin-left: 8px"
              slot="reference"
              plain
              size="small"
              icon="el-icon-delete"
              type="danger"
              >删除</el-button
            ></el-popconfirm
          >
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
    <role-creator-and-editor ref="RoleCreatorAndEditor" @submit="handleCreatedAndEdited" />
  </el-card>
</template>

<script>
import RoleCreatorAndEditor from './RoleCreatorAndEditor';

import { reqGetRole, reqDelRole } from '@/api/role.js';

import { purifyTime } from '@/utils/Time.js';
export default {
  name: 'role',
  components: {
    RoleCreatorAndEditor,
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
      pageSizes: [50, 100],
      pageAndSize: {
        page: 1,
        size: 10,
      },
      form: {
        name: '',
      },
      tableData: [],
      search: '',
    };
  },
  methods: {
    async handleDelete(row) {
      console.log(row);
      await reqDelRole(row.id);
      // this.$message.success('删除成功');
      this.getRoleData();
    },
    handleCreatedAndEdited() {
      this.getRoleData();
    },
    purifyTime,
    onShow() {
      this.tableData = this.tableData.filter(
        (data) => !this.form.name || data.name.toLowerCase().includes(this.form.name.toLowerCase())
      );
      this.total = this.tableData.length;
    },
    onClear() {
      (this.form.name = ''), this.getRoleData();
    },
    handleSizeChange(val) {
      this.pageAndSize.size = val;
      console.log(`每页 ${val} 条`);
      this.getRoleData();
    },
    handleCurrentChange(val) {
      this.pageAndSize.page = val;
      this.getRoleData();

      console.log(`当前页: ${val}`);
    },
    async getRoleData() {
      try {
        const res = await reqGetRole(this.pageAndSize);
        this.tableData = res.data.data;
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
      this.$refs.RoleCreatorAndEditor.open('创建');
    },
    onEdit(row) {
      this.$refs.RoleCreatorAndEditor.open('编辑', row.id);

      // console.log(index, row);
      // this.isEditDialogVisible = true;
      // this.formData.push(row);
      // this.time = row.contact_time;
      // console.log(this.formData, 77)
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
    this.getRoleData();
  },
};
</script>

<style lang="scss" scoped>
.role {
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;

    .inputText {
      width: 150px;
    }

    .but {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;

      .butColor {
        background-color: #009688;
        color: #fff;
      }
    }
  }
  .pagination {
    text-align: right;
  }
}
</style>
