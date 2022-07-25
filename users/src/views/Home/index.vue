<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <span class="el-icon-office-building"></span>
        <span>后台管理</span>
        <el-button class="out" type="info" @click="out">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏部分 -->
        <el-aside :width="flgs == true ? '65px' : '200px'">
          <span class="el-icon-s-operation" @click="over"></span>
          <el-menu
            :default-active="$route.path"
            open="110"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :unique-opened="true"
            :collapse="flgs"
          >
            <el-submenu
              :index="item.id + ''"
              v-for="(item, index) in asideInfo"
              :key="index"
            >
              <template slot="title">
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group v-for="(ele, i) in item.children" :key="i">
                <el-menu-item :index="'/' + ele.path">{{
                  ele.authName
                }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主要内容 -->
        <el-main>
          <!-- 占位标识符 -->
          <div class="userList">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
              >
              <el-breadcrumb-item
                v-for="(item, index) in $route.meta.list"
                :key="index"
                >{{ item.name }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { asideInfo } from "../../utils/http";
export default {
  data() {
    return {
      asideInfo: [],
      flgs: false,
    };
  },
  created() {
    asideInfo().then((res) => {
      // console.log(res);
      this.asideInfo = res.data;
    });
  },
  methods: {
    // 点击退出home页面
    out() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    over() {
      this.flgs = !this.flgs;
    },
  },
};
</script>

<style lang="scss" scoped>
.userList {
  margin-bottom: 15px;
}
.el-icon-s-operation {
  cursor: pointer;
}
.home {
  width: 99%;
  margin: auto;
  .el-header {
    background-color: #373d41;
    color: white;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .out {
      float: right;
    }
    span {
      font-weight: 700;
    }
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    height: 680px;
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    height: 690px;
  }
  .el-menu {
    height: 650px;
  }
}
</style>
