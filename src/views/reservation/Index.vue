<template>
  <div class="reservation">
    <div class="reservation-but">
      <el-button class="butColor" size="mini" @click="handleCreate"
        >创建订单</el-button
      >
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
      <el-table-column label="手机号" prop="phoneCode" width="150px">
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
          phoneCode: "15142257040",
          remark: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "赵越",
          phoneCode: "15142257040",
          remark: "上海市普陀区金沙江路 1517 弄",
        },
        {
          name: "丁艳秋",
          phoneCode: "15142257040",
          remark: "上海市普陀区金沙江路 1519 弄",
        },
        {
          name: "丁海超",
          phoneCode: "15142257040",
          remark: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",
    };
  },
  methods: {
    gitVisible(newVal) {
      this.dialogFormVisible = newVal;
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
    justify-content: flex-end;
    margin-bottom: 20px;

    .butColor {
      background-color: #009688;
      color: #fff;
    }
  }
}
</style>
