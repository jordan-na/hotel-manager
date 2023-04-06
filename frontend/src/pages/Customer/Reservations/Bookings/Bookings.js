import { useLoaderData } from "react-router-dom";
import bookingServices from "../../../../services/booking-services";
import ReservationsList from "../../../../components/reservations/ReservationsList/ReservationsList";
import { getUserId } from "../../../../utils/use-user";

const Bookings = (props) => {
   const bookings = useLoaderData();

   return (
      <>
         <ReservationsList items={bookings} reservationType="booking" />
      </>
   );
};

export const loader = async () => {
   try {
      const bookings = await bookingServices.getBookingsByCustomerId(getUserId());
      return bookings;
   } catch (err) {
      return { isError: true, message: err.message };
   }
};

export default Bookings;
