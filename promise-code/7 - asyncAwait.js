//Async/await works on Promises, and it just is syntactic sugar to make it easier to read
//Can't use 'request' pkg since it does no use Promises

//Readability is a key component of maintainability!

//const http = require('http'); //this pkg is ok but a little heavy
const fetch = require('node-fetch');

//This is all still Promise code, just easier to read
//1. Mark async functions

const doRequest = async (inputValue) => {
    //2. Use 'await' when you need to pause for a response (no wrapping, no callback etc)
    let returnValueRaw = await fetch('https://postman-echo.com/get?test=' + inputValue,);
    console.log(`Raw: ${returnValueRaw}`)
    let returnValue = await returnValueRaw.json(); //.json() buffers the stream, and then un-stringifies it for us (THIS IS AN ASYNC OPERATION)
    return returnValue;
}

doRequest('123')
    .then(
        returnValue => {
            console.log(`Received ${returnValue.args.test}`)
        },
        error => {
            console.log(`Rejected with ${error}`)
        }
    )
