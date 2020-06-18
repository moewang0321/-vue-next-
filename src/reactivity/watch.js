import {
    effect
} from './effect';

export function watch(fn, cb, options = {}) {
    let oldValue;
    const runner = effect(fn, {
        schedular: () => {
            // 当这个依赖执行的时候 获取到的是新值
            let newValue = fn();
            // 触发回调函数
            cb(newValue, oldValue);
            // 新值赋值给旧值
            oldValue = newValue;
        },
        // 第一次不用执行
        lazy: true,
    });
    // 读取值并收集依赖
    oldValue = runner();
}