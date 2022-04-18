<template>
  <div class="role">
    <div class="header">
      <el-input class="inputText" v-model="search" size="mini" placeholder="输入关键字搜索" />
      <div class="but">
        <el-button class="butColor" size="mini" @click="onCreate">创建订单</el-button>
        <role-create
          :isVisible="isDialogCreateVisible"
          @dialog-change="handleDialogChange"
          @submit="handleSubmit"
        />
      </div>
    </div>
    <el-table
      :data="
        tableData.filter(
          (data) => !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" width="100px"> </el-table-column>
      <el-table-column label="角色姓名" prop="name" width="100px"> </el-table-column>
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
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <role-edit
      :isEditVisible="isEditDialogVisible"
      :formData="formData"
      :time="time"
      @submit="handleSubmit"
      @dialog-change="handleEditDialog"
    />
  </div>
</template>

<script>
import RoleCreate from './RoleCreate.vue';
import RoleEdit from './RoleEdit.vue';
import { getRole, delRole } from '@/api/role.js';
import { purifyTime } from '@/utils/Time.js';
export default {
  name: 'role',
  components: {
    RoleCreate,
    RoleEdit,
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
    };
  },
  methods: {
    purifyTime,
    // time,
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
    handleSubmit() {
      this.getRoleData();
    },
    async getRoleData() {
      try {
        const res = await getRole(this.pageAndSize);
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
        const res = await delRole({
          id: row.id,
        });
        if (res.data.code === 200) {
          this.getRoleData();
          return this.$message.success('删除成功');
        }
        console.log(res);
      } catch (error) {
        this.$message.error('删除失败');
        this.getRoleData();
        return;
        //
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
