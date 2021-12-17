const fs = require('fs');
const io = require('console-read-write');

let fileContent = fs.readFileSync('teststring.txt', 'utf8');

function escapeCoding(fileContent) {
    function codeToASCII(x) {
        return String.fromCharCode(x);
    }
    const escapeSymbol = '#';
    let codedString = '';
    let lenNow = 1;
    let lastSymbol = '';
    for (let i = 1; i <= fileContent.length; i++) {
        if (fileContent[i] === fileContent[i - 1]) {
            lenNow += 1;
            lastSymbol = fileContent[i];
        } else if (lenNow < 3) {
            codedString += fileContent[i - 1].repeat(lenNow)
            lastSymbol = fileContent[i - 1];
            lenNow = 1;
        } else {
            if (lenNow > 255) {
                let repeatCount = parseInt(lenNow / 255)
                for (let m = 0; m < repeatCount; m++) {
                    codedString += (escapeSymbol + codeToASCII(255) + fileContent[i - 1]);
                }
                codedString += escapeSymbol + codeToASCII(lenNow - (parseInt(lenNow / 255)) * 255) + fileContent[i - 1];
                lastSymbol = fileContent[i - 1];
                lenNow = 1;
            } else {
                codedString += (escapeSymbol + codeToASCII(lenNow) + fileContent[i - 1]);
                lastSymbol = fileContent[i - 1];
                lenNow = 1;
            }
        }
    }
    return codedString;
}

function escapeDecoding(codedString) {

    function decodeFromASCII(x) {
        return x.toString().charCodeAt(0);
    }

    let decodeStr = '';
    const escapeSymbol = '#';
    let flag = false;
    let localAmount = 0;
    for (let i = 0; i < codedString.length-1; i++) {
        if (codedString[i - 1] === escapeSymbol && codedString[i] === escapeSymbol) {
            decodeStr += codedString[i + 1].repeat(decodeFromASCII(codedString[i]))
            i++;
            flag = false;
        } else if (codedString[i - 1] === escapeSymbol && codedString[i] === escapeSymbol) {
            decodeStr += escapeSymbol.repeat(2)
        } else if (codedString[i - 1] === escapeSymbol && codedString[i + 1] === escapeSymbol) {
            decodeStr += escapeSymbol.repeat(decodeFromASCII(codedString[i]))
            i++;
            flag = false;
        } else if (codedString[i] === escapeSymbol) {
            flag = true;
        } else if (flag === true && codedString[i - 1] === escapeSymbol) {
            localAmount = decodeFromASCII(codedString[i])
        } else if (flag === true) {
            decodeStr += codedString[i].repeat(localAmount);
            flag = false;
        } else {
            decodeStr += codedString[i]
        }

    }
    return decodeStr
}

function jumpCoding(fileContent) {
    let i = 0;
    let n = 1;
    let codedString = "";
    let count = 0;
    let localString = "";
    fileContent += "AA";

    function codeToASCII(x) {
        return String.fromCharCode(x);
    }

    while (i < fileContent.length) {
        while (fileContent[i] === fileContent[i + n])
            n++;
        i += n;
        if (n !== 1) {
            if (localString !== "") {
                codedString += (codeToASCII(count + 128)) + localString;
                count = 0;
                localString = "";
            }
            if (n>127) {
                let repeatCount = parseInt(n / 127)
                for (let m = 0; m < repeatCount; m++) {
                    codedString += codeToASCII(127) + fileContent[i - 1];
                }
                codedString += codeToASCII(n - (parseInt(n / 127)) * 127) + fileContent[i - 1];
            }
            else {
                codedString += codeToASCII(n) + fileContent[i - 1];
            }
        } else {
            count++;
            localString += fileContent[i - 1];
        }
        n = 1;
    }
    return codedString.substr(0,codedString.length-2);
}

function jumpDecoding(codedString) {
    function decodeFromASCII(x) {
        return x.toString().charCodeAt(0);
    }

    let decodeStr = "";
    let flag = false;
    for (let i = 0; i < codedString.length - 1; i++) {
        if (flag === false && decodeFromASCII(codedString[i]) < 128) {
            decodeStr += codedString[i + 1].repeat(decodeFromASCII(codedString[i]));
            if (decodeFromASCII(codedString[i + 2]) < 128) {
                flag = false;
                i++;
            } else {
                flag = true;
                i++
            }
        } else {
            const n = decodeFromASCII(codedString[i]) - 128
            for (let m = 1; m <= n; m++) {
                decodeStr += codedString[i + m]
            }
            i += n
            flag = false;
        }
    }
    return decodeStr;
}

async function main() {
    console.log('Enter "e" for escape, "j" for jump')
    let chooseCoding = await io.read()
    if (chooseCoding === 'e'){
        console.log("Исходная строка:" + '\n' + fileContent);

        console.log("Escape символ = #");

        const codedString = escapeCoding(fileContent);
        console.log("Закодированная строка:" + '\n' + codedString);

        const decodedString = escapeDecoding(codedString);
        console.log("Декодированная строка:" + '\n' + decodedString);
    }
    else if (chooseCoding === 'j'){
        console.log("Исходная строка:" + '\n' + fileContent);

        const codedString = jumpCoding(fileContent);
        console.log("Закодированная строка:" + '\n' + codedString + '\n');

        const decodedString = jumpDecoding(codedString);
        console.log("Декодированная строка:" + '\n' + decodedString + '\n');
    }
    else{
        console.log('Error: coding method not found')
    }
}

main();