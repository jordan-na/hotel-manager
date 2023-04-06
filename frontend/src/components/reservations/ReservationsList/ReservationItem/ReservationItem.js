import classes from "./ReservationItem.module.css";
import { formatDateFromSql } from "../../../../utils/date-formatter";
import { IoMdCheckmark } from "react-icons/io";
import KebabMenu from "../../../UI/KebabMenu/KebabMenu";
import { MdEdit } from "react-icons/md";
import { BsFullscreen } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { Badge } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const ReservationItem = ({ item, isSelected, onSelect, onUnselect, onDelete, isEditable, index }) => {

   const navigate = useNavigate();

   const toggleSelectedHandler = (evt) => {
      evt.stopPropagation();
      if(isSelected) {
         onUnselect(item.bookingId || item.rentingId);
      } else {
         onSelect(item.bookingId || item.rentingId);
      }
   };

   const deleteItemHandler = () => {
      onDelete([item.bookingId || item.rentingId]);
      onUnselect(item.bookingId || item.rentingId);
   };

   const navigateToModalHandler = () => {
      navigate(item.bookingId || item.rentingId);
   };

   const showModalInEditModeHandler = () => {
      navigate({
         pathname: item.bookingId || item.rentingId,
         search: "?edit=true",
      });
   };

   const menuItems = [
      {
         name: "View",
         onClick: navigateToModalHandler,
         icon: <BsFullscreen size="1rem" />,
      },
      {
         name: "Delete",
         onClick: deleteItemHandler,
         icon: <BsFillTrashFill size="1.1rem" />,
      }
   ];

   if(item.isActive) {
      menuItems.push({
         name: "Edit",
         onClick: showModalInEditModeHandler,
         icon: <MdEdit size="1.1rem" />,
      });
   }

   return (
      <li className={classes.item} onClick={navigateToModalHandler}>
         {isEditable ? <button className={`${classes.checkbox} ${isSelected ? classes.checked : ""}`} onClick={toggleSelectedHandler}>
            {isSelected && <IoMdCheckmark size="1.5rem" color="#fff" />}
         </button> : <div>{index}.</div>}
         <div className={classes["hotel-name"]}>{item.hotelName}</div>
         <div>{formatDateFromSql(item.startDate)}</div>
         <div>{formatDateFromSql(item.endDate)}</div>
         <Badge color={item.isActive ? "success" : "warning"} variant="flat" css={{border: "none"}}>
            {item.isActive ? "Active" : "Inactive"}
         </Badge>
         <div>${(item.roomPrice * item.numNights).toFixed(2)}</div>
         <div>{item.numNights}</div>
         {isEditable && <KebabMenu
            className={classes.kebab}
            menu={menuItems}
         />}
      </li>
   );
};

export default ReservationItem;