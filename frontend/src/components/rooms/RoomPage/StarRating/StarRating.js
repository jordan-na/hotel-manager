import classes from "./StarRating.module.css"
import { AiFillStar } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { Popover, Button, Text } from "@nextui-org/react";

const StarRating = ({rating}) => {

   const stars = [];

   for(let i = 0; i < rating; i++) {
      stars.push(<AiFillStar key={i} color="#fcdb03" size="2.5rem"/>);
   }

   return (
      <div className={classes["star-rating"]}>
         {stars}
         <Popover isBordered>
            <Popover.Trigger>
               <button className={classes["help-button"]}>
                  <BiHelpCircle size="1.6rem" color="#777"/>
               </button>
            </Popover.Trigger>
            <Popover.Content>
               <Text className={classes["help-text"]}>This is a {rating} star hotel</Text>
            </Popover.Content>
         </Popover>
      </div>
   );
};

export default StarRating;