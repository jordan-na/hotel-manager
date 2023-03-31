import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../store/page/page-slice";

const Bookings = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setPage("bookings"));
   }, [dispatch]);

   return <h1>Home Page</h1>;
};

export default Bookings;
