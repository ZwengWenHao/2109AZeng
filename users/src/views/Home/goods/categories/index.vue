<template>
  <div class="categories">
    <div class="categories_const">
      <el-button type="primary">添加商品</el-button>
      <zk-table
        show-index
        index-text="#"
        :data="tabledata"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        border
        max-height="500px"
      >
        <template slot="status" scope="scope">
          <span
            :class="
              scope.row.cat_deleted == false
                ? 'el-icon-success'
                : 'el-icon-error'
            "
          ></span>
        </template>
        <template slot="sort" scope="scope">
          <el-tag
            :type="
              scope.row.cat_level == 0
                ? ''
                : scope.row.cat_level == 1
                ? 'success'
                : 'danger'
            "
          >
            {{
              scope.row.cat_level == 0
                ? "一级"
                : scope.row.cat_level == 1
                ? "二级"
                : "三级"
            }}
          </el-tag>
        </template>
        <template slot="caot" scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </zk-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tabledata.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getcategories } from "@/utils/http";
export default {
  data() {
    return {
      tabledata: [],
      info: {
        pagenum: 1,
        pagesize: 10,
      },
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "status",
        },
        {
          label: "排序",
          type: "template",
          template: "sort",
        },
        {
          label: "操作",
          type: "template",
          template: "caot",
        },
      ],
    };
  },
  created() {
    getcategories().then((res) => {
      console.log(res);
      this.tabledata = res.data;
    });
  },
  methods: {
    // 当前页码
    handleCurrentChange(val) {
      this.page.pagenum = val;
    },
    // 当前每页数量
    handleSizeChange(val) {
      this.page.pagesize = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.zk-table {
  height: 509px;
  margin-top: 10px;
  max-height: 540px;
}
.categories_const {
  padding: 15px;
  background: white;
  border-radius: 8px;
}
.el-icon-success {
  color: #90ee90;
}
.el-icon-error {
  color: red;
}
</style>
