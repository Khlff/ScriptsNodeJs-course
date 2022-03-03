const fs = require('fs');

/*--------Считывание файла с входной строкой--------*/
let input = fs.readFileSync('testString.txt', 'utf8');

/*--Считывание файла с входной подстрокой---*/

let subString = fs.readFileSync('subString.txt', 'utf8');

let choose = 4

/*-Запуск нужного поиска-*/
switch (choose) {
    case 1:
        bruteforce();
        break
    case 2:
        hashDegreeOfTwo();
        break
    case 3:
        ASCIICash();
        break
    case 4:
        ASCIICashDegree();
        break
}

/*----------------Поиск с помощью жадного алгоритма---------------*/
function bruteforce() {
    let time = performance.now();
// некий код
    let matches = 0;
    let matchesPoints = [];

    for (let i = 0; i < input.length - subString.length+1; i++) {
        let flag = true;
        let count = 0;
        while (count < subString.length) {
            if (input.charAt(i + count) !== subString.charAt(count)){
                flag = false;
                break;
            }
            count++;
        }
        if (flag) {
            matches++;
            if (matchesPoints.length < 10)
                matchesPoints[matchesPoints.length] = i;
        }
    }
    time = performance.now() - time;

    console.log(matchesPoints);
    console.log(matches, " ", "no", " ", time, " ms");
}

/*--------------Поиск с помощью хеша и степени двойки---------------*/
function hashDegreeOfTwo() {
    let time = performance.now();
    let hashSum = 0;
    let subStrHash = 0;
    let collisions = 0;
    let matches = 0;
    let matchesPoints = [];
    let powOfTwo = 1;

    for (let i = 0; i < subString.length; i++) {
        powOfTwo *= 2;
        hashSum += (input.charAt(i).charCodeAt(0) * powOfTwo);
        subStrHash += (subString.charAt(i).charCodeAt(0) * powOfTwo);
    }

    for (let j = 0; j < input.length - subString.length+1; j++) {
        if (subStrHash === hashSum){
            let isSame = true;
            for (let i = 0; i < subString.length - 1; i++) {
                if (subString.charAt(i) !== input.charAt(i + j)) {
                    isSame = false;
                    break;
                }
            }
            if (isSame){
                matches++;
                if (matchesPoints.length < 10)
                    matchesPoints[matchesPoints.length] = j;
            }
            else
                collisions++;
        }
        hashSum = hashSum / 2 - input.charAt(j).charCodeAt(0) +
            input.charAt(j + subString.length).charCodeAt(0) * powOfTwo;
    }
    time = performance.now() - time;
    console.log(matchesPoints);
    console.log(matches, " ", collisions, " ", time, " ms");
}

/*---------------Поиск с помощью ASCII-хеша-----------------*/
function ASCIICash() {
    let time = performance.now();
    let hashSum = 0;
    let subStrHash = 0;
    let collisions = 0;
    let matches = 0;
    let matchesPoints = [];

    for (let i = 0; i < subString.length; i++){
        hashSum += input.charAt(i).charCodeAt(0);
        subStrHash += subString.charAt(i).charCodeAt(0);
    }

    for (let j = 0; j < input.length - subString.length; j++){
        if (subStrHash === hashSum){
            let isSame = true;
            for (let i = 0; i < subString.length - 1; i++){
                if (subString.charAt(i) !== input.charAt(i + j)){
                    isSame = false;
                    break;
                }
            }
            if (isSame){
                matches++;
                if (matchesPoints.length < 10)
                    matchesPoints[matchesPoints.length] = j;
            }
            else
                collisions++;
        }
        hashSum = hashSum - input.charAt(j).charCodeAt(0) +
            input.charAt(j + subString.length).charCodeAt(0);
    }

    time = performance.now() - time;

    console.log(matchesPoints);
    console.log(matches, " ", collisions, " ", time, " ms");
}

/*-------------Поиск с помощью ASCII-хеша и степени-----------------*/
function ASCIICashDegree() {
    let time = performance.now();
    let hashSum = 0;
    let subStrHash = 0;
    let collisions = 0;
    let matches = 0;
    let matchesPoints = [];

    for (let i = 0; i < subString.length; i++) {
        hashSum += Math.pow(input.charAt(i).charCodeAt(0), 2);
        subStrHash += Math.pow(subString.charAt(i).charCodeAt(0), 2);
    }

    for (let j = 0; j < input.length - subString.length; j++){
        if (subStrHash === hashSum){
            let isSame = true;
            for (let i = 0; i < subString.length - 1; i++){
                if (subString.charAt(i) !== input.charAt(i + j)){
                    isSame = false;
                    break;
                }
            }
            if (isSame){
                matches++;
                if (matchesPoints.length < 10)
                    matchesPoints[matchesPoints.length] = j;
            }
            else
                collisions++;
        }
        hashSum = hashSum - Math.pow(input.charAt(j).charCodeAt(0), 2) +
            Math.pow(input.charAt(j + subString.length).charCodeAt(0), 2);
    }

    time = performance.now() - time;

    console.log(matchesPoints);
    console.log(matches, " ", collisions, " ", time, " ms");
}