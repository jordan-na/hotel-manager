import classes from "./ReservationItem.module.css";
import { formatDateFromSql } from "../../../../utils/date-formatter";
import { IoMdCheckmark } from "react-icons/io";
import KebabMenu from "../../../UI/KebabMenu/KebabMenu";
import { BsFullscreen } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { Badge } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const ReservationItem = ({ item, isSelected, onSelect, onUnselect, reservationType, onModify}) => {

   const navigate = useNavigate();

   const toggleSelectedHandler = (evt) => {
      evt.stopPropagation();
      if(isSelected) {
         onUnselect(item.bookingId || item.rentingId);
      } else {
         onSelect(item.bookingId || item.rentingId);
      }
   };

   const modifyItemHandler = () => {
      onModify([item.bookingId || item.rentingId]);
      onUnselect(item.bookingId || item.rentingId);
   };

   const navigateToModalHandler = () => {
      navigate(item.bookingId || item.rentingId);
   };

   const menuItems = [
      {
         name: "View",
         onClick: navigateToModalHandler,
         icon: <BsFullscreen size="1rem" />,
      },

   ];

   if(item.isActive) {
      menuItems.push({
         name: reservationType === "booking" ? "Convert" : "Check Out",
         onClick: modifyItemHandler,
         icon: reservationType === "booking" ? <AiOutlineArrowRight size="1rem" /> : <IoMdDoneAll size="1rem" />,
      });
   }

   return (
      <li className={classes.item} onClick={navigateToModalHandler}>
         <button className={`${classes.checkbox} ${isSelected ? classes.checked : ""} ${item.isActive ? "": classes.remove }`} onClick={toggleSelectedHandler}>
            {isSelected && <IoMdCheckmark size="1.5rem" color="#fff" />}
         </button>
         <div className={classes["hotel-name"]}>{item.hotelName}</div>
         <div>{formatDateFromSql(item.startDate)}</div>
         <div>{formatDateFromSql(item.endDate)}</div>
         <Badge color={item.isActive ? "success" : "warning"} variant="flat" css={{border: "none"}}>
            {item.isActive ? "Active" : "Inactive"}
         </Badge>
         <div>${(item.roomPrice * item.numNights).toFixed(2)}</div>
         <div>{item.numNights}</div>
         <KebabMenu
            className={classes.kebab}
            menu={menuItems}
         />
      </li>
   );
};

export default ReservationItem;