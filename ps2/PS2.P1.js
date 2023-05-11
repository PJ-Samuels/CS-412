// Write two generators that together implement a series of even Fibonacci numbers. The first
// generator should return the series of fibonacci numbers starting from 0. The series F is defined
// as
// F(0) = 0; F(1) = 1; F(n) = F(n-1) + F(n-2)
// The second generator should use the first to obtain the next number in the sequence, rejecting
// it if it is odd and asking for the next. Once an even Fibonacci number is obtained, it is emitted.
//     Use the generators to print out the first 6 even Fibonacci numbers

function* fibonacci(stop) {
    let current = 0;
    let next = 1;
    for( let i = 0; i < stop; i++){
        yield current;
        [current, next] = [next, current + next];
    }
}

function* evens() {
    const fib = fibonacci(100); // use a large enough number to ensure we get 6 even numbers
    while (true) {
        const num = fib.next().value;
        if (num % 2 === 0) {
            yield num;
        }
    }
}

const evenFibs = [];
const evensGen = evens();
while (evenFibs.length < 6) {
    evenFibs.push(evensGen.next().value);
}
console.log(evenFibs);

