function myFunction(a) {
  const b = a.toString().split('');
  return b.map(Number);
}

const result = myFunction(10);

console.log(result);