export const formatDateFromSql = (date) => {
   const dateObj = new Date(date);
   return new Intl.DateTimeFormat("en-US").format(dateObj);
};