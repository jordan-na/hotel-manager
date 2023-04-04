import { Button } from "@nextui-org/react";
import classes from "./ButtonGroup.module.css";
import { useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa"
import { FaListAlt } from "react-icons/fa";

const ButtonGroup = () => {

   const navigate = useNavigate();

   const goToHotelsPageHandler = () => {
      navigate("rooms");
   };

   const goToReservationsPageHandler = () => {
      navigate("reservations");
   };

   return (
      <div className={classes["button-group"]}>
         <Button onPress={goToHotelsPageHandler} size="lg" icon={<FaHotel />} className={classes.button}>
            View Rooms
         </Button>
         <Button onPress={goToReservationsPageHandler} size="lg" icon={<FaListAlt />} className={classes.button}>
            View Reservations
         </Button>
      </div>
   );
};

export default ButtonGroup;