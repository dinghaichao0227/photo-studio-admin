<template>
  <el-card shadow="hover">
    <el-form inline size="mini" class="g-gap">
      <el-form-item>
        <el-input placeholder="请输入客户姓名" v-model="form.name" clearable> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain icon="el-icon-search" type="primary">Search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-refresh-left">Reset</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column
        v-for="item in orderTableColumns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      />
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" type="text" size="small" icon="el-icon-edit"
            >转派</el-button
          >
          <el-button @click="onEdit(scope.row)" type="text" size="small" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button @click="onDelete(scope.row)" type="text" size="small" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="g-gap-s g-align-right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <order-creator-and-editor ref="orderCreatorAndEditor" @submit="handleCreatedOrEdited" />
  </el-card>
</template>

<script>
import { columns as orderTableColumns } from '@/components/config/TableColumns.js';
import { reqFetchOrders, reqDestroyOrder } from '@/api/order.js';
import OrderCreatorAndEditor from './OrderCreatorAndEditor.vue';

export default {
  components: {
    OrderCreatorAndEditor,
  },
  data() {
    return {
      orderTableColumns,
      form: {
        name: '',
      },
      tableData: [],
      page: 1,
      size: 50,
      total: 0,
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      const params = { page: this.page, size: this.size };
      const res = await reqFetchOrders(params);
      this.total = res.data.total;
      this.tableData = res.data.data;
    },
    onEdit(row) {
      this.$refs.orderCreatorAndEditor.open('编辑', row.id);

      // this.currentTabComponent = 'DialogEdit';
      // this.isVisible = true;
    },
    async onDelete(row) {
      await reqDestroyOrder(row.id);
      this.$message.success('删除成功');
    },
    handleClose(opt) {
      this.currentTabComponent = '';
      this.isVisible = opt;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCreatedOrEdited() {
      this.getOrders();
      // result &&this.getOrders();
      // if (result) this.getOrders();
    },
  },
};
</script>
