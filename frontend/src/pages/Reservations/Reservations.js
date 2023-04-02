import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../store/page/page-slice";
import { Outlet, useNavigate } from "react-router-dom";

const Reservations = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(setPage("reservations"));
   }, [dispatch]);

   useEffect(() => {
      navigate("bookings")
   }, [navigate]);

   return (
      <>
         <h1>Reservations</h1>
         <Outlet />
      </>
   );
};

export default Reservations;
