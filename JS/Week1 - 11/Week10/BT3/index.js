function reverseString (string){
    return string.split('').reverse().join('');
}

const InputString = prompt('Input String: ');
const result = reverseString(InputString);
console.log(result)