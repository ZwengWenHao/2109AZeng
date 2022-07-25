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
        <el-tab-pane label="动态参数" name="only">动态参数</el-tab-pane>
        <el-tab-pane label="静态属性" name="many">静态属性</el-tab-pane>
      </el-tabs>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand"> </el-table-column>
        <el-table-column label="商品 ID" prop="id"> </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="描述" prop="desc"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getcategories } from "@/utils/http";
export default {
  data() {
    return {
      options: [],
      value: "",
      activeName: "only",
      info: { expandTrigger: "hover", value: "cat_name", label: "cat_name" },
      // 表格数据
      tableData: [],
      attr: {
        attr_sel: this.activeName,
      },
    };
  },
  created() {
    getcategories().then((res) => {
      console.log(res);
      this.options = res.data;
    });
  },
  methods: {
    handleChange() {},
    tabCheck(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.params {
  padding: 10px;
  background: white;
  border-radius: 8px;
  .params_const {
    .block {
      margin-top: 10px;
    }
  }
}
</style>
