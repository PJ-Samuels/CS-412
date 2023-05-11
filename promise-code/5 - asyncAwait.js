
const fetch = require('node-fetch')

const options = {
    method : 'GET',
    url: 'https://postman-echo.com/get?test=',
}

//const doRequest = async function () { }
const  doRequest = async (value) => {
    let returnValueRaw = await fetch(options.url + value)
    let returnValue = await returnValueRaw.json()
    return returnValue;
}

doRequest('123')
.then(returnValue => {
    doRequest(returnValue.args.test + '345')
        .then(returnValue => {
            console.log(`Got: ${returnValue.args.test}`)
        })
    }

)

// (async function () {
// let foo = await Promise.resolve(2)
// console.log(`Foo: ${foo}`);
// })()
