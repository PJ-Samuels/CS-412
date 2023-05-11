let funcs = [];
for (var num = 0; num<4; num++){
    funcs.push(
        () => console.log(`Num ${num}`)
    )
}

console.log(`Funcs[1]: ${funcs[1]}`);
funcs[1]()


let rst = (a,b,...c) => console.log(a,b,c.length);
rst(1,2,3,4,5,6)
const foo = ({size, color})=> size;
foo({size:1, color: 'green'})
foo({size:1, color: 'green', weight: 12})