<template>
  <div class="GoodsList">
    <div class="goodsList_text">
      <el-input
        placeholder="请输入内容"
        v-model="inpval"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button class="add" type="primary">添加商品</el-button>
      <el-table :data="tableData" border style="width: 100%" height="550px">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getGoods } from "@/utils/http";
export default {
  data() {
    return {
      // 输入框数据
      inpval: "",
      tableData: [],
      page: {
        pagenum: 1,
        pagesize: 10,
      },
    };
  },
  created() {
    getGoods(this.page).then((res) => {
      console.log(res);
      this.tableData = res.data.goods;
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.GoodsList {
  padding: 10px;
  background: white;
  border-radius: 8px;
  .goodsList_text {
    .add {
      margin-left: 15px;
    }
    .input-with-select {
      width: 350px;
      margin-bottom: 10px;
    }
  }
}
</style>
