import {
    reactive,
    watch,
    computed,
    effect
} from './reactivity'

// ------------------------------------------------------------------------

// const test = reactive({
//     a: '1'
// })

// const testArr = reactive([1, 2, 3])

// test.a // a被读取了
// test.a = 2 // a被设置了

// test.b // b被读取了

// testArr[0] // 0被读取了

// testArr.pop() // pop被读取了 => length被读取了 => 2被读取了 => length被设置了

// -----------------------------------------------------------------------

// let obj = {
//     a: '1',
//     b: '2'
// }

// const test = reactive(obj)

// test.a = 2
// test.b = 3

// -----------------------------------------------------------------------

// const test = reactive({
//     a: 1,
//     b: 2
// })

// test.b

// setTimeout(() => {
//     test.a = 2
//     test.b = 3
// }, 1000);

// ----------------------------------------------------------------------

// const test1 = reactive({
//     a: 1,
// });

// watch(
//     () => test1.a,
//     (val) => {
//         console.log(val) // 2;
//     }
// );

// test1.a = 2;

// ---------------------------------------------------------------------

// const test = reactive({
//     a: 1,
// });

// const w = computed(() => test.a + 1);

// console.log(w.value); // 2
// test.a = 2;
// console.log(w.value); // 3

// --------------------------------------------------------------------

const test = reactive({
    a: 1,
});

const w = computed(() => test.a + 1);

watch(
    () => test.a,
    (val) => {
        console.log(val); // 2
    }
);

console.log(w.value); // 2
test.a = 2;
console.log(w.value); // 3