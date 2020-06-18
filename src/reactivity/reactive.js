import {
    isPlainObject
} from './utils'
import {
    track,
    trigger
} from './effect'

// 只有数组、对象才能被监测
function canObserve(value) {
    return Array.isArray(value) || isPlainObject(value)
}

// // 回调函数
// function notice(key) {
//     console.log(`${key}被改变并触发回调`)
// }

// 拦截数据
export function reactive(value) {

    // 不能监测 直接返回
    if (!canObserve(value)) return

    const observe = new Proxy(value, {
        // 拦截读取
        get(target, key, receiver) {
            // console.log(`${key}被读取`);

            // 收集回调函数
            track(target, key)
            return Reflect.get(target, key, receiver)
        },
        // 拦截设置
        set(target, key, newValue, receiver) {
            const res = Reflect.set(target, key, newValue, receiver)
            // console.log(`${key}被设置`)

            // 触发回调函数
            trigger(target, key)
            // notice(key)
            return res
        }
    })

    // 返回被观察的proxy实例
    return observe

}