/*
  Algorithm to get a substring with new line separator
*/

export const findNewLine = (stringData) => {
  return stringData.split("\n");
};

/*
  Here is how to do it manually
*/
// export const findNewLineManual = (stringData) => {
//   const newLine = [0];
//   const stringArray = [];

//   for (let i = 0; i < stringData.length; i++) {
//     stringData[i] === "\n" && newLine.push(i);
//   }

//   newLine.push(stringData.length);

//   for (let i = 0; i < newLine.length - 1; i++) {
//     if (i > 0) {
//       stringArray.push(stringData.slice(newLine[i] + 1, newLine[i + 1]));
//     } else {
//       stringArray.push(stringData.slice(newLine[i], newLine[i + 1]));
//     }
//   }

//   return stringArray;
// };
