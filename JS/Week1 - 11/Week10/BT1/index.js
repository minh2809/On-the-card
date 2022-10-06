// const array = [3, 4, 7, 1, 7];

// function findPairOfIndex(array,sumMatched){
//    for(let i = 0; i < array.length; i++){
//      for(let j = 0; j < array.length; j++){
//         if(array[i]+array[j]== sumMatched){
//             return [i,j];
//         }
//     }
// }
// }

// console.log(findPairOfIndex(array,10));




function checkSumOfDigitIsEven(num) {
    count = 0;  
    for (i = 1; i < num; i++) {
        sum = 0;
        // while (i !=0) {
        //     sum += i % 10;
        //     i = Number(i/10);
        // }
        if (sum % 2 == 0) {
            count++;
        }
    }
    console.log(count);
}

checkSumOfDigitIsEven(30)