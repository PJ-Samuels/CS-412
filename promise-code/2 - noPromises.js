const request = require("request");

const doReq = function (cb) {
    let options = {
        method: 'GET',
        url: 'https://postman-echo.com/get',
        qs: {test: '123'},
        headers: {
            'postman-token': '9bb9a22f-b509-6c7c-b716-cd4c3106ed0f',
            'cache-control': 'no-cache'
        }
    };
    console.log('received request');

    request(options, function (error, response, body) { //error first
        console.log('completed request');
        const theBody = JSON.parse(body)
        const test = theBody.args.test;
        cb(test);
        if (error) {
            console.log('oops', error);
            throw new Error(error); }
        else {
            return body;
        }
    });
}
console.log('starting request')
let test = doReq((test) => console.log(`On line 29: ${test}`));
console.log('On line 30: ', test);
console.log('done')

//callback hell -> duckduckgo it
//fix it with 'promises':
// they have three states -- pending (no results back yet), resolved (everything is fine), rejected (bad things happened)
//Promises use callbacks, in this case functions for resolve and reject

