let a = ['a', 'b', 'c', 'd', 'e']
const b = [1, 2, 3, 4, 5]
let c = new Object();
for (let i = 0; i < a.length; i++) {
    c[b[i]] = a[i];
}
console.log(c)
