import {
    setActiveEffect
} from './effect';

export function watch(fn, cb, options = {}) {
    let oldValue;
    // 在执行fn获取oldValue前先存储回调函数
    setActiveEffect(() => {
        // 确保回调函数触发 获取到的是新值
        let newValue = fn();
        // 触发回调函数
        cb(newValue, oldValue);
        // 新值赋值给旧值
        oldValue = newValue;
    });
    // 读取值并收集回调函数
    oldValue = fn();
    // 置空回调函数
    setActiveEffect('');
}