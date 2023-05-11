const evalute = equate => evaluated(equate)
console.log(evalute("4+2"))

function evaluated(equation) {
    const temp = equation.split('')
    switch (temp[1]) {
        case '+':
            return +temp[0] + +temp[2]
        case '-':
            return +temp[0] - +temp[2]
        case '*':
            return +temp[0] * +temp[2]
        case '/':
            return +temp[0] / +temp[2]
        case '^':
            return Math.pow(+temp[0] ,+temp[2])
    }
}