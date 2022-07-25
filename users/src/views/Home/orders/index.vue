<template>
  <div class="orders">
    <div class="orders_const">
      <!-- 搜索 -->
      <el-input
        placeholder="请输入内容"
        v-model="page.query"
        class="input-with-select"
        @input="out"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" height="540px">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="scope">
            <el-tag effect="dark"
              >{{ scope.row.pay_status == "0" ? "未付款" : "已付款" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | newtime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOrders } from "@/utils/http";
export default {
  data() {
    return {
      page: {
        pagenum: 1,
        pagesize: 10,
        query: "",
      },
      tableData: [],
    };
  },
  created() {
    this.Orders();
  },
  methods: {
    // 封装列表请求数据
    Orders() {
      getOrders(this.page).then((res) => {
        this.tableData = res.data.goods;
      });
    },
    // 点击搜索
    search() {
      this.tableData = this.tableData.filter((ele) => {
        return ele.order_number.includes(this.page.query);
      });
    },
    out() {
      if (this.page.query == "") {
        this.Orders();
      }
    },
  },
  // 时间过滤
  filters: {
    newtime(time) {
      return new Date(time * 1000).toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped>
.orders {
  background: white;
  border-radius: 8px;
  .orders_const {
    padding: 15px;
  }
  .input-with-select {
    width: 400px;
    margin-bottom: 10px;
  }
}
</style>
