<template>
  <el-card shadow="hover">
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
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="onTransfer(scope.row)" s size="mini" icon="el-icon-paperclip"
            >转派</el-button
          >
          <el-button @click="onEdit(scope.row)" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-popconfirm title="您确定删除吗？" @confirm="onDelete(scope.row)">
            <el-button
              style="margin-left: 8px"
              slot="reference"
              plain
              size="mini"
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
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <order-creator-and-editor ref="orderCreatorAndEditor" @submit="handleCreatedOrEdited" />
    <drawer-list ref="DrawerList" />
  </el-card>
</template>

<script>
import { columns as orderTableColumns } from '@/components/config/TableColumns.js';
import { reqFetchOrders, reqDestroyOrder } from '@/api/order.js';
import OrderCreatorAndEditor from './OrderCreatorAndEditor.vue';
import DrawerList from './dialog/DrawerList.vue';

export default {
  components: {
    OrderCreatorAndEditor,
    DrawerList,
  },
  data() {
    return {
      orderTableColumns,
      pageSizes: [50, 100],
      form: {
        name: '',
      },
      tableData: [],
      page: 1,
      size: 50,
      total: 0,
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    onShow() {
      this.tableData = this.tableData.filter(
        (data) => !this.form.name || data.name.toLowerCase().includes(this.form.name.toLowerCase())
      );
      this.total = this.tableData.length;
    },
    onClear() {
      (this.form.name = ''), this.getOrders();
    },
    async getOrders() {
      const params = { page: this.page, size: this.size };
      const res = await reqFetchOrders(params);
      this.total = res.data.total;
      this.tableData = res.data.date;
    },
    onTransfer(row) {
      this.$refs.DrawerList.open(row);
    },
    onEdit(row) {
      this.$refs.orderCreatorAndEditor.open('编辑', row.id);

      // this.currentTabComponent = 'DialogEdit';
      // this.isVisible = true;
    },
    async onDelete(row) {
      await reqDestroyOrder(row.id);
      this.$message.success('删除成功');
      this.getOrders();
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
