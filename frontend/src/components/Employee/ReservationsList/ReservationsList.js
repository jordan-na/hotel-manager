import classes from "./ReservationsList.module.css";
import ReservationItem from "./ReservationItem/ReservationItem";
import ListHeader from "./ListHeader/ListHeader";
import { useState } from "react";
import SelectionStatus from "./SelectionStatus/SelectionStatus";
import bookingServices from "../../../services/booking-services";
import rentingServices from "../../../services/renting-services";

const ReservationsList = ({ items, reservationType }) => {

   const [modifiedItems, setModifiedItems] = useState(items);

   const [selectedItems, setSelectedItems] = useState([]);

   const addSelectedItemHandler = (id) => {
      setSelectedItems((prevState) => {
         return [...prevState, id];
      });
   };

   const removeSelectedItemHandler = (id) => {
      setSelectedItems((prevState) => {
         return prevState.filter((itemId) => itemId !== id);
      });
   };

   const unselectAllItemsHandler = () => {
      setSelectedItems([]);
   }

   const convertBookingsToRentingsHandler = async (bookingIds) => {
      unselectAllItemsHandler();
      await bookingServices.convertBookingsToRentingsByIds(bookingIds);
      setModifiedItems((prevState) => {
         const newItems = [...prevState];
         newItems.forEach((item) => {
            if(bookingIds.includes(item.bookingId)) {
               item.isActive = false;
            }
         });
         return newItems;
      })
   };

   const checkOutRentingsHandler = async (rentingIds) => {
      unselectAllItemsHandler();
      await rentingServices.checkOutRentingsByIds(rentingIds);
      setModifiedItems((prevState) => {
         const newItems = [...prevState];
         newItems.forEach((item) => {
            if (rentingIds.includes(item.rentingId)) {
               item.isActive = false;
            }
         });
         return newItems;
      });
   };

   let listItems;

   if(modifiedItems.length === 0) {
      listItems = <h2 className={classes.header}>You have no {reservationType}s</h2>;
   } else {
      listItems = modifiedItems.map((item) => {
         return (
            <ReservationItem
               key={item.bookingId || item.rentingId}
               item={item}
               isSelected={selectedItems.includes(item.bookingId || item.rentingId)}
               onSelect={addSelectedItemHandler}
               onUnselect={removeSelectedItemHandler}
               reservationType={reservationType}
               onModify={reservationType === "booking" ? convertBookingsToRentingsHandler : checkOutRentingsHandler}
            />
         );
      });
   }

   return (
      <div className={classes["list-container"]}>
         {modifiedItems.length > 0 && <ListHeader />}
         <ul className={classes["reservations-list"]}>{listItems}</ul>
         <SelectionStatus
            selectedItems={selectedItems}
            reservationType={reservationType}
            onModify={reservationType === "booking" ? convertBookingsToRentingsHandler : checkOutRentingsHandler}
            onUnselectAll={unselectAllItemsHandler}
         />
      </div>
   );
};

export default ReservationsList;