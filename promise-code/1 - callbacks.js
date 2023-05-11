const delayed = function ( callback ) {
    setTimeout(
        function () {
            console.log('in delayed')
            let x = 42
            callback(x)
            return x
        }, 2000)
}

console.log('starting run')

const x = delayed(function (x) {
    console.log('In cb, x has the value', x)
    }
)
console.log(`Outside the callback function, x is : ${x}`);

// const secondFunction = (x) => console.log('secondFunction, x is now', x)
// secondFunction(5)


console.log('ending run')

//Note that this can lead to callback hell...
