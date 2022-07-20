<template>
  <div class="home">
    <div class="box">
      <h2>电商后台管理</h2>
      <div class="userinfo">
        <el-form ref="LoginRuleForm" :rules="rules" :model="LoginRuleForm">
          <el-form-item prop="username">
            <el-input
              placeholder="账号"
              prefix-icon="el-icon-s-custom"
              v-model="LoginRuleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-unlock"
              placeholder="密码"
              v-model="LoginRuleForm.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login('LoginRuleForm')"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { logininfo } from "../../utils/http";
export default {
  data() {
    return {
      LoginRuleForm: {
        username: "",
        password: "",
      },

      //   登录页面验证
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
      },
    };
  },
  methods: {
    // 点击登录页面
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          logininfo(this.LoginRuleForm).then((res) => {
            if (res.data.meta.status == 200) {
              this.$router.push("/home");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-form-item__error {
  left: 22px;
}
.home {
  width: 100%;
  height: 100vh;
  background: #2d4c6a;
  .box {
    width: 450px;
    height: 350px;
    background: white;
    min-width: 350px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    text-align: center;
    padding: 0 30px;
    box-sizing: border-box;
    h2 {
      margin: 30px 0;
    }
    .userinfo {
      height: 100%;
      margin: auto;

      .el-input {
        width: 90%;
        margin-top: 15px;
      }
      .el-button {
        width: 90%;
      }
    }
  }
}
</style>
