import classes from "./Hotels.module.css";
import { Button } from "@nextui-org/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLoaderData, useNavigate } from "react-router-dom";
import hotelServices from "../../../../services/hotel-services";
import usePageSetter from "../../../../hooks/use-page-setter";
import { useEffect } from "react";


const Hotels = () => {

   const hotels = useLoaderData();

   const navigate = useNavigate();

   const { setEmployeePage } = usePageSetter();

   useEffect(() => {
      setEmployeePage("views");
   }, [setEmployeePage]);

   const goBackToViewsHandler = () => {
      navigate("/employee/views");
   }

   const hotelItems = hotels.map((hotel) => {
      return (
         <li key={hotel.hotelId}>
            <Button size="lg" onPress={() => navigate(hotel.hotelId)}>{hotel.name}</Button>
         </li>
      );
   });
   return (
      <>
         <Button
            className={classes["back-btn"]}
            icon={<AiOutlineArrowLeft size="1.4rem" />}
            onPress={goBackToViewsHandler}
         >
            Go Back
         </Button>
         <ul className={classes.hotels}>
            {hotelItems}
         </ul>
      </>
   );
};

export const loader = async () => {
   try {
      const hotels = await hotelServices.getAllHotelNames();
      return hotels;
   } catch(err) {
      return { isError: true, message: err.message }
   }
};

export default Hotels;