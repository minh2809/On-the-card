function countWord(x,y){
    let count = 0;
    const charCount = ` charCount("${x}", "${y}")-> `;
    for (let i=0; i<=y.length;i++){
            if(y.charAt(i) === x){
                count++;
            }
    }
    return charCount + count;
}

// const result = countWord("a","abata")
// console.log(result)

const letterToCheck = prompt('Enter a letter:');
const string = prompt('Enter a string: ');



const result = countWord(letterToCheck,string);
console.log(result)