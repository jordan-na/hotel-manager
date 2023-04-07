import { Card } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import classes from "./RoomCard.module.css";
import { FaHotel } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";

const sizes = {
   1: "Single",
   2: "Double",
   3: "Triple",
   4: "Quad",
   5: "Quin",
};

const RoomCard = ({ room, onClick, selected }) => {
   const clickHandler = () => {
      onClick({
         roomId: room.roomId,
         price: room.price,
      });
   };

   return (
      <Card
         onClick={clickHandler}
         isPressable
         isHoverable
         disableRipple
         variant="bordered"
         className={`${classes.card} ${selected ? classes.selected : ""}`}
      >
         <Card.Body css={{ p: 0 }}>
            <Card.Image
               src={room.image}
               objectFit="cover"
               width="100%"
               height="11.5rem"
               css={{ objectPosition: "center" }}
               alt={room.name}
            />
            <div className={classes.content}>
               <div className={classes["icon-text"]}>
                  <BsFillPeopleFill />
                  <Text>{`${sizes[room.capacity]} (${room.capacity})`}</Text>
               </div>
            </div>
            <Text size="large" className={classes.price} b>
               {`$ ${room.price} night`}
            </Text>
         </Card.Body>
      </Card>
   );
};
export default RoomCard;
