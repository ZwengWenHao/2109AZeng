<template>
  <div class="users">
    <!-- 输入框 -->
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

    <el-button class="but" type="primary" @click="over">主要按钮</el-button>

    <!-- 表格 -->
    <template>
      <el-table :data="tableData" border style="width: 100%" height="485px">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="update(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="caozuo" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="del(scope.row)"
              >删除</el-button
            >
            <el-button type="text" size="small" @click="install(scope.row)">
              设置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 模态框 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="40%">
      <span>
        <!-- 输入框 -->
        <el-form ref="form" :rules="rules" :model="form">
          <el-form-item prop="username">
            <el-input placeholder="账号" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="邮箱" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input placeholder="电话" v-model="form.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改数据模态框 -->
    <el-dialog title="编辑" :visible.sync="dialogVisibles" width="40%">
      <span>
        <!-- 输入框 -->
        <el-form ref="forms" :rules="rules" :model="forms">
          <el-form-item prop="usernames">
            <el-input
              disabled
              placeholder="账号"
              v-model="forms.usernames"
            ></el-input>
          </el-form-item>
          <el-form-item prop="emails">
            <el-input placeholder="邮箱" v-model="forms.emails"></el-input>
          </el-form-item>
          <el-form-item prop="mobiles">
            <el-input placeholder="电话" v-model="forms.mobiles"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibles = false">取 消</el-button>
        <el-button type="primary" @click="updateUser('forms')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击设置 -->
    <!-- dialogVisibleover -->
    <el-dialog title="分配角色" :visible.sync="dialogVisibleover" width="40%">
      <span>
        <!-- 输入框 -->
        <el-form>
          <el-form-item>
            <p>当前用户：{{ name }}</p>
            <p class="all">当前角色：{{ role }}</p>
            分配角色：
            <el-select
              v-model="value"
              @change="changeVal"
              placeholder="请选择活动区域"
            >
              <el-option
                :label="item.roleDesc"
                v-for="(item, index) in options"
                :key="index"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleover = false">取 消</el-button>
        <el-button type="primary" @click="upchange">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页操作 -->
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getUser,
  getUserInfo,
  delInfo,
  updateInfo,
  updateUser,
  updaterole,
  getroles,
} from "../../../utils/http";
export default {
  data() {
    //   邮箱正则
    const emit = (rule, value, callback) => {
      const emailReg =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailReg.test(value)) {
        return callback(new Error("邮箱格式不对"));
      }
    };

    // 电话校验
    const tel = (rule, value, callback) => {
      let telReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (!telReg.test(value)) {
        return callback(new Error("手机号码格式不对"));
      }
    };

    return {
      searchVal: "",
      tableData: [],
      dialogVisible: false,
      dialogVisibles: false,
      dialogVisibleover: false,
      value: "",
      name: "",
      role: "",
      roleName: "",
      // 下拉框数据
      options: [],
      page: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      //   总数据条数
      total: 0,
      myid: "",
      forms: {
        usernames: "",
        emails: "",
        mobiles: "",
      },
      form: {
        username: "",
        email: "",
        password: "",
        mobile: "",
      },

      //   表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: emit, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: tel, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getuser_info();
  },
  methods: {
    // 点击设置
    install(val) {
      this.dialogVisibleover = true;
      this.name = val.username;
      this.role = val.role_name;
      this.myIds = val.id;
      // 角色列表
      getroles().then((res) => {
        console.log(res);
        this.options = res.data;
      });
    },
    changeVal(val) {
      console.log(val);
      this.roleName = val;
    },
    // 点击设置确定
    upchange() {
      this.dialogVisibleover = false;

      let obj = {
        id: this.myIds,
        rid: this.roleName,
      };
      updaterole(obj).then((res) => {
        this.getuser_info();
      });
    },
    // 封装数据请求
    getuser_info() {
      getUser(this.page).then((res) => {
        this.tableData = res.data.users;
        this.total = res.data.total;
      });
    },
    // 当前页数
    handleCurrentChange(val) {
      this.page.pagenum = val;
      this.getuser_info();
    },
    // 显示条数
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.getuser_info();
    },
    // 点击显示模态框
    over() {
      this.dialogVisible = true;
    },
    // 点击确定提交数据
    addUser(formName) {
      this.dialogVisible = false;

      getUserInfo(this.form).then((res) => {
        console.log(res);
        this.getuser_info();
        this.form = {};
      });
    },
    // 点击删除
    del(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delInfo(val.id).then((res) => {
            this.$message({
              message: "删除成功",
              type: "warning",
            });
            this.getuser_info();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击搜索
    search() {
      this.getuser_info();
    },
    out() {
      if (this.page.query == "") {
        this.getuser_info();
      }
    },
    // 修改开关状态
    update(val) {
      //   console.log(val);
      updateInfo({ type: val.mg_state, uid: val.id }).then((res) => {
        this.$message({
          message: "恭喜你，状态修改成功",
          type: "success",
        });
      });
    },
    // 点击编辑
    handleClick(val) {
      this.dialogVisibles = true;
      console.log(val);
      this.myid = val.id;
      this.forms.usernames = val.username;
      this.forms.emails = val.email;
      this.forms.mobiles = val.mobile;
    },
    // 点击修改数据
    updateUser() {
      this.dialogVisibles = false;
      updateUser({
        id: this.myid,
        username: this.forms.usernames,
        email: this.forms.emails,
        mobile: this.forms.mobiles,
      }).then((res) => {
        console.log(res);
        // this.$message({
        //   message: "恭喜你，数据成功",
        //   type: "success",
        // });
        this.getuser_info();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.aa {
  margin: 20px 0;
}
.users {
  background: white;
  padding: 15px;
  border-radius: 8px;
  .input-with-select {
    width: 400px;
  }
  .el-table {
    margin-top: 15px;
  }
  .but {
    margin-left: 20px;
  }
  .footer {
    margin-top: 15px;
  }
}
</style>
