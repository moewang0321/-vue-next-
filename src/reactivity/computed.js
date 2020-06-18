import {
    setActiveEffect
} from './effect';

export function computed(fn) {
    // 变量被改变后此值才会为true 第一次进来时候为true
    let dirty = true;
    // 返回值
    let value;
    // 设置为true表达下次读取需要重新获取
    function changeDirty() {
        dirty = true;
    }
    return {
        get value() {
            // 当标志为true代表变量需要更改
            if (dirty) {
                dirty = false;
                // 将变量控制设置为
                setActiveEffect(changeDirty);
                // 获取值
                value = fn();
                // 制空依赖
                setActiveEffect('');
            }
            return value;
        },
    };
}