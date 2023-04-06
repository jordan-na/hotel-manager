import ReservationsList from "../../../../components/reservations/ReservationsList/ReservationsList";
import { getUserId } from "../../../../utils/use-user";
import rentingServices from "../../../../services/renting-services";
import { Outlet, useLoaderData } from "react-router-dom";

const Rentings = () => {
   const rentings = useLoaderData();

   return (
      <>
         <ReservationsList items={rentings} reservationType="renting" />
         <Outlet />
      </>
   );
};

export const loader = async () => {
   try {
      const rentings = await rentingServices.getRentingsByCustomerId(getUserId());
      return rentings;
   } catch (err) {
      return { isError: true, message: err.message };
   }
};

export default Rentings;
