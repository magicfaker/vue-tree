<template>
  <div>
    <h1 class="head">日志记录</h1>
    <el-table :data="tableData" border style="width: 98%;margin:1%">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="appType" label="操作" width="100"></el-table-column>
      <el-table-column prop="appTitle" label="标题"></el-table-column>
      <el-table-column prop="appDetail" label="详情" width="1000"></el-table-column>
      <el-table-column prop="updTime" label="添加日期" sortable></el-table-column>
      <el-table-column prop="appProposerName" label="申请人"></el-table-column>
      <!-- <el-table-column prop="type"  label="类型"></el-table-column> -->
      <el-table-column label="类型" width="180">
        //这里就不用prop了
        <template slot-scope="scope">{{scope.row.type | sus}}</template>
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
        .get("http://20.28.10.111:8883/organizational/orgDept/getApproveList")
        .then(res => {
          that.tableData = res.data.data;
        });
    }
  },
  filters: {
    sus(val) {
      if(val == 1){
        return "失败"
      }else{
        return "成功"
      }
    }
  }
};
</script>

<style scoped>
.head {
  text-align: left;
  font-size: 30px;
  box-shadow: 0px 11px 10px #eee;
  padding: 0 0 15px 20px;
}
</style>
