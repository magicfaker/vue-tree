<template>
  <div>
    <div class="head">
      <h1>表格</h1>
      <el-button type="primary" @click="back()" class="Journal">返回</el-button>
    </div>
    <el-input
      v-model="search"
      style="display: inline-block;margin-bottom:10px"
      placeholder="请输入搜索内容"
    ></el-input>
    <el-table :data="tables" border>
      <el-table-column prop="0" label="一级部门" width="200"></el-table-column>
      <el-table-column prop="1" label="二级部门" width="200"></el-table-column>
      <el-table-column prop="2" label="三级部门" width="300"></el-table-column>
      <el-table-column prop="3" label="四级部门"></el-table-column>
      <el-table-column prop="4" label="五级部门"></el-table-column>
      <el-table-column prop="5" label="六级部门"></el-table-column>
      <el-table-column prop="6" label="七级部门"></el-table-column>
      <el-table-column prop="7" label="八级部门"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  created() {
    this.getTableoData();
  },
  methods: {
    //拉取日志数据
    getTableoData() {
      var that = this;
      axios
        .get("http://115.238.142.66:8882/organizational/orgDept/getExcelData")
        .then(res => {
          that.tableData = res.data.data;
        });
    },
    back() {
      this.$router.push("/");
    }
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.search;
      if (search) {
        return this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              // String(data[key]).toLowerCase().indexOf(search) > -1
              String(data[key]).toLowerCase().includes(search)
            );
          });
        });
      }
      return this.tableData;
    }
  }
};
</script>

<style scoped lang="less">
.ext {
  border-bottom: 1px solid #dfdfdf;
  text-align: left;
}
.head {
  text-align: left;
  box-shadow: 0px 5px 5px #eee;
  padding: 0 20px;
  margin-bottom: 15px;
  padding: 5px 10px 10px;
  h1 {
    display: inline-block;
    margin: 0;
  }
  .Journal {
    float: right;
  }
}
</style>
