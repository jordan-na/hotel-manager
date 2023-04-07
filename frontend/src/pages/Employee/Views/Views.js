import usePageSetter from "../../../hooks/use-page-setter";
import { useEffect } from "react";
import classes from "./Views.module.css"
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Views = () => {

   const { setEmployeePage } = usePageSetter();

   const navigate = useNavigate();

   const navigateToViewRoomsPerArea = () => {
      navigate("rooms-per-area");
   };

   const navigateToViewHotels = () => {
      navigate("hotels");
   }

   useEffect(() => {
      setEmployeePage("views");
   }, [setEmployeePage]);

   return (
      <div className={classes["button-group"]}>
         <Button size="lg" onPress={navigateToViewRoomsPerArea}>View Number of Rooms Per Area</Button>
         <Button size="lg" onPress={navigateToViewHotels}>Capacity of all Rooms For a Specific Hotel</Button>
      </div>
   );
};

export default Views;