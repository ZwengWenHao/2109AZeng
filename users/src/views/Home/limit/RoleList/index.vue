<template>
  <div class="rolelist">
    <!-- 表格数据 -->
    <div class="tab">
      <el-table :data="rolelist" border height="590px" style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.level == 0
                  ? ''
                  : scope.row.level == 1
                  ? 'success'
                  : 'warning'
              "
              >{{
                scope.row.level == 0
                  ? "一级"
                  : scope.row.level == 1
                  ? "二级"
                  : "三级"
              }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRolelist } from "@/utils/http";
export default {
  data() {
    return {
      rolelist: [],
    };
  },
  created() {
    getRolelist().then((res) => {
      console.log(res);
      this.rolelist = res.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.rolelist {
  .tab {
    padding: 10px;
    background: white;
    border-radius: 8px;
  }
}
</style>
