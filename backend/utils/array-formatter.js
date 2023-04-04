export const formatArrayForSql = (arr) => {
   const formattedArr = arr.map((str) => `'${str}'`).join(", ");
   return `(${formattedArr})`;
};