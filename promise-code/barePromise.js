Promise.resolve(42)
    .then((value) => console.log(`Value: ${value}`));
Promise.resolve(42)
    .then(
        {
        resolve: (value) => console.log(`Value: ${value}`),
        reject: (value) => console.log(`Rejected: ${value}`)
    }
)
