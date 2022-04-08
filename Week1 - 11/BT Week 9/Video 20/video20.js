/*Conversion: manually converts one type to another

Coercion: JS automatically converts */


//Conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear); 
console.log(Number(inputYear) + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);

console.log(String(23), 23); 


/*Coercion
Lưu ý: Nếu mà số trước string sau thì sẽ chuyển số thành string 
Nếu string trước sẽ chuyển thành số( nhưng nếu có string sau 
thì vẫn sẽ chuyển thành string*/
console.log('I am ' + 23 + ' years old')
console.log('23' - ' 10 ' - 3)
console.log('23' * '2')

let n = '1 ' + 1; //11
n=n-1;
console.log(n)
