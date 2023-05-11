// Write a generator that is initialized with a sentence and that emits each word of the sentence in
// turn.
// Use the generator to print the words, one per line, of the string “All I know is something like a
// bird within her sang”. Hint: Splitting a string returns an Array.
function* sentence(str){
    let temp = str.split(" ")
    for(let i = 0; i < temp.length; i++) {
        yield temp[i]
        console.log(temp[i])
    }
}
console.log(Array.from(sentence("All I know is something like a bird within her sang")));