import classes from "./RentingForm.module.css";
import { Button, Card, Loading } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { validateDate } from "../../../utils/validatation";
import useInput from "../../../hooks/use-input";
import useOutsideClick from "../../../hooks/use-outside-click";
import CalendarInput from "../../UI/Calendar/CalendarInput";
import { AiOutlineCloseCircle } from "react-icons/ai";
import React from "react";
import roomServices from "../../../services/room-services";
import { redirect, useSubmit, useNavigation } from "react-router-dom";
import rentingServices from "../../../services/renting-services";
import { getUserId } from "../../../utils/use-user";

const RentingForm = ({ roomId, roomPrice, onStartDateSet, onEndDateSet }) => {
   const [totalPriceData, setTotalPriceData] = useState();

   const [checkingIfDateIsAvailable, setCheckingIfDateIsAvailable] = useState(false);
   const [dateIsAvailable, setDateIsAvailable] = useState();

   const [formIsActive, setFormIsActive] = useState(false);

   const [selectedInput, setSelectedInput] = useState();

   const [checkInDate, setCheckInDate] = useState(new Date());
   const [checkOutDate, setCheckOutDate] = useState(new Date());

   const submit = useSubmit();
   const navigation = useNavigation();

   const submitting = navigation.state === "submitting";

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
            const data = await roomServices.getRoomAvailability(roomId, checkInValue, checkOutValue);
            setDateIsAvailable(data.roomAvailable);
            setCheckingIfDateIsAvailable(false);
            if (data.roomAvailable) {
               onStartDateSet(checkInValue);
               onEndDateSet(checkOutValue);
               setTotalPriceData({
                  numNights: data.numNights,
                  price: data.numNights * roomPrice,
               });
            }
         }
      })();

   }, [checkInValue, checkOutValue, formIsValid, formIsFull, roomId, roomPrice, onStartDateSet, onEndDateSet]);

   const setFormIsActiveHandler = () => {
      setFormIsActive(true);
   };

   const setFormIsInactiveHandler = () => {
      setFormIsActive(false);
   };

   const resetCheckInHandler = () => {
      resetCheckInInput();
      onStartDateSet("");
   };

   const resetCheckOutHandler = () => {
      resetCheckOutInput();
      onEndDateSet("");
   };

   const datePickerRef = useRef();
   useOutsideClick(datePickerRef, setFormIsInactiveHandler);

   const setSelectedInputHandler = (id) => {
      setSelectedInput(id);
   };

   let headerContent;

   if (submitting) {
      headerContent = "Renting room...";
   } else if (formIsFull && formIsValid && dateIsAvailable) {
      headerContent = `Price for ${totalPriceData.numNights} night${
         totalPriceData.numNights > 1 ? "s" : ""
      }: $${totalPriceData.price.toFixed(2)}`;
   } else if (formIsFull && formIsValid && !dateIsAvailable) {
      headerContent = "Dates are not available";
   } else {
      headerContent = "Add dates for prices";
   }

   return (
      <div className={classes.card}>
         <div className={classes.form}>
            <h2>{headerContent}</h2>
            <div
               className={`${classes["date-pickers"]} ${formIsActive ? classes.active : ""}`}
               onClick={setFormIsActiveHandler}
               ref={datePickerRef}
            >
               <div
                  className={`${classes["input-container"]} ${checkInIsSelected ? classes.active : ""}`}
                  onClick={setSelectedInputHandler.bind(null, "check-in-mini")}
               >
                  <label htmlFor="check-in-mini">Start Date</label>
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
                  <label htmlFor="check-out-mini">End Date</label>
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
         </div>
      </div>
   );
};

export default RentingForm;
