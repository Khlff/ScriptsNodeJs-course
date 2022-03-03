const fs = require('fs');
const readline = require('readline-sync');

let fileContent = fs.readFileSync('program.txt', 'utf8') + " ";

let memArray = new Array(256); //ПАМЯТЬ [0-126 запись команд, 127-190 промежуточный результат, 191-255 конечный результат]

let localCommand = "";
let ps = 0;
for (let i of fileContent) {
    if (i === ' ' || i === '\n' || i === '\r') {
        if (localCommand !== "") {
            memArray[ps] = localCommand;
            ps++;
            localCommand = "";
        }
    } else {
        localCommand += i;
    }
}

function gcd(num1, num2) {
    if (num1 === 0)
        return num2
    return gcd(num2 % num1, num1)
}

function factorial(n) {
    var result = 1;
    while (n) {
        result *= n--;
    }
    return result;
}

let ip = 0
while (memArray[ip] !== "exit") {
    switch (memArray[ip]) {
        case 'input':
            let inputData = Number(readline.question());
            memArray[memArray[ip + 1]] = inputData;
            ip += 2;
            break;
        case 'factorial':
            memArray[memArray[ip + 2]] = factorial(memArray[memArray[ip + 1]])
            ip += 3;
            break;
        case 'nod':
            memArray[memArray[ip + 3]] = gcd(memArray[memArray[ip + 1]], memArray[memArray[ip + 2]])
            ip += 4;
            break;
        case 'output':
            console.log(memArray[memArray[ip + 1]])
            ip += 2;
            break;
    }
}