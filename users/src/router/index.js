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
        component: () => import('../views/Home/User/userList.vue'),
        meta: { list: [{ name: "用户管理" }, { name: '用户列表' }] }
      },
      // 权限管理
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/Home/limit/LimitList/index.vue'),
        meta: { list: [{ name: "权限管理" }, { name: '角色列表' }] }
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../views/Home/limit/RoleList/index.vue'),
        meta: { list: [{ name: "权限管理" }, { name: '权限列表' }] }

      },
      // 商品管理
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/Home/goods/GoodsList/index.vue'),
        meta: { list: [{ name: "商品管理" }, { name: '商品列表' }] }

      },
      {
        path: '/params',
        name: 'params',
        component: () => import('../views/Home/goods/params/index.vue'),
        meta: { list: [{ name: "商品管理" }, { name: '分类参数' }] }

      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/Home/goods/categories/index.vue'),
        meta: { list: [{ name: "商品管理" }, { name: '商品分类' }] }

      },
      // 订单管理
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/Home/orders/index.vue'),
        meta: { list: [{ name: "订单管理" }, { name: '订单列表' }] }

      },
      // 数据报表
      {
        path: '/reports',
        name: 'reports',
        component: () => import('../views/Home/reports/index.vue'),
        meta: { list: [{ name: "数据统计" }, { name: '数据报表' }] }
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
