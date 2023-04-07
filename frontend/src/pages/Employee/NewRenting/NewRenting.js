import { useEffect, useMemo } from "react";
import classes from "./NewRenting.module.css";
import { Card, Input } from "@nextui-org/react";
import usePageSetter from "../../../hooks/use-page-setter";
import roomServices from "../../../services/room-services";
import { getUserId } from "../../../utils/use-user";
import hotelServices from "../../../services/hotel-services";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Text } from "@nextui-org/react";
import RoomCard from "../../../components/Employee/RoomCard/RoomCard";
import { useState } from "react";
import useInput from "../../../hooks/use-input";
import accountServices from "../../../services/account-services";
import RentingForm from "../../../components/Employee/RentingForm/RentingForm";
import { useSubmit } from "react-router-dom";
import rentingServices from "../../../services/renting-services";
import { formatDateForSQL } from "../../../utils/date-formatter";

const NewRenting = () => {
   const { setEmployeePage } = usePageSetter();

   const { hotelName, rooms } = useLoaderData();

   const [customerId, setCustomerId] = useState(null);

   const { value: emailValue, valueChangeHandler: emailValueChangeHandler } = useInput();

   const { value: creditCardNumber, valueChangeHandler: creditCardNumberChangeHandler } = useInput();

   const { value: creditCardCvv, valueChangeHandler: creditCardCvvChangeHandler } = useInput();

   const { value: creditCardExpirationDate, valueChangeHandler: creditCardExpirationDateChangeHandler } = useInput();

   const submit = useSubmit();

   const [startDate, setStartDate]= useState();
   const [endDate, setEndDate]= useState();

   const [selectedRoom, setSelectedRoom] = useState({
      roomId: rooms[0].roomId,
      price: rooms[0].price
   });

   const navigate = useNavigate();

   const formIsValid =
      emailValue.trim().length > 0 &&
      customerId &&
      selectedRoom &&
      creditCardNumber.trim().length > 0 &&
      creditCardCvv.trim().length > 0 &&
      creditCardExpirationDate.trim().length > 0
      && startDate
      && endDate
      && startDate.trim().length > 0
      && endDate.trim().length > 0;

   const setSelectedRoomHandler = (selectedRoom) => {
      setSelectedRoom(selectedRoom);
   };

   useEffect(() => {
      const getCustomerId = async (emailValue) => {
         const data = await accountServices.getCustomerIdByEmail(emailValue);
         console.log(data.customerId?.customerId);
         setCustomerId(data.customerId?.customerId || null);
      };
      if (emailValue.trim().length > 0) getCustomerId(emailValue);
   }, [emailValue]);

   const emailHelper = useMemo(() => {
      if (!emailValue)
         return {
            text: "",
            color: "",
         };
      const isValid = customerId;
      return {
         text: isValid ? "Customer Found" : "Customer Not Found",
         color: isValid ? "success" : "error",
      };
   }, [emailValue, customerId]);

   const goBackToRentingsHandler = () => {
      navigate("/employee/rentings");
   };

   const formSubmissionHandler = async (evt) => {
      evt.preventDefault();
      if(formIsValid) {
         const formData = new FormData();
         formData.append("customerId", customerId);
         formData.append("roomId", selectedRoom.roomId);
         formData.append("startDate", startDate);
         formData.append("endDate", endDate);
         submit(formData, {method: "post"});
      }
   }

   useEffect(() => {
      setEmployeePage("rentings");
   }, [setEmployeePage]);

   return (
      <Card variant="bordered" className={classes.card}>
         <h2 className={classes.header}>Create Renting at {hotelName}</h2>
         <form className={classes.form} onSubmit={formSubmissionHandler}>
            <Input
               label="Customer Email"
               size="lg"
               type="email"
               value={emailValue}
               onChange={emailValueChangeHandler}
               status={emailHelper.color}
               color={emailHelper.color}
               helperColor={emailHelper.color}
               helperText={emailHelper.text}
            />
            <Input
               label="Credit Card Number"
               size="lg"
               type="number"
               value={creditCardNumber}
               onChange={creditCardNumberChangeHandler}
            />
            <div className={classes["input-group"]}>
               <Input label="cvv" size="lg" type="number" value={creditCardCvv} onChange={creditCardCvvChangeHandler} />
               <Input
                  label="Expiry Date"
                  size="lg"
                  type="date"
                  value={creditCardExpirationDate}
                  onChange={creditCardExpirationDateChangeHandler}
               />
            </div>
            <div>
               <Text size="large">Choose the Room:</Text>
               <div className={classes["room-inputs-container"]} variant="bordered">
                  {rooms.map((room) => (
                     <RoomCard
                        key={room.roomId}
                        room={room}
                        onClick={setSelectedRoomHandler}
                        selected={room.roomId === selectedRoom?.roomId}
                     />
                  ))}
               </div>
            </div>
            <RentingForm
               roomId={selectedRoom?.roomId}
               roomPrice={selectedRoom?.price}
               onStartDateSet={setStartDate}
               onEndDateSet={setEndDate}
            />
            <div className={classes["button-group"]}>
               <Button flat onPress={goBackToRentingsHandler}>
                  Cancel
               </Button>
               <Button type="submit" disabled={!formIsValid}>Submit</Button>
            </div>
         </form>
      </Card>
   );
};

export const loader = async () => {
   try {
      const { hotelName } = await hotelServices.getHotelNameByEmployeeId(getUserId());
      const rooms = await roomServices.getRoomsByEmployeeId(getUserId());
      return { hotelName: hotelName.hotelName, rooms };
   } catch (err) {
      return { isError: true, message: err.message };
   }
};

export const action = async ({ request }) => {
   const formData = await request.formData();
   const customerId = formData.get("customerId");
   const roomId = formData.get("roomId");
   const startDate = formatDateForSQL(formData.get("startDate"));
   const endDate = formatDateForSQL(formData.get("endDate"));
   const rentingData = {
      customerId,
      roomId,
      startDate,
      endDate
   }
   try {
      await rentingServices.createRenting(rentingData);
      return redirect("/employee/rentings");
   } catch (err) {
      return { isError: true, message: err.message };
   }
}

export default NewRenting;
