<template>
  <div class="reservation">
    <div class="header">
      <el-input
        class="inputText"
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"
      />
      <div class="but">
        <el-button class="butColor" size="mini" @click="onCreate"
          >创建订单</el-button
        >
        <reservation-create
          :isVisible="isDialogCreateVisible"
          @dialog-change="handleDialogChange"
          @submit="handleSubmit"
        />
      </div>
    </div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column label="客户姓名" prop="name" width="100px">
      </el-table-column>
      <el-table-column label="客户手机号" prop="phone_code" width="150px">
      </el-table-column>
      <el-table-column label="沟通时间" prop="contact_time" width="120px">
        <!-- <template slot-scope="scope">
          {{ time(scope.row.contact_time) }}
        </template> -->
      </el-table-column>
      <el-table-column label="预约状态" prop="status" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">待沟通</span>
          <span v-if="scope.row.status === '1'">已沟通</span>
          <span v-if="scope.row.status === '2'">待定</span>
          <span v-if="scope.row.status === '3'">已拒绝</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" width="150">
        <!-- <template slot-scope="scope">
          {{ formatTime(scope.row.created_at) }}
        </template> -->
      </el-table-column>
      <el-table-column label="修改时间" prop="updated_at" width="150">
        <!-- <template slot-scope="scope">
          {{ purifyTime(scope.row.updated_at) }}
        </template> -->
      </el-table-column>
      <el-table-column label="备注" prop="remarks" width="auto">
      </el-table-column>
      <el-table-column align="right">
        <!-- <template slot="header" slot-scope="">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template> -->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
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
    <reservation-edit
      :isEditVisible="isEditDialogVisible"
      :formData="formData"
      @dialog-change="handleEditDialog"
    />
  </div>
</template>

<script>
import ReservationCreate from "./ReservationCreate.vue";
import ReservationEdit from "./ReservationEdit.vue";
import { getReservation } from "@/api/reservation.js";
// import { formatTime, time } from "@/utils/Time.js";
export default {
  name: "Reservation",
  components: {
    ReservationCreate,
    ReservationEdit,
  },
  data() {
    return {
      isDialogCreateVisible: false,
      isEditDialogVisible: false,
      isLoading: false,
      createdTime: "",
      updatedTime: "",
      formData: [],
      total: null,
      pageAndSize: {
        page: 1,
        size: 100,
      },
      tableData: [],
      search: "",
    };
  },
  methods: {
    // formatTime,
    // time,
    handleSizeChange(val) {
      this.pageAndSize.size = val;
      console.log(`每页 ${val} 条`);
      this.getReservationData();
    },
    handleCurrentChange(val) {
      this.pageAndSize.page = val;
      this.getReservationData();

      console.log(`当前页: ${val}`);
    },
    handleSubmit() {
      this.getReservationData();
    },
    async getReservationData() {
      try {
        const res = await getReservation(this.pageAndSize);
        this.tableData = res.data.date;
        this.total = res.data.date.length;
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
      // console.log(index, row);
      this.isEditDialogVisible = true;
      this.formData.push(row);
      // console.log(this.formData, 77)
    },
    handleDelete(index, row) {
      console.log(row);
    },
  },
  mounted() {
    this.getReservationData();
  },
};
</script>

<style lang="scss" scoped>
.reservation {
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
