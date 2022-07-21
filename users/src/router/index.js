import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: "/",
  //   redirect: '/login',  // 重定向:重新指向其它path,会改变网址
  // },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home/index.vue'),
    children: [
      // 用户管理
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/Home/User/userList.vue')
      },
      // 权限管理
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/Home/limit/LimitList/index.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../views/Home/limit/RoleList/index.vue')
      },
      // 商品管理
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/Home/goods/GoodsList/index.vue')
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('../views/Home/goods/params/index.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/Home/goods/categories/index.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})


// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/')
    return next();
  //获取token
  const token = localStorage.getItem('token');
  if (!token)
    return next('/');
  next();
})


export default router
