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

// 分配角色
export function updaterole(data) {
    console.log(data);
    let { id } = data
    return reque({
        url: `users/${id}`,
        method: 'put',
        data
    })
}



