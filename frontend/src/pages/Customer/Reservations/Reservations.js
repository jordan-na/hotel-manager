import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import classes from "./Reservations.module.css"
import ReservationsNavigation from "../../../components/reservations/ReservationsNavigation/ReservationsNavigation";
import usePageSetter from "../../../hooks/use-page-setter";

const Reservations = () => {
   const { setCustomerPage } = usePageSetter();

   useEffect(() => {
      setCustomerPage("reservations");
   }, [setCustomerPage]);

   return (
      <div className={classes["reservations-page"]}>
         <ReservationsNavigation />
         <div className={classes["list-container"]}>
            <Outlet />
         </div>
      </div>
   );
};

export default Reservations;
