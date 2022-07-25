<template>
  <div class="params">
    <div class="params_const">
      <!-- 头部文案 -->
      <el-alert
        title="警告提示的文案"
        type="warning"
        effect="dark"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 选择器 -->
      <div class="block">
        <span class="demonstration">请选择商品分类: </span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="info"
          @change="handleChange"
        ></el-cascader>
      </div>
      <!-- tab切换 -->
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="tabCheck(activeName)"
      >
        <el-tab-pane label="动态参数" name="only">
          <el-button
            class="primary"
            type="primary"
            :disabled="flg"
            @click="addParameter"
            >添加参数</el-button
          >
          <el-table :data="tableData_a" style="width: 100%" height="360px">
            <el-table-column type="expand"> </el-table-column>
            <el-table-column label="商品 ID" prop="attr_id"> </el-table-column>
            <el-table-column label="商品名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="描述" prop="desc"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="many">
          <el-button class="primary" type="primary" :disabled="flg"
            >添加参数</el-button
          >
          <el-table :data="tableData_b" style="width: 100%">
            <el-table-column type="expand"> </el-table-column>
            <el-table-column label="商品 ID" prop="attr_id"> </el-table-column>
            <el-table-column label="商品名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="描述" prop="desc"> </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 表格 -->
    </div>
  </div>
</template>

<script>
import { getcategories, getCategories } from "@/utils/http";
export default {
  data() {
    return {
      options: [],
      value: "",
      activeName: "only",
      info: { expandTrigger: "hover", value: "cat_id", label: "cat_name" },
      // 表格数据
      tableData_a: [],
      tableData_b: [],
      attrid: 0,
      attr: {
        attr_sel: this.activeName,
      },
      flg: true,
    };
  },
  created() {
    // 联级选择器数据
    getcategories().then((res) => {
      this.options = res.data;
    });
  },
  methods: {
    // 封装参数数据
    rederdata() {
      let obj = {
        sel: this.activeName,
      };
      // 参数请求接口
      getCategories(this.attrid, obj).then((res) => {
        if (this.activeName == "only") {
          this.tableData_a = res.data;
        } else if (this.activeName == "many") {
          this.tableData_b = res.data;
        }
      });
    },
    // 选择器
    handleChange(val) {
      this.attrid = val[2];
      this.rederdata();
      // 当选择器选着参数时 才可以添加
      if (val != "") {
        this.flg = false;
      }
    },
    // 切换tab数据
    tabCheck(val) {
      this.activeName = val;
    },
    // 点击添加参数
    addParameter(){
      
    }
  },
};
</script>

<style lang="scss" scoped>
.primary {
  margin: 10px 0;
}
.params {
  padding: 10px;
  background: white;
  border-radius: 8px;
  .params_const {
    .block {
      margin: 10px 0;
    }
  }
  .el-table {
    margin: 15px;
  }
}
</style>
