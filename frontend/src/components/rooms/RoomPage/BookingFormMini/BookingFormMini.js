import classes from "./BookingFormMini.module.css";
import { Button, Card } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { validateDate } from "../../../../utils/validatation";
import useInput from "../../../../hooks/use-input";
import useOutsideClick from "../../../../hooks/use-outside-click";
import CalendarInput from "../../../UI/Calendar/CalendarInput";
import { AiOutlineCloseCircle } from "react-icons/ai";
import React from "react";
import { useNavigation } from "react-router-dom";

const BookingFormMini = React.forwardRef((props, ref) => {

   const [totalPrice, setTotalPrice] = useState();

   const [dateIsAvailable, setDateIsAvailable] = useState();

   const [formIsActive, setFormIsActive] = useState(false);

   const [selectedInput, setSelectedInput] = useState();

   const [checkInDate, setCheckInDate] = useState(new Date());
   const [checkOutDate, setCheckOutDate] = useState(new Date());

   const navigation = useNavigation();

   const {
      value: checkInValue,
      isValid: checkInIsValid,
      setValue: setCheckInValue,
      valueChangeHandler: checkInValueChangeHandler,
      reset: resetCheckInInput,
   } = useInput(validateDate);

   const {
      value: checkOutValue,
      isValid: checkOutIsValid,
      setValue: setCheckOutValue,
      valueChangeHandler: checkOutValueChangeHandler,
      reset: resetCheckOutInput,
   } = useInput(validateDate);

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
   const checkOutMinDate =
      checkInValue.trim().length !== 0 && checkInIsValid
         ? new Date(checkInDateData[2], parseInt(checkInDateData[1]) - 1, parseInt(checkInDateData[0]) + 1)
         : new Date();

   useEffect(() => {
      if(formIsValid && formIsFull) {
         // TODO: Check if dates are available by sendnig a request to the backend
         // if they are available, set the total price and enable button
         // if they are not available, disable button and show error message (replace title with error message)
      }
   }, [checkInValue, checkOutValue, formIsValid, formIsFull]);

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
      if(formIsValid) {
         if (formIsFull) {
            // TODO: Create an action to send a request to the backend to book the room, then redirect to the bookings page
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

   return (
      <Card variant="bordered" className={classes.card} ref={ref}>
         <form className={classes.form} onSubmit={formSubmissionHandler}>
            <h2>{totalPrice ? "" : "Add dates for prices"}</h2>
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
                     readOnly
                  />
                  <button className={classes["clear-button"]} onClick={resetCheckInHandler} type="button" >
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
                        maxDate: checkInMaxDate
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
                     readOnly
                  />
                  <button className={classes["clear-button"]} onClick={resetCheckOutHandler} type="button" >
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
                        minDate: checkOutMinDate
                     }}
                  />
               </div>
            </div>
            <Button
               className={`${classes.button} ${formIsValid ? "" : classes.invalid} ${
                  formIsActive ? classes["no-click"] : ""
               }`}
               type="submit"
            >
               {formIsFull ? "Book Now" : "Check Availability"}
            </Button>
         </form>
      </Card>
   );
});

export default BookingFormMini;
