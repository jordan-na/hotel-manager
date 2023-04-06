import classes from "./EditDatesForm.module.css";
import { Button, Loading, Text } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { validateDate } from "../../../../utils/validatation";
import useInput from "../../../../hooks/use-input";
import useOutsideClick from "../../../../hooks/use-outside-click";
import CalendarInput from "../../../UI/Calendar/CalendarInput";
import { AiOutlineCloseCircle } from "react-icons/ai";
import React from "react";
import roomServices from "../../../../services/room-services";
import { redirect, useSubmit, useNavigation } from "react-router-dom";
import bookingServices from "../../../../services/booking-services";
import { formatDateForSQL, getTomorrow } from "../../../../utils/date-formatter";

const EditDatesForm = ({ roomId, bookingId, onCancel, roomPrice, initialCheckIn, initialCheckOut }) => {
   const [totalPriceData, setTotalPriceData] = useState();

   const [checkingIfDateIsAvailable, setCheckingIfDateIsAvailable] = useState(false);
   const [dateIsAvailable, setDateIsAvailable] = useState();

   const [formIsActive, setFormIsActive] = useState(false);

   const [selectedInput, setSelectedInput] = useState();



   // console.log(formatDateForSQL(initialCheckIn), formatDateForSQL(initialCheckOut));

   const [checkInDate, setCheckInDate] = useState(getTomorrow(new Date(formatDateForSQL(initialCheckIn))));
   const [checkOutDate, setCheckOutDate] = useState(getTomorrow(new Date(formatDateForSQL(initialCheckOut))));

   const submit = useSubmit();
   const navigation = useNavigation();

   const submitting = navigation.state === "submitting";

   const {
      value: checkInValue,
      isValid: checkInIsValid,
      setValue: setCheckInValue,
      valueChangeHandler: checkInValueChangeHandler,
      reset: resetCheckInInput,
   } = useInput(validateDate, initialCheckIn);

   const {
      value: checkOutValue,
      isValid: checkOutIsValid,
      setValue: setCheckOutValue,
      valueChangeHandler: checkOutValueChangeHandler,
      reset: resetCheckOutInput,
   } = useInput(validateDate, initialCheckOut);

   const formIsValid = checkInIsValid && checkOutIsValid;
   const formIsFull = checkInValue.trim().length !== 0 && checkOutValue.trim().length !== 0;

   const checkInIsSelected = selectedInput === "check-in-mini" && formIsActive;
   const checkOutIsSelected = selectedInput === "check-out-mini" && formIsActive;

   const checkOutDateData = checkOutValue.split("/");
   const checkInMaxDate =
      checkOutValue.trim().length !== 0 && checkOutIsValid
         ? new Date(checkOutDateData[2], parseInt(checkOutDateData[1]) - 1, parseInt(checkOutDateData[0]) - 1)
         : null;
   const checkInDateData = checkInValue.split("/");
   const today = new Date();
   const tomorrow = new Date(today);
   tomorrow.setDate(tomorrow.getDate() + 1);
   const checkOutMinDate =
      checkInValue.trim().length !== 0 && checkInIsValid
         ? new Date(checkInDateData[2], parseInt(checkInDateData[1]) - 1, parseInt(checkInDateData[0]) + 1)
         : tomorrow;

   useEffect(() => {
      (async () => {
         if (formIsValid && formIsFull) {
            setCheckingIfDateIsAvailable(true);
            const data = await roomServices.getRoomAvailabilityToUpdate(roomId, bookingId, checkInValue, checkOutValue);
            setDateIsAvailable(data.roomAvailable);
            setCheckingIfDateIsAvailable(false);
            if (data.roomAvailable) {
               setTotalPriceData({
                  numNights: data.numNights,
                  price: data.numNights * roomPrice,
               });
            }
         }
      })();
   }, [checkInValue, checkOutValue, formIsValid, formIsFull, roomId, bookingId, roomPrice]);

   const setFormIsActiveHandler = () => {
      setFormIsActive(true);
   };

   const setFormIsInactiveHandler = () => {
      setFormIsActive(false);
   };

   const resetCheckInHandler = () => {
      resetCheckInInput();
   };

   const resetCheckOutHandler = () => {
      resetCheckOutInput();
   };

   const datePickerRef = useRef();
   useOutsideClick(datePickerRef, setFormIsInactiveHandler);

   const setSelectedInputHandler = (id) => {
      setSelectedInput(id);
   };

   const formSubmissionHandler = (evt) => {
      evt.preventDefault();
      if (formIsValid) {
         if (formIsFull && dateIsAvailable) {
            submit(evt.currentTarget, { method: "post" });
         } else {
            setFormIsActive(true);
            if (checkInValue.trim().length === 0) {
               setSelectedInput("check-in-mini");
            } else {
               setSelectedInput("check-out-mini");
            }
         }
      }
   };

   let headerContent;

   if (submitting) {
      headerContent = "Updating Booking...";
   } else if (formIsFull && formIsValid && dateIsAvailable) {
      headerContent = `Price for ${totalPriceData.numNights} night${
         totalPriceData.numNights > 1 ? "s" : ""
      }: $${totalPriceData.price.toFixed(2)}`;
   } else if (formIsFull && formIsValid && !dateIsAvailable) {
      headerContent = "Dates are not available";
   } else {
      headerContent = "Edit Check In & Check Out:";
   }

   let buttonContent;

   if (checkingIfDateIsAvailable || submitting) {
      buttonContent = <Loading color="white" />;
   } else if (!checkingIfDateIsAvailable && !dateIsAvailable && formIsFull && formIsValid) {
      buttonContent = "Add different dates";
   } else if (formIsFull && formIsValid && dateIsAvailable) {
      buttonContent = "Update Booking";
   } else {
      buttonContent = "Check availability";
   }

   return (
      <form className={classes.form} onSubmit={formSubmissionHandler}>
         <Text size="x-large" className={classes.header}>
            {headerContent}
         </Text>
         <div
            className={`${classes["date-pickers"]} ${formIsActive ? classes.active : ""}`}
            onClick={setFormIsActiveHandler}
            ref={datePickerRef}
         >
            <div
               className={`${classes["input-container"]} ${checkInIsSelected ? classes.active : ""}`}
               onClick={setSelectedInputHandler.bind(null, "check-in-mini")}
            >
               <label htmlFor="check-in-mini">Check in</label>
               <input
                  id="check-in-mini"
                  type="text"
                  placeholder="Add date"
                  value={checkInValue}
                  onChange={checkInValueChangeHandler}
                  className={checkInIsValid ? "" : classes.invalid}
                  name="check-in"
                  readOnly
               />
               <button className={classes["clear-button"]} onClick={resetCheckInHandler} type="button">
                  <AiOutlineCloseCircle size="1.3rem" />
               </button>
               <CalendarInput
                  show={checkInIsSelected}
                  width="150%"
                  padding="0.7rem"
                  setValue={setCheckInValue}
                  setDate={setCheckInDate}
                  calendar={{
                     value: checkInDate,
                     minDate: new Date(),
                     maxDate: checkInMaxDate,
                  }}
               />
            </div>
            <div className={classes.seperator}></div>
            <div
               className={`${classes["input-container"]} ${checkOutIsSelected ? classes.active : ""}`}
               onClick={setSelectedInputHandler.bind(null, "check-out-mini")}
            >
               <label htmlFor="check-out-mini">Check out</label>
               <input
                  id="check-out-mini"
                  type="text"
                  placeholder="Add date"
                  value={checkOutValue}
                  onChange={checkOutValueChangeHandler}
                  className={checkOutIsValid ? "" : classes.invalid}
                  name="check-out"
                  readOnly
               />
               <button className={classes["clear-button"]} onClick={resetCheckOutHandler} type="button">
                  <AiOutlineCloseCircle size="1.3rem" />
               </button>
               <CalendarInput
                  show={checkOutIsSelected}
                  width="150%"
                  padding="0.7rem"
                  setValue={setCheckOutValue}
                  setDate={setCheckOutDate}
                  calendar={{
                     onChange: setCheckOutDate,
                     value: checkOutDate,
                     minDate: checkOutMinDate,
                  }}
               />
            </div>
         </div>
         <div className={classes["button-container"]}>
            <Button
               className={`${classes["cancel-button"]} ${
                  formIsActive || checkingIfDateIsAvailable || submitting ? classes["no-click"] : ""
               }`}
               color="error"
               onPress={onCancel}
            >
               Cancel
            </Button>
            <Button
               className={`${classes.button} ${formIsValid ? "" : classes.invalid}
                     ${formIsActive || checkingIfDateIsAvailable || submitting ? classes["no-click"] : ""}`}
               type="submit"
            >
               {buttonContent}
            </Button>
         </div>
      </form>
   );
};

export const action = async ({ request, params }) => {
   const data = await request.formData();
   const bookingId = params.bookingId;
   const bookingData = {
      startDate: data.get("check-in"),
      endDate: data.get("check-out")
   };
   try {
      await bookingServices.updateBookingById(bookingId, bookingData);
      return redirect("/customer/reservations");
   } catch (err) {
      return { isError: true, message: err.message };
   }
};

export default EditDatesForm;