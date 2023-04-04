import { useLoaderData } from "react-router-dom";
import rentingServices from "../../../services/renting-services";
import ReservationDetails from "../ReservationDetails/ReservationDetails";

const RentingDetails = () => {

   const renting = useLoaderData();

   return (
      <ReservationDetails
         reservation={renting}
         returnPoint="/reservations/rentings"
         reservationType="Renting"
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
