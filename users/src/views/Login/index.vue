<template>
  <div class="home">
    <div class="box">
      <h2>
        <el-avatar
          :size="60"
          src="https://img0.baidu.com/it/u=1694074520,2517635995&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1658768400&t=3bf1d829d0130ed46d60271629bf2e5e"
        ></el-avatar>
      </h2>
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
              type="password"
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
            // 当登录状态为200时
            if (res.meta.status == 200) {
              // 登录成功提示
              this.$message({
                message: "恭喜你，登录成功",
                type: "success",
              });
              // 存储token
              localStorage.setItem("token", res.data.token);
              // 跳转页面
              this.$router.push({ path: "/home" });
            } else {
              this.$message({
                showClose: true,
                message: "账号密码错误",
                type: "error",
              });
            }
          });
        } else {
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
    box-shadow: 0 0 3px;
    h2 {
      margin-top: 20px;
      margin-bottom: 5px;
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
        margin-top: 15px;
      }
    }
  }
}
</style>
