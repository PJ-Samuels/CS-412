
let part1 = decorator("supercalifragilisticexpialidocious", function(str){
    let arr = str.split('c');
    let newArr = arr.map((arr, i) => {
        if(i === 0)
                return arr
        else
            return i < arr.length ? 'c'+arr  : arr;
    });
    return newArr;

});
console.log(part1)
let part2 = decorator("supercalifragilisticexpialidocious", function(arr){
    let replaced = arr.replace(/a/g, 'A');
    let numberReplaced = arr.split("a").length - 1;
    return {
        original: arr,
        changed: replaced,
        numberreplaced: numberReplaced,
        length: replaced.length

    }
});

function decorator(str, lambda){
    return lambda(str)
}
console.log(part2)
