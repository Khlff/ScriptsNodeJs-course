const fs = require('fs');

function getMostCommonSymbol(inputString) {
    let result = {};
    for (let i = 0; i < inputString.length; ++i) {
        let a = inputString[i].toLowerCase();
        if (result[a] !== undefined) {
            ++result[a];
        } else {
            result[a] = 1;
        }
    }

    function getKeyByValue(object, value) { // получение ключа по значению
        return Object.keys(object).find(key => object[key] === value);
    }

    function compareNumeric(a, b) { // f сортировки массива
        if (a < b) return 1;
        if (a === b) return 0;
        if (a > b) return -1;
    }

    let funcAnswer = []
    let alphabet = Object.keys(result)
    let mostCommonSym = getKeyByValue(result, Object.values(result).sort(compareNumeric)[0])
    funcAnswer.push(alphabet, mostCommonSym)
    return funcAnswer
}

function EncryptionByCaesarsCipher(inputText, Shift, alphabet) {
//словарь (символ - позиция)
    const alphabetSymbolToPosition = new Map();
    let count = 0
    for (let i of alphabet) {
        alphabetSymbolToPosition.set(i.toLowerCase(), count)
        count++
    }
//словарь (позиция - символ)
    const alphabetPositionToSymbol = new Map();
    for (let i of alphabetSymbolToPosition) {
        alphabetPositionToSymbol.set(i[1], i[0]) //возвращается каждая пара ключ-значение из словаря alphabetSymbolToPosition и добавляется в новый словарь, с поменяными местами
    }
    if (Shift < 0) {
        if (Shift % alphabet.length !== 0)
            Shift = alphabet.length + (Shift % alphabet.length)
        else
            Shift = 0
        console.log(Shift)
    } else
        Shift = Shift % alphabet.length
    let outputString = ""
    for (let k = 0; k < inputText.length; k++) {
        if (inputText[k] !== undefined) {
            if (inputText[k].toLowerCase() === inputText[k])  // проверка на Upper Lower case
                outputString += alphabetPositionToSymbol.get((alphabetSymbolToPosition.get(inputText[k].toLowerCase()) + Shift) % alphabet.length) //получаем символ с позиции + сдвиг
            else
                outputString += (alphabetPositionToSymbol.get((alphabetSymbolToPosition.get(inputText[k].toLowerCase()) + Shift) % alphabet.length)).toUpperCase()
        }
    }
    return outputString
}

function DecryptingTheCaesarCipher(inputText, mostComSymInInpTxt, mostComSymInEncTxt, alphabet) {
    let outputString = "";
    let Shift = Math.abs(alphabet.indexOf(mostComSymInEncTxt) - alphabet.indexOf(mostComSymInInpTxt));
    for (let sym of inputText) {
        if (sym.toLowerCase() === sym) {
            let pos = (alphabet.indexOf(sym) - Shift) % alphabet.length;
            outputString += alphabet.slice(pos)[0]
        } else {
            let pos = (alphabet.indexOf(sym.toLowerCase()) - Shift) % alphabet.length;
            outputString += alphabet.slice(pos)[0].toUpperCase()
        }
    }
    return outputString
}

function main() {
    let Shift = -10
    console.log("Сдвиг: ", Shift)
    //
    let inputText = "Не выходи из комнаты, не совершай ошибку. Зачем тебе Солнце, если ты куришь Шипку?"
    //
    let answerFromMostCommonFunc = getMostCommonSymbol(inputText)
    let mostCommonSymbolInInputText = answerFromMostCommonFunc[1]
    console.log("Самый встречаемый символ в исходной строке:", mostCommonSymbolInInputText)
    //
    let alphabet = answerFromMostCommonFunc[0]
    console.log("Длина алфавита:", alphabet.length)
    //
    let encryptedText = EncryptionByCaesarsCipher(inputText, Shift, alphabet)
    console.log("Зашифрованная строка: ", encryptedText)
    let mostCommonSymbolInEncryptedText = getMostCommonSymbol(encryptedText)[1]
    console.log("Самый встречаемый символ в зашифрованной строке:", mostCommonSymbolInEncryptedText)

    let decryptedText = DecryptingTheCaesarCipher(encryptedText, mostCommonSymbolInInputText, mostCommonSymbolInEncryptedText, alphabet)
    console.log("Расшифрованная строка: ", decryptedText)
}

main()
