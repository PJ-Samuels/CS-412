//Async / await ONLY WORKS with functions that return Promises

const fetch = require('node-fetch');
const baseUrl = 'https://postman-echo.com/get?test=';

const getValue = async (param1) => {

    let response1 = await fetch(baseUrl + param1);
    let parsedResponse1 = await response1.json();

    let param2 = parsedResponse1.args.test;
    let response2 = await fetch(baseUrl + (param2 + param2));
    let parsedResponse2 = await response2.json();

    return parsedResponse2.args.test

}


//Use an IIFE to wrap this in an async function...(the parens tell JS that this is a function expression
(async function () {
let foo = await getValue('123');
console.log(`Received: ${foo}`)
})()

//Another way to do it with a named function...
// const doIt = async () => {
//     let foo = await getValue('123');
//     console.log(`Received: ${foo}`)
// }
// doIt();
