<template>
  <div class="reservation">
    <div class="reservation-but">
      <el-button size="mini" type="primary" @click="handleCreate">创建订单</el-button>
      <handle-create-and-edit
        :isVisible="dialogFormVisible"
        @dialog_visible="gitVisible"
      />
    </div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="姓名" prop="name" width="150px">
      </el-table-column>
      <el-table-column label="手机号" prop="phone_code" width="150px">
      </el-table-column>
      <el-table-column label="name" prop="name" width="150px">
      </el-table-column>
      <el-table-column label="name" prop="name" width="150px">
      </el-table-column>
      <el-table-column label="备注" prop="remark" width="auto">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
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
  </div>
</template>

<script>
import handleCreateAndEdit from "./HandleCreateAndEdit.vue";
export default {
  name: "Reservation",
  components: {
    handleCreateAndEdit,
  },
  data() {
    return {
      dialogFormVisible: false,
      tableData: [
        {
          name: "张闯",
          phone_code: "15142257040",
          remark: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "赵越",
          phone_code: "15142257040",
          remark: "上海市普陀区金沙江路 1517 弄",
        },
        {
          name: "丁艳秋",
          phone_code: "15142257040",
          remark: "上海市普陀区金沙江路 1519 弄",
        },
        {
          name: "丁海超",
          phone_code: "15142257040",
          remark: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",
    };
  },
  methods: {
    gitVisible(newVal) {
      this.dialogFormVisible = newVal;
      console.log(newVal)
    },
    handleCreate() {
      this.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style lang="scss" scoped>
.reservation {
  display: flex;
  flex-direction: column;

  &-but {
    display: flex;
    justify-content: end;
    margin-bottom: 20px;
  }
}
</style>
