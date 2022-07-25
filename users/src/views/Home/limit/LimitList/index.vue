<template>
  <div class="limitlist">
    <div class="limitlist_const">
      <el-button type="primary" @click="addrole">添加角色</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" height="540px">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item, index) in scope.row.children" :key="index">
              <el-col :span="4">
                <el-tag close @close="del(scope.row, item)" closable>{{
                  item.authName
                }}</el-tag>
              </el-col>

              <el-col :span="18">
                <el-row v-for="(ele, index) in item.children" :key="index">
                  <el-col :span="6">
                    <el-tag
                      close
                      @close="del(scope.row, ele)"
                      type="success"
                      closable
                    >
                      {{ ele.authName }}
                    </el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      closable
                      @close="del(scope.row, e)"
                      v-for="(e, i) in ele.children"
                      :key="i"
                      >{{ e.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="handleDel(scope.row)"
              >删除</el-button
            >
            <el-button type="text" size="small" @click="updateRights(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加弹窗 -->
      <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
        <span>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名字">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="form.roleDesc"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="upout">取 消</el-button>
          <el-button type="primary" @click="addsure">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限弹窗 -->
      <el-dialog title="分配权限" :visible.sync="dialogVisible_a" width="30%">
        <span>
          <!-- 树枝分布图 -->
          <el-tree
            :default-expand-all="true"
            :data="RightsList"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-checked-keys="keys"
            :props="defaultProps"
            @check="overs"
          >
          </el-tree>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_a = false">取 消</el-button>
          <el-button type="primary" @click="addRights">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getRoles,
  delRoles,
  RolesDel,
  addRoles,
  updateRoles,
  getRights,
  rolesRights,
} from "@/utils/http";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogVisible_a: false,
      title: "添加角色",
      keys: [],
      myroleid: "",
      // 分配权限角色id
      roleId: "",
      // 树状图数据
      rids: "",
      // 数组转成字符串
      arrys: [],
      RightsList: [],
      defaultProps: {
        children: "children",
        label: "authName",
      },
      form: {
        roleName: "",
        roleDesc: "",
      },
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      getRoles().then((res) => {
        this.tableData = res.data;
      });
    },
    // 删除角色
    handleDel(item) {
      // 删除角色弹窗
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除角色接口
          delRoles(item.id).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getdata();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 取消权限
    del(item, ele) {
      RolesDel({ roleId: item.id, rightId: ele.id }).then((res) => {
        this.$message({
          message: "取消权限成功",
          type: "success",
        });
        this.getdata();
      });
    },
    // 添加角色
    addrole() {
      this.dialogVisible = true;
      this.title = "添加角色";
    },
    // 点击确定添加角色
    addsure() {
      this.dialogVisible = false;
      if (this.form.roleName == "") {
        this.$message({
          message: "角色名称不能为空",
          type: "warning",
        });
      }
      // 添加角色
      if (this.title == "添加角色") {
        addRoles(this.form).then((res) => {
          this.$message({
            type: "success",
            message: "添加角色成功!",
          });
          this.getdata();
          // 清空输入框
          this.form = {};
        });
      } else if (this.title == "修改角色") {
        // 修改
        let obj = {
          id: this.myroleid,
          roleName: this.form.roleName,
          roleDesc: this.form.roleDesc,
        };
        // 修改角色数据
        updateRoles(obj).then((res) => {
          this.$message({
            type: "success",
            message: "修改角色成功!",
          });
        });
        this.form = {};
      }
    },
    // 点击编辑
    handleClick(val) {
      this.myroleid = val.id;
      this.title = "修改角色";
      this.dialogVisible = true;
      this.form = val;
    },
    // 点击取消按钮
    upout() {
      this.dialogVisible = false;
      this.form = {};
    },
    // 分配权限
    updateRights(val) {
      this.roleId = val.id;
      this.dialogVisible_a = true;
      getRights().then((res) => {
        console.log(res);
        this.RightsList = res.data;
      });
      this.recursion(val, this.keys);
    },

    // 递归方法
    recursion(row, keys) {
      if (!row.children) {
        return keys.push(row.id);
      }
      row.children.forEach((ele) => {
        this.recursion(ele, keys);
      });
    },

    // 点击事件树枝分配
    overs() {
      // console.log(this.$refs.tree.getCheckedKeys());
      // console.log(this.$refs.tree.getHalfCheckedKeys());
      // 选中的权限 都展开在同一个数组中
      this.arrys = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys(),
      ].join(",");
      console.log(this.arrys);
    },
    // 点击确定分配权限
    addRights() {
      this.dialogVisible_a = false;
      // 参数id
      let obj = {
        roleId: this.roleId,
        rids: this.arrys,
      };
      // 分配权限接口
      rolesRights(obj).then((res) => {
        console.log(res);
        this.$message({
          message: "分配权限成功",
          type: "success",
        });
        // 从新渲染页面
        this.getdata();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 15px;
  margin-left: 25px;
}
.limitlist {
  .limitlist_const {
    padding: 10px;
    background: white;
    border-radius: 8px;
    .el-table {
      margin-top: 15px;
    }
  }
}
</style>
