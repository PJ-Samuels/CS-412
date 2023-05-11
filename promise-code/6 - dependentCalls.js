const request = require('request')
const fetch = require('node-fetch')

const getValues =  async _ => {

    //get first resource (returns 123)
    const url = 'https://postman-echo.com/get?test='
    let param1 = 123
    console.time('FETCH')
    let response1 = await fetch(url + param1);
    console.timeEnd('FETCH')
    console.time('PARSE')
    let parsedResponse = await response1.json();
    console.timeEnd('PARSE')

    //get second resource, based on first


    let param2 = parsedResponse.args.test * 2
    console.time('FETCH')

    let response2 = await fetch(url + param2)
    console.timeEnd('FETCH')

    console.time('PARSE')

    let retVal = await response2.json()
    console.timeEnd('PARSE')

    return retVal.args.test

}
( async function () {
let foo = await getValues()
console.log(foo)
})()
    // getValues()
    // .then(value => console.log(value))
