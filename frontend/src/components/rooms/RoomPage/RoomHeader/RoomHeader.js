import { Text, Button } from "@nextui-org/react";
import classes from "./RoomHeader.module.css";
import StarRating from "../StarRating/StarRating";

const RoomHeader = ({hotelName, hotelCategory, roomPrice, onBook}) => {
   return (
      <div className={classes.header}>
         <Text b size="3rem">
            {hotelName}
         </Text>
         <Button className={classes["book-button"]} onPress={onBook} >Book Now</Button>
         <StarRating rating={hotelCategory} />
         <h2 className={classes.price}>${roomPrice} night</h2>
      </div>
   );
};

export default RoomHeader;