export const formatDateForSQL = (dateString) => {
   const [day, month, year] = dateString.split("/");

   const paddedDay = day.padStart(2, "0");
   const paddedMonth = month.padStart(2, "0");


   const dateObject = new Date(`${year}-${paddedMonth}-${paddedDay}`);
   const sqlDateString = dateObject.toISOString().slice(0, 10);

   return sqlDateString;
}
