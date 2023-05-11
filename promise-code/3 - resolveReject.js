const testStr = function (strVal) {
    return new Promise(function (resolve, reject) {
        //async web api call
        if (strVal.length > 5) {
            resolve(strVal); //this is the 'success path', returns a Promise
        } else {
            let err = {reason: "too short", originalString: strVal};
            reject(err);
        }
    });
};
//testStr('sdfkla'); //nothing happens until we add the .then

testStr('this')  //this line returns a Promise function (it has a method called 'then' that takes resolve, reject
    .then(                                      //.then starts the Promise execution
        value => { //resolve, gets strVal from Promise
            console.log(value);
            return value.length;
        },
        error => { //reject
            console.log(error);
//            return error.originalString;
            throw new Error('there was an error');  //maybe try returning to propogate error message
        }
    )
.then(value => {                  //Promises return Promises. That's why we can call .then here
        console.log('completed with', value);
        return value;
    })
    .then(value => {
        console.log(`String was this long: ${value}`);  //resolve
    },
        error => { `Rcvd reject: length was ${console.log(error)}`; }  //reject
        )
    .catch(err => console.log('in the catch', err))
