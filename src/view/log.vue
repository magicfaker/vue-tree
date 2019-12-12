<template>
  <div>
    <div class="head">
      <h1>日志记录</h1>
      <el-button type="primary" @click="back()" class="Journal">返回</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 98%;margin:1%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="appType" label="操作" width="80"></el-table-column>
      <el-table-column prop="proposerCompany" label="操作部门" width="80"></el-table-column>
      <el-table-column prop="appTitle" label="操作内容" width="200"></el-table-column>
      <el-table-column prop="appDetail" label="详情"></el-table-column>
      <el-table-column prop="updTime" label="添加日期" sortable width="160"></el-table-column>
      <el-table-column prop="appProposerName" label="申请人" width="100"></el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100"
        :filters="[{ text: '成功', value: '成功' }, { text: '失败', value: '失败' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type === '成功' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getLogoData();
  },
  methods: {
    //拉取日志数据
    getLogoData() {
      var that = this;
      axios
        .get("http://115.238.142.66:8882/organizational/orgDept/getApproveList")
        .then(res => {
          that.tableData = res.data.data;
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.type == "失败") {
        return "warning-row";
      } else if (row.type == "成功") {
        return "success-row";
      }
      return "";
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.type === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
     back() {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped lang="less">
.head {
  text-align: left;
  box-shadow: 0px 5px 5px #eee;
  padding: 0 20px;
  margin-bottom: 15px;
  padding: 5px 10px 10px;
  h1{
    display: inline-block;
    margin: 0
  }
  .Journal {
    float: right;
  }
}
 /deep/ .el-table .warning-row {
    background: oldlace;
  }

  /deep/ .el-table .success-row {
    background: #ecf5ff;
  }
</style>
