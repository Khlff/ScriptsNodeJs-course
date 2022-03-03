function DetAut(inputString, findString) {
    let alphabet = []
    for (let i = 0; i < findString.length; i++)
        alphabet[findString.charAt(i)] = 0
    let statesTable = new Array(findString.length + 1)
    for (let j = 0; j <= findString.length; j++)
        statesTable[j] = []
    // инициализация таблицы переходов
    for (let symb in alphabet)
        statesTable[0][symb] = 0;

    // формирует таблицу переходов
    for (let j = 0; j < findString.length; j++) {
        let prevState = statesTable[j][findString.charAt(j)];
        statesTable[j][findString.charAt(j)] = j + 1; // по дефолту устанавливаем состояние перехода j-го символа в (j + 1)-ый символ
        for (let symb in alphabet)
            statesTable[j + 1][symb] = statesTable[prevState][symb];
    }
    console.log(statesTable)
    let positions = [];
    let state = 0;

    for (let i = 0; i < inputString.length; i++) {
        if (!statesTable[state][inputString.charAt(i)])
            statesTable[state][inputString.charAt(i)] = 0;

        state = statesTable[state][inputString.charAt(i)];
        if (state === findString.length) // найдено совпадение
            positions.push(i - findString.length + 1);
    }

    if (positions.length === 0)
        console.log('Substring not found');
    else console.log(positions);
    return 1
}

console.log(DetAut("ABRACADABRA", "ABRA"))