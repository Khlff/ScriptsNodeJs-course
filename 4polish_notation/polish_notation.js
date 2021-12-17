function ReverseToPolishNotation(inputExpression) {
    let outputExpression = ""
    const operationsPriority = new Map()
    operationsPriority.set('/', 3)
    operationsPriority.set('*', 3)
    operationsPriority.set('+', 2)
    operationsPriority.set('-', 2)
    operationsPriority.set('(', 4)
    operationsPriority.set(')', 5)

    let stack = []
    let check = 0
    for (let i of inputExpression) {
        if (operationsPriority.get(i) === undefined)
            outputExpression += i
        else if (operationsPriority.get(i) === 4) {
            stack.push(i)
            check++
        } else if (operationsPriority.get(i) === 2 || operationsPriority.get(i) === 3) {
            for (let m = stack.length - 1; m >= 0; m--) {
                if ((operationsPriority.get(i) <= operationsPriority.get(stack[m])) && (operationsPriority.get(stack[m])) !== 4)
                    outputExpression += stack.pop()
                else
                    break
            }
            stack.push(i)
        } else if (i === ')') { // a/(m+a)+k/i+c)
            check--
            if (check<0)
                return "ERROR: INCORRECT EXPRESSION"
            for (let m = stack.length - 1; m >= 0; m--) {
                if (stack[m] !== '(') {
                    outputExpression += stack.pop()
                } else {
                    stack.pop()
                    break
                }
            }
        }
    }
    if (check !== 0)
        return "ERROR: INCORRECT EXPRESSION"
    if (stack.length !== 0) {
        for (let m = stack.length - 1; m >= 0; m--) {
            if (stack[m] !== '(') {
                outputExpression += stack.pop()
            } else {
                stack.pop()
            }
        }
    }
    return outputExpression
}

function CountPolishNotation(inputExpression, variables) {
    let arrayFromExpression = []
    for (let i of inputExpression) {
        if (variables.get(i) !== undefined)
            arrayFromExpression.push(variables.get(i))
        else
            arrayFromExpression.push(i)
    }

    for (let num = 0; num < arrayFromExpression.length; num++) {
        if (arrayFromExpression[num] === '+') {
            arrayFromExpression.splice(num - 2, 3, arrayFromExpression[num - 1] + arrayFromExpression[num - 2])
            num -= 2
        } else if (arrayFromExpression[num] === '-') {
            arrayFromExpression.splice(num - 2, 3, arrayFromExpression[num - 2] - arrayFromExpression[num - 1])
            num -= 2
        } else if (arrayFromExpression[num] === '*') {
            arrayFromExpression.splice(num - 2, 3, arrayFromExpression[num - 1] * arrayFromExpression[num - 2])
            num -= 2
        } else if (arrayFromExpression[num] === '/') {
            if (arrayFromExpression[num - 1] === 0) {
                console.log("ERROR:DIVISION BY ZERO")
                return ""
            }
            arrayFromExpression.splice(num - 2, 3, arrayFromExpression[num - 2] / arrayFromExpression[num - 1])
            num -= 2
        }
    }
    return arrayFromExpression[0]
}

function main() {
    let inputExpression = "a/(m+a)+k/i+c))))"
    let polishExpression = ReverseToPolishNotation(inputExpression)
    console.log(polishExpression)

    let variables = new Map()
    variables.set('a', -3)
    variables.set('m', 5)
    variables.set('c', 4)
    variables.set('i', 1)
    variables.set('k', 10)
    let countedPolishExpression = CountPolishNotation(polishExpression, variables)
    console.log(countedPolishExpression)
}

main()