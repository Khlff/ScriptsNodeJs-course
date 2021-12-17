// function MakeHuffmanDict(inputString) {
//     function Countfreq(str) {
//         let rawFreq = {}
//         for (let i in str)
//             rawFreq[str[i]] === undefined ? rawFreq[str[i]] = 1 : rawFreq[str[i]] = rawFreq[str[i]] + 1
//         return rawFreq
//     }
//
//     function SortTransformFreq(freqs) {
//         let pairs = []
//         for (let i in freqs)
//             pairs.push([freqs[i], i])
//         return pairs.sort()
//     }
//
//     function BuildTree(pairs) {
//         while (pairs.length > 1) {
//             let firstTwo = [pairs[0][1], pairs[1][1]]
//             let slicedFrequences = pairs.slice(2, pairs.length)
//             let sumOfFreq = pairs[0][0] + pairs[1][0]
//             pairs = slicedFrequences
//             let end = [sumOfFreq, firstTwo]
//             pairs.push(end)
//             pairs.sort()
//         }
//         return pairs[0][1];
//     }
//
//     let arrayCountfreq = Countfreq(inputString)
//     let arraySortTransformFreq = SortTransformFreq(arrayCountfreq)
//     let tree = BuildTree(arraySortTransformFreq)
//     let codesHuffman = new Map()
//     let pattern = ''
//
//     function assignCode(node, pat) {
//         if (typeof (node) === typeof (""))
//             codesHuffman.set(node, pat)
//         else {
//             assignCode(node[0], pat + '0')
//             assignCode(node[1], pat + '1')
//         }
//     }
//
//     assignCode(tree, pattern)
//     return codesHuffman
// }
//
// function EncodeByHuffman(inputString, dict) {
//     let encodedString = ""
//     for (let sym of inputString)
//         encodedString += dict.get(sym)
//     return encodedString
// }
//
// function DecodeByHuffman(inputString, dict) {
//     let decodedString = ""
//     let localCode = ""
//     const reversedDict = new Map();
//     for (let i of dict)
//         reversedDict.set(i[1], i[0])
//
//     for (let sym of inputString) {
//         localCode += sym
//         if (reversedDict.has(localCode)) {
//             decodedString += reversedDict.get(localCode)
//             localCode = ""
//         }
//     }
//     return decodedString
// }
//
// function main() {
//     let inputString = "SASHAESTKASHU"
//     let dictByHuffman = MakeHuffmanDict(inputString)
//     console.log(dictByHuffman)
//     let m = EncodeByHuffman(inputString, dictByHuffman)
//     console.log(m)
//     console.log(DecodeByHuffman(m, dictByHuffman))
// }
//
// main()
let N = 7
let k = 1
let fib1 = 1
let fib2 = 1

while(k<N-2){
    let fib_sum = fib1+fib2
    fib1 = fib2
    fib2 = fib_sum
    k++
}
console.log(fib2)