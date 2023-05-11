// Write a function that prints the cube value of its input (ie f(x)=x^3). Next, write a single line of
// code to call the function on each value of the array [1,2,3,4,5,6,7]. Note: This is NOT a
// generator problem. The .map( ) method on Array is what I'm looking for here.
function cube (x){
    let val = x**3;
    return val
}
let arr = [1,2,3,4,5,6,7]
let ans = arr.map(val=> cube(val) )
console.log(ans)