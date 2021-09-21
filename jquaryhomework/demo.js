let a=[1,2,3,4,5]
let b =[]
for (let index=0;index<a.length;index++){
    b[0]=Number(a.slice(0,1)) +Number(a.slice(1,2))+Number(a.slice(2,3))+Number(a.slice(3,4))+Number(a.slice(4,5))+Number(a.slice(5,6))+Number(a.slice(6,7))
}
console.log(b)