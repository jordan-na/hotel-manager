import classes from "./CapacityOfRooms.module.css"
import { Button } from "@nextui-org/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import usePageSetter from "../../../../hooks/use-page-setter";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import roomServices from "../../../../services/room-services";

const CapacityOfRooms = () => {

   const data = useLoaderData();

   console.log(data);

   const { setEmployeePage } = usePageSetter();

   const navigate = useNavigate();

   const goBackToHotelsHandler = () => {
      navigate("/employee/views/hotels");
   };

   const listItems = data.map((item) => {
      return (
         <li key={item.roomId} className={classes.item}>
            <div>{item.roomId}</div>
            <div>{item.capacity}</div>
         </li>
      );
   });

   useEffect(() => {
      setEmployeePage("views");
   }, [setEmployeePage]);

   return (
      <>
         <Button
            className={classes["back-btn"]}
            icon={<AiOutlineArrowLeft size="1.4rem" />}
            onPress={goBackToHotelsHandler}
         >
            Go Back
         </Button>
         <div className={classes.table}>
            <div className={classes.columns}>
               <div>roomId</div>
               <div>capacity</div>
            </div>
            <ul className={classes.list}>{listItems}</ul>
         </div>
      </>
   );
};

export const loader = async ({ params }) => {
   try {
      const data = await roomServices.getCapacityOfRoomsByHotelId(params.hotelId);
      return data;
   } catch (err) {
      return { isError: true, message: err.message }
   }
};

export default CapacityOfRooms;