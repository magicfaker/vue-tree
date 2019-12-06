<template>
  <div class="container">
    <h1 class="head">博洋服饰组织架构</h1>
    <el-button type="primary" @click="down()" class="download">下载excel</el-button>
    <div class="col-md-10 col-md-offset-1">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <form class="form-horizontal row">
            <div class="col-md-4">
              <!-- <el-input v-model="inputvalue" size="small" class="search" placeholder="请输入内容"></el-input>
              <el-button type="small" @click="search(inputvalue)">搜索</el-button>-->
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
          @on-expand="onExpand"
          @on-node-click="onNodeClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // 导入我们的api接口

export default {
  name: "HelloWorld",
  data() {
    return {
      data: {},
      horizontal: false,
      collapsable: true,
      expandAll: false,
      inputvalue: ""
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    search(val) {
      console.log(this.data.deptName);
      if (val == this.data.deptName) {
        alert(1);
      }
    },
    //拉取初始结构树数据
    getListData() {
      var that = this;
      axios
        .get("http://20.28.10.111:8883/organizational/orgDept/getDeptData")
        .then(res => {
          that.data = res.data.data;
          console.log(that.data);
        });
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
/deep/ .org-tree-node-label .org-tree-node-label-inner {
  background: #a7b6d7;
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
</style>
