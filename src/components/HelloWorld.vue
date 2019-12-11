<template>
  <div class="container">
    <h1 class="head">博洋服饰组织架构</h1>
    <el-button type="primary" @click="down()" class="download">下载excel</el-button>
    <el-button type="primary" @click="log"  class="Journal">查看日志</el-button>
    <el-button type="primary" @click="extable"  class="extable">excel表格</el-button>
    <!-- <el-table
      :data="listLog"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="appType"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="appDetail"
        label="地址">
      </el-table-column>
    </el-table>-->
    <div class="col-md-10 col-md-offset-1">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <form class="form-horizontal row">
            <div class="col-md-4">
              <el-input v-model="inputvalue" size="small" class="search" placeholder="请输入内容"></el-input>
              <el-button type="small" @click="search(inputvalue)">搜索</el-button>
              <div class="checkbox">
                <label>
                  <el-switch v-model="horizontal" active-text="水平" inactive-text="垂直"></el-switch>
                </label>
              </div>
            </div>
            <!-- <div class="col-md-4">
              <div class="checkbox">
                <label>
                  <el-switch v-model="collapsable" active-text="预览" inactive-text="操作"></el-switch>
                </label>
              </div>
            </div>-->
            <div class="col-md-4">
              <div class="checkbox">
                <label>
                  <el-switch
                    v-model="expandAll"
                    active-text="展开"
                    @change="expandChange"
                    inactive-text="合并"
                  ></el-switch>
                </label>
              </div>
            </div>
            <!-- 主题 -->
            <!-- <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label col-md-5">labelClassName:</label>
                  <div class="col-md-7">
                    <select class="form-control" v-model="labelClassName">
                      <option value="bg-white">bg-white</option>
                      <option value="bg-orange">bg-orange</option>
                      <option value="bg-gold">bg-gold</option>
                      <option value="bg-gray">bg-gray</option>
                      <option value="bg-lightpink">bg-lightpink</option>
                      <option value="bg-chocolate">bg-chocolate</option>
                      <option value="bg-tomato">bg-tomato</option>
                    </select>
                  </div>
                </div>
            </div>-->
          </form>
        </div>
      </div>
      <p>
        <br />
      </p>
      <div class="text-center">
        <vue2-org-tree
          :data="data"
          :horizontal="horizontal"
          :collapsable="collapsable"
          :render-content="renderContent"
          :label-class-name="labelClass"
          :selectedKey="selectedKey"
          :selected-class-name="selectedClassName"
          @on-expand="onExpand"
          @on-node-click="onNodeClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      data: {},
      horizontal: false,
      collapsable: true,
      expandAll: false,
      inputvalue: "",
      selectedKey: "",
      selectedClassName: "red",
      listLog: ""
    };
  },
  created() {
    this.getListData();
   
  },
  methods: {
    search(value) {
      let pathList = treeFindPath(this.data.children, data =>
        data.deptName.includes(value)
      );
      pathList.forEach(list => {
        list.forEach(node => this.$set(node, "expand", true));
      });
      function treeFindPath(tree, func, path = [], result = []) {
        for (const data of tree) {
          path.push(data);
          func(data) && result.push([...path]);
          data.children && treeFindPath(data.children, func, path, result);
          path.pop();
        }
        return result;
      }
    },
    labelClass(data) {
      if (this.inputvalue == "") {
        return "";
      }
      return data.deptName.includes(this.inputvalue) ? "highlight" : "";
    },

    //拉取初始结构树数据
    getListData() {
      var that = this;
      axios.get("http://20.28.10.111:8883/organizational/orgDept/getDeptData").then(res => {
        that.data = res.data.data;
        console.log(that.data, 1);
      });
    },
   
    // 查看日志弹窗
    log() {
      this.$router.push("log");
    },
    extable() {
      this.$router.push("table");
    },
    //excel下载接口调用
    down() {
      axios
        .get("http://20.28.10.111:8883/organizational/orgDept/downloadExcel", {
          responseType: "blob"
        })
        .then(res => {
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          let objectUrl = URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = objectUrl;
          a.download = "客户.xlsx";
          //a.click();
          //下面这个写法兼容火狐
          a.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window
            })
          );
          window.URL.revokeObjectURL(blob);
        });

      // 上面的请求也可以这样做
    },

    renderContent(h, data) {
      return data.deptName;
    },
    onNodeClick(e, data) {
      // console.log(data.deptName);
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },

    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.org-tree-node-label {
  white-space: nowrap;
}
/deep/ .bg-white {
  background-color: #a7b6d7;
}
/deep/ .bg-orange {
  background-color: orange;
}
/deep/ .bg-gold {
  background-color: gold;
}
/deep/ .bg-gray {
  background-color: gray;
}
/deep/ .bg-lightpink {
  background-color: lightpink;
}
/deep/ .bg-chocolate {
  background-color: chocolate;
}
/deep/ .bg-tomato {
  background-color: tomato;
}

/deep/ .highlight {
  color: #fff;
  background: orange !important;
}
.container {
  .head {
    text-align: left;
    font-size: 30px;
    box-shadow: 0px 11px 10px #eee;
    padding: 0 0 15px 20px;
  }
  .download {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .Journal {
    position: absolute;
    top: 20px;
    right: 150px;
  }
   .extable {
    position: absolute;
    top: 20px;
    right: 280px;
  }
  /deep/ .org-tree-node-label .org-tree-node-label-inner {
    background: #a7b6d7;
    span {
      display: inline-block;
      color: red;
    }
  }
  /deep/ .form-horizontal {
    text-align: left;
    margin: 20px 0 0 20px;
    .search {
      width: 200px;
      margin-right: 10px;
    }
    .el-switch {
      margin-top: 10px;
    }
  }
}
</style>
