<template>
  <div>
    <h1 class="head">excel表格</h1>
    <div v-for="item in tableData" :key="item">
      <p class="ext">{{item}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      tableData: ""
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
        .get("http://20.28.10.111:8883/organizational/orgDept/getExcelData")
        .then(res => {
          that.tableData = res.data.data;
        });
    }
  },
   filters: {
    suss(val) {
      if(val == "宁波博洋服"){
        return 11
      }
    }
  }
}
</script>

<style scoped>
.ext {
  border-bottom: 1px solid #dfdfdf;
  text-align: left;
}
.head {
  text-align: left;
  font-size: 30px;
  box-shadow: 0px 11px 10px #eee;
  padding: 0 0 15px 20px;
}
</style>
