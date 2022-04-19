<template>
  <el-card class="role">
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
    <!-- <role-create
      :isVisible="isDialogCreateVisible"
      @dialog-change="handleDialogChange"
      @submit="handleSubmit"
    /> -->
    <el-table :data="tableData" v-loading="isLoading">
      <el-table-column label="ID" prop="id" width="100px"> </el-table-column>
      <el-table-column label="角色姓名" prop="name" width="100px"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
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
    <role-creator-and-editor ref="RoleCreatorAndEditor" @submit="handleCreatedAndEdited" />
  </el-card>
</template>

<script>
import RoleCreatorAndEditor from './RoleCreatorAndEditor';
// import RoleCreate from './RoleCreate.vue';
// import RoleEdit from './RoleEdit.vue';
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
      this.$refs.RoleCreatorAndEditor.open('CREATE');
    },
    onEdit(row) {
      this.$refs.RoleCreatorAndEditor.open('UPDATE', row.id);

      // console.log(index, row);
      // this.isEditDialogVisible = true;
      // this.formData.push(row);
      // this.time = row.contact_time;
      // console.log(this.formData, 77)
    },
    async handleDelete(index, row) {
      try {
        const res = await reqDelRole(row.id);
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
