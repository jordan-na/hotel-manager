import { useLoaderData } from "react-router-dom";
import bookingServices from "../../../services/booking-services";
import ReservationDetails from "../ReservationDetails/ReservationDetails";

const BookingDetails = () => {

   const booking = useLoaderData();

   const convertBookingToRenting = (bookingId) => {
      return bookingServices.convertBookingsToRentingsByIds([bookingId]);
   };

   return (
      <ReservationDetails
         reservation={booking}
         editable={booking.isActive ? true : false}
         returnPoint="/employee/bookings"
         reservationType="Booking"
         onEdit={convertBookingToRenting}
      />
   );
};

export const loader = async ({ params }) => {
   try {
      const bookingId = params.bookingId;
      const booking = await bookingServices.getBookingById(bookingId);
      return booking;
   } catch(err) {
      return {isError: true, message: err.message}
   }
};

export default BookingDetails;