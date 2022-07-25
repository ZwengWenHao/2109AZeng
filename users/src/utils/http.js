import reque from "./request";

// 登录数据
export function logininfo(data) {
    return reque({
        url: '/login',
        method: 'POST',
        data
    })
}

// 侧边栏数据
export function asideInfo() {
    return reque({
        url: '/menus',
        method: 'GET',
    })
}

// 用户列表数据
export function getUser(params) {
    return reque({
        url: '/users',
        method: 'GET',
        params
    })
}
// 用户列表数据
export function getUserInfo(data) {
    return reque({
        url: '/users',
        method: 'POST',
        data
    })
}

// 用户删除数据
export function delInfo(data) {
    return reque({
        url: `/users/${data}`,
        method: 'delete',
        data
    })
}

// 用户状态数据
export function updateInfo(data) {
    console.log(data);
    let { type, uid } = data
    return reque({
        url: `users/${uid}/state/${type}`,
        method: 'put',
        data
    })
}

// 用户信息修改
export function updateUser(data) {
    console.log(data);
    let { id } = data
    return reque({
        url: `users/${id}`,
        method: 'put',
        data
    })
}

// 角色列表数据
export function getroles() {
    return reque({
        url: `roles`,
        method: 'get',
    })
}

// 分配角色
export function updaterole(data) {
    console.log(data);
    let { id, rid } = data
    return reque({
        url: `users/${id}/role`,
        method: 'put',
        data
    })
}

// 权限列表
export function getRolelist() {
    return reque({
        url: `rights/list`,
        method: 'get',
    })
}

// 角色列表
export function getRoles() {
    return reque({
        url: `roles`,
        method: 'get',
    })
}

// 删除角色列表
export function delRoles(data) {
    return reque({
        url: `roles/${data}`,
        method: 'delete',
        data
    })
}

// 删除指定权限
export function RolesDel(data) {
    let { roleId, rightId } = data
    return reque({
        url: `roles/${roleId}/rights/${rightId}`,
        method: 'delete',
        data
    })
}

// 权限列表数据
export function getRights() {
    return reque({
        url: `rights/tree`,
        method: 'get',
    })
}

// 分配权限数据
export function rolesRights(data) {
    let { roleId } = data
    return reque({
        url: `roles/${roleId}/rights`,
        method: 'post',
        data
    })
}

// 添加角色
export function addRoles(data) {
    return reque({
        url: `roles`,
        method: 'post',
        data
    })
}

// 修改角色
export function updateRoles(data) {
    let { id } = data
    return reque({
        url: `roles/${id}`,
        method: 'put',
        data
    })
}

// 商品管理
// 商品分类数据
export function getcategories(params) {
    return reque({
        url: `categories`,
        method: 'get',
        params
    })
}

// 商品列表
export function getGoods(params) {
    return reque({
        url: `goods`,
        method: 'get',
        params
    })
}

// 分类参数
export function getCategories(id, params) {
    return reque({
        url: `categories/${id}/attributes`,
        method: 'get',
        params
    })
}

// 订单列表
export function getOrders(params) {
    return reque({
        url: `orders`,
        method: 'get',
        params
    })
}

// 数据报表
export function getReports() {
    return reque({
        url: `reports/type/1`,
        method: 'get',
    })
}








