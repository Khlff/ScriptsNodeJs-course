function boyerMurSearch(inputString, findString, dict, f) {
    let len = findString.length, i = findString.length, jFindString = findString.length,
        kInputString = findString.length
    while (jFindString > 0 && i <= inputString.length) {
        if (inputString[kInputString - 1] === findString[jFindString - 1]) {
            kInputString--
            jFindString--
        } else {
            if (dict.get(inputString[i]) !== undefined) {
                i += dict.get(inputString[i])
                jFindString = len
                kInputString = i
            } else {
                i++
                jFindString = len
                kInputString = i
            }
        }
    }
    if (jFindString <= 0) {
        console.log(f-(inputString.length - kInputString))
        boyerMurSearch(inputString.substr(kInputString + findString.length), findString, dict, f)
    }
}

function main() {
    let findString = "стаа"
    let inputString = "стаставаыфафаыста"
    let dict = new Map()
    let lenOfInpString = findString.length
    for (let m = 0; m < lenOfInpString; m++)
        dict.set(findString[m], lenOfInpString - m)
    console.log(dict)
    let f = inputString.length
    boyerMurSearch(inputString, findString, dict, f)
}

main()