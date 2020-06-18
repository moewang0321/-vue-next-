import {
    effect
} from './effect';

export function computed(fn) {
    // 变量被改变后此值才会为true 第一次进来时候为true
    let dirty = true;
    let value;
    const runner = effect(fn, {
        schedular: () => {
            dirty = true;
        },
        // 第一次不用执行
        lazy: true,
    });
    // 返回值
    return {
        get value() {
            // 当标志为true代表变量需要更改
            if (dirty) {
                value = runner();
                // 制空依赖
                dirty = false;
            }
            return value;
        },
    };
}