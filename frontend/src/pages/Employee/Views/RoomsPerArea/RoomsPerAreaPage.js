import classes from "./RoomsPerArea.module.css";
import roomServices from "../../../../services/room-services";
import { useLoaderData } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import usePageSetter from "../../../../hooks/use-page-setter";
import { useEffect } from "react";

const RoomsPerArea = () => {

   const data = useLoaderData();

   const { setEmployeePage } = usePageSetter();

   useEffect(() => {
      setEmployeePage("views");
   }, [setEmployeePage]);

   const navigate = useNavigate();

   const goBackToViewsHandler = () => {
      navigate("/employee/views");
   };

   const listItems = data.map((item) => {
      return (
         <li key={item.area} className={classes.item}>
            <div>{item.area}</div>
            <div>{item.availableRooms}</div>
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
         <div className={classes.table}>
            <div className={classes.columns}>
               <div>Area</div>
               <div>Available Rooms</div>
            </div>
            <ul className={classes.list}>{listItems}</ul>
         </div>
      </>
   );
};

export const loader = async () => {
   try {
      const data = await roomServices.getNumberOfRoomsPerArea();
      return data;
   } catch (err) {
      return { isError: true, message: err.message }
   }
};

export default RoomsPerArea;