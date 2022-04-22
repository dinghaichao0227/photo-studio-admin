<template>
  <el-card class="activity" shadow="hover">
    <div>
      <el-button icon="el-icon-plus" size="small" type="primary" @click="onCreate"
        >创建新订单</el-button
      >
    </div>

    <el-form inline size="mini" class="g-gap">
      <el-form-item>
        <el-input placeholder="请输入活动姓名" v-model="form.name" clearable> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain icon="el-icon-search" @click="onShow" type="primary">Search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-refresh-left" @click="onClear">Reset</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="isLoading">
      <el-table-column label="活动名称" prop="name" width="250px"> </el-table-column>
      <el-table-column label="开始时间" prop="start_time" width="250px">
        <template slot-scope="scope">
          {{ purifyTime(scope.row.start_time) }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="end_time" width="250px">
        <template slot-scope="scope">
          {{ purifyTime(scope.row.end_time) }}
        </template>
      </el-table-column>
      <el-table-column label="活动状态" prop="status" width="100px">
        <!-- <template slot-scope="scope">
          <span>{{ handleStatusName(scope.row.status) }}</span>
        </template> -->
      </el-table-column>
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
          <el-popconfirm title="这是一段内容确定删除吗？" @confirm="onDelete(scope.row)">
            <el-button
              style="margin-left: 6px"
              size="mini"
              slot="reference"
              type="danger"
              plain
              icon="el-icon-delete"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <activity-creator-and-editor ref="ActivityCreatorAndEditor" @submit="handleSubmit" />
  </el-card>
</template>

<script>
import ActivityCreatorAndEditor from './ActivityCreatorAndEditor.vue';
import { reqGetActivity, reqDelActivity } from '@/api/activity.js';
import { purifyTime } from '@/utils/Time.js';
export default {
  name: 'Reservation',
  components: {
    ActivityCreatorAndEditor,
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
        size: 50,
      },
      tableData: [],
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
      (this.form.name = ''), this.getActivityData();
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
    onCreate() {
      this.$refs.ActivityCreatorAndEditor.open('创建');
    },
    onEdit(row) {
      this.$refs.ActivityCreatorAndEditor.open('编辑', row.id);
    },
    async onDelete(row) {
      try {
        await reqDelActivity(row.id);
        this.getActivityData();
        this.$message.success('删除成功');
        this.getActivityData();
      } catch (error) {
        this.$message.success('删除失败');
        console.log(error);
        this.getActivityData();
      }
    },
  },
  mounted() {
    this.getActivityData();
  },
};
</script>

<style lang="scss" scoped>
.activity {
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
