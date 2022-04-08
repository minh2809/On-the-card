
function basketball(x, y){
   const game = (`points(${x}, ${y}) -> `)
   const z=2*x+3*y;
   return game + z;
}

// const point = basketball(38,8)
// console.log(point);

const twopoint = prompt('Enter number of two points shot:');
const threepoint = prompt('Enter number of three points shot:');

const result = basketball(twopoint,threepoint);
console.log(result);