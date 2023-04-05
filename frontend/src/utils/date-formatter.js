export const formatDateFromSql = (dateString) => {
   const dateObj = new Date(dateString);

   const day = dateObj.getDate();
   const month = dateObj.getMonth() + 1;
   const year = dateObj.getFullYear();

   const formattedDate = `${day}/${month}/${year}`;

   return formattedDate;
}

export const formatDateForSQL = (dateString) => {
   const [day, month, year] = dateString.split("/");

   const paddedDay = day.padStart(2, "0");
   const paddedMonth = month.padStart(2, "0");

   const dateObject = new Date(`${year}-${paddedMonth}-${paddedDay}`);
   const sqlDateString = dateObject.toISOString().slice(0, 10);

   return sqlDateString;
};

export const getTomorrow = (date) => {
   const tomorrow = new Date(date);
   tomorrow.setDate(tomorrow.getDate() + 1);
   return tomorrow;
}
