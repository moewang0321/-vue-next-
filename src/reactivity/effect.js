// 回调函数集合
const targetMap = new WeakMap();

// 当前激活的回调函数
export let activeEffect;

// 设置当前回调函数
export function setActiveEffect(effect) {
    activeEffect = effect;
}

// 收集回调函数
export function track(target, key) {
    // 通过对象获取每个对象的map
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        // 当对象被第一次收集时 我们需要添加一个map集合
        targetMap.set(target, (depsMap = new Map()));
    }
    // 获取对象下各个属性的回调函数集合
    let dep = depsMap.get(key);
    if (!dep) {
        // 当对象属性第一次收集时 我们需要添加一个set集合
        depsMap.set(key, (dep = new Set()));
    }
    // 这里添加回调函数
    // dep.add(() => console.log('我是一个回调函数'));
    dep.add(activeEffect);
}

// 触发回调函数
export function trigger(target, key) {
    // 获取对象的map
    const depsMap = targetMap.get(target);
    if (depsMap) {
        // 获取对应各个属性的回调函数集合
        const deps = depsMap.get(key);
        if (deps) {
            // 触发回调函数
            deps.forEach((v) => v());
        }
    }
}