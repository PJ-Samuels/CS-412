

const delayed = function ( ) {
    setTimeout(
        function () {
            let x = 42;
            console.log('in delay, x is ', x);
            return x;
        }, 2000)
}
console.log('starting run')
const x = delayed()
console.log('x is now', x)
console.log('ending run')
