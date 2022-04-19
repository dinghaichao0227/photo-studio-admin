<template>
  <el-card class="reservation">
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
    <reservation-create
      :isVisible="isDialogCreateVisible"
      @dialog-change="handleDialogChange"
      @submit="handleSubmit"
    />
    <el-table :data="tableData" v-loading="isLoading">
      <el-table-column label="客户姓名" prop="name" width="100px"> </el-table-column>
      <el-table-column label="客户手机号" prop="phone_code" width="150px"> </el-table-column>
      <el-table-column label="沟通时间" prop="contact_time" width="120px"> </el-table-column>
      <el-table-column label="预约状态" prop="status" width="100px">
        <template slot-scope="scope">
          <span>{{ handleStatusName(scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" width="150">
        <template slot-scope="scope">
          {{ purifyTime(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="updated_at" width="150">
        <template slot-scope="scope">
          {{ purifyTime(scope.row.updated_at) }}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remarks" width="auto"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">转派</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete({ row })">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="g-align-right g-gap-s"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <reservation-edit
      :isEditVisible="isEditDialogVisible"
      :formData="formData"
      :time="time"
      @dialog-change="handleEditDialog"
      @submit="handleSubmit"
    />
  </el-card>
</template>

<script>
import ReservationCreate from './ReservationCreate.vue';
import ReservationEdit from './ReservationEdit.vue';
import { reqGetReservation, reqDelReservation } from '@/api/reservation.js';
import { purifyTime } from '@/utils/Time.js';
export default {
  name: 'Reservation',
  components: {
    ReservationCreate,
    ReservationEdit,
  },
  data() {
    return {
      form: {
        name: '',
      },
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
        size: 50,
      },
      pageSizes: [50],
      tableData: [],
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
        const res = await reqGetReservation(this.pageAndSize);
        this.tableData = res.data.data;
        this.total = res.data.total;
        console.log(res)
      } catch(error) {
        this.isLoading = true;
                console.log(error)


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
    async handleDelete({ row }) {
      console.log(row);
      await reqDelReservation(row.id);
      this.getReservationData();
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
    this.getReservationData();
  },
};
</script>

//
<style lang="scss" scoped>
// .reservation {
//   display: flex;
//   flex-direction: column;

//   .header {
//     display: flex;
//     justify-content: space-between;

//     .inputText {
//       width: 150px;
//     }

//     .but {
//       display: flex;
//       justify-content: flex-end;
//       margin-bottom: 20px;

//       .butColor {
//         background-color: #009688;
//         color: #fff;
//       }
//     }
//   }
//   .pagination {
//     text-align: right;
//   }
// }
//
</style>
