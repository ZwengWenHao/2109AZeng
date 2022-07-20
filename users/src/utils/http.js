import reque from "./request";

export function logininfo(data) {
    return reque({
        url: '/login',
        method: 'POST',
        data
    })
}

