const n = prompt('Enter length of array:')
var sum =0;
var average = 0;
var arr = new Array(n);

for (let i=1;i<=n;i++){
    arr[i]=eval(prompt('Enter a number: '));
    sum = sum + arr[i];
}

average = sum/n;
console.log(average);