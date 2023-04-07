import { useLoaderData } from "react-router-dom";
import rentingServices from "../../../services/renting-services";
import ReservationDetails from "../ReservationDetails/ReservationDetails";

const RentingDetails = () => {

   const renting = useLoaderData();

   const checkOutRenting = (rentingId) => {
      return rentingServices.checkOutRentingsByIds([rentingId]);
   }

   return (
      <ReservationDetails
         reservation={renting}
         editable={renting.isActive ? true : false}
         returnPoint="/employee/rentings"
         reservationType="Renting"
         onEdit={checkOutRenting}
      />
   );
};

export const loader = async ({ params }) => {
   try {
      const rentingId = params.rentingId;
      const renting = await rentingServices.getRentingById(rentingId);
      return renting;
   } catch (err) {
      return { isError: true, message: err.message };
   }
};

export default RentingDetails;
