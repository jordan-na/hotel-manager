export const validateLocation = (location) => {
   const regex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
   return regex.test(location);
};

export const validateDate = (date) => {
   const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
   return regex.test(date);
};

export const validateCapacity = (capacity) => {
   return (
      capacity === "single" ||
      capacity === "double" ||
      capacity === "triple" ||
      capacity === "quad" ||
      capacity === "quin"
   );
};

export const validateHotelChain = (hotelChain) => {
   const regex = /^[a-zA-Z0-9\s.,-]+$/;
   return regex.test(hotelChain);
};

export const validateCategory = (category) => {
   const regex = /^[1-5]\sstar$/;
   return regex.test(category);
};

export const validateNumberOfRooms = (numberOfRooms) => {
   if (numberOfRooms.charAt(numberOfRooms.length - 1) === ".") return false;
   const regex = /^(1[0-4]?[0-9]{3}|15000|[1-9][0-9]{0,3})$/;
   return regex.test(numberOfRooms);
};

export const validatePrice = (price) => {
   const regex = /^(0|[1-9]\d{0,3})(\.\d{1,2})?$/;
   return regex.test(price);
};

export const validateEmail = (email) => {
   const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   return regex.test(email);
}
