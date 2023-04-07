import classes from "./ReservationDetails.module.css";
import { Modal, Text, Badge, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { formatDateFromSql } from "../../../utils/date-formatter";

const capacities = ["single", "double", "triple", "quad", "quin"];

const ReservationDetails = ({ reservation, editable, returnPoint, reservationType, onEdit }) => {

   const navigate = useNavigate();

   const closeModalHandler = () => {
      navigate(returnPoint);
   };

   const editReservationHandler = async () => {
      await onEdit(reservation.bookingId || reservation.rentingId);
      closeModalHandler();
   }

   let content = (
         <>
            <div className={classes.info}>
               <label>Hotel:</label>
               <div className={classes["hotel-name"]}>{reservation.hotelName}</div>
            </div>
            <div className={classes.info}>
               <label>Check in:</label>
               <div>{formatDateFromSql(reservation.startDate)}</div>
            </div>
            <div className={classes.info}>
               <label>Check out:</label>
               <div>{formatDateFromSql(reservation.endDate)}</div>
            </div>
            <div className={classes.info}>
               <label>Status:</label>
               <Badge color={reservation.isActive ? "success" : "warning"} variant="flat" css={{ border: "none" }}>
                  {reservation.isActive ? "Active" : "Inactive"}
               </Badge>
            </div>
            <div className={classes.info}>
               <label>Total:</label>
               <div>$ {(reservation.price * reservation.numNights).toFixed(2)}</div>
            </div>
            <div className={classes.info}>
               <label>Nights:</label>
               <div>{reservation.numNights}</div>
            </div>
            <div className={classes.info}>
               <label>Capacity:</label>
               <div>{`${capacities[reservation.capacity - 1]} (${reservation.capacity})`}</div>
            </div>
            <div className={classes.info}>
               <label>Price/night:</label>
               <div>${reservation.price}</div>
            </div>
            <div className={classes.info}>
               <label>Extendable:</label>
               <div>{reservation.isExtendable ? "true" : "false"}</div>
            </div>
            <div className={classes.info}>
               <label>{reservationType === "booking" ? "Booked by" : "Rented by"}:</label>
               <div>{reservation.customerName}</div>
            </div>
            <div className={classes.info}>
               <label>Street:</label>
               <div>{reservation.street}</div>
            </div>
            <div className={classes.info}>
               <label>City:</label>
               <div>{reservation.city}</div>
            </div>
            <div className={classes.info}>
               <label>Postal Code:</label>
               <div>{reservation.postalCode}</div>
            </div>
            <div className={classes.info}>
               <label>Hotel Chain:</label>
               <div>{reservation.hotelChainName}</div>
            </div>
            {editable && (
               <Button className={classes["edit-button"]} onPress={editReservationHandler}>
                  {reservationType === "Booking" ? "Convert to Renting" : "Check Out"}
               </Button>
            )}
         </>
      );

   return (
      <Modal open="true" onClose={closeModalHandler} width="700px" closeButton css={{overflow: "visible"}} blur>
         <Modal.Header>
            <Text size="x-large">{reservationType} Information:</Text>
         </Modal.Header>
         <Modal.Body className={classes.content}>
            {content}
         </Modal.Body>
      </Modal>
   );
};

export default ReservationDetails;