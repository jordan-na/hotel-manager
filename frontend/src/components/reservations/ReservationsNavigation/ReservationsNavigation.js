import { NavLink } from "react-router-dom";
import classes from "./ReservationsNavigation.module.css";
import { useLocation } from "react-router-dom";

const ReservationsNavigation = () => {

   const location = useLocation();

   const getBookingsLinkClasses = ({ isActive }) => {
      return isActive || !location.pathname.includes("rentings") ? `${classes.link} ${classes.active}` : `${classes.link}`;

   };

   const getRentingsLinkClasses = ({ isActive }) => {
      return isActive ? `${classes.link} ${classes.active}` : `${classes.link}`;
   }

   return (
      <nav className={classes.navbar}>
         <NavLink to="/reservations" end className={getBookingsLinkClasses}>Bookings</NavLink>
         <NavLink to="/reservations/rentings" className={getRentingsLinkClasses}>Rentings</NavLink>
      </nav>
   );
};

export default ReservationsNavigation;