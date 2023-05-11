const request = require("request")  //promisifying

const doReq =  function (postmanValue) {
    return new Promise(function (resolve, reject) {  //reject is optional  --this technique is called 'Promisifying'
        const options = {
            method : 'GET',
            url: 'https://postman-echo.com/get',
            qs     : {test: postmanValue},
        }

        request(options, function (error, response, body) {  //another example of err-first pattern
            if (error)

                throw new Error(error)
            else {
                resolve(body)
            }
        })

    })
}
console.log('start')
doReq('123') //the new promise returns right here. It has a .then method.
    .then(function (results) {
        //clean body
        let body = JSON.parse(results);
        const value = body.args.test
        console.log('first call:',value);
        doReq(value + value)
            .then(results => {
                let body = JSON.parse(results);
                console.log('second call:', body.args.test)
                //another call to promise
            })

    })
    .catch(err => console.log('in the catch', err))

console.log(`Waiting?`);

//we don't see this kind of code, since it would hang...
//  let foo = doReq('123');
//  let a

//Remember: you need to run .then(resolve, reject) to fire off the Promise...otherwise it just sits there in 'pending' state
//
// let foo = Promise.resolve(5);
// foo.then(val => console.log(`Value: ${val}`))
//
// Promise.resolve(42)  //more javascripty than let foo =
// .then(value => console.log(`Value: ${value}`));


//
// let reversed1 = "this is a string".split('').reverse().join('')
//
// const rev = (...theString) => theString.reverse()
// const theString = "this is a string";
// console.log(`Reversing ${theString}: ${rev(theString)}`)
//
