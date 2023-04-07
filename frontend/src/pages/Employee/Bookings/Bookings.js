import usePageSetter from "../../../hooks/use-page-setter";
import { getUserId } from "../../../utils/use-user";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import bookingServices from "../../../services/booking-services";
import ReservationsList from "../../../components/Employee/ReservationsList/ReservationsList";

const Bookings = () => {

   const bookings = useLoaderData();

   console.log(bookings);

   const { setEmployeePage } = usePageSetter();

   useEffect(() => {
      setEmployeePage("bookings");
   }, [setEmployeePage]);

   return <ReservationsList items={bookings} reservationType="booking" />;
};

export const loader = async () => {
   try {
      const bookings = await bookingServices.getBookingsByEmployeeId(getUserId());
      return bookings;
   } catch (err) {
      return { isError: true, message: err.message };
   }
};

export default Bookings;