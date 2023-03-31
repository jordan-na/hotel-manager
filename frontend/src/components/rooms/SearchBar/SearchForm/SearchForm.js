import { useEffect, useState, useRef } from "react";
import classes from "./SearchForm.module.css";
import SearchFormInput from "./SearchFormInput/SearchFormInput";
import { GoSearch } from "react-icons/go";
import { GoX } from "react-icons/go";
import useInput from "../../../../hooks/use-input";
import { Form, useSubmit } from "react-router-dom";
import { validateLocation, validateDate, validateCapacity, validateHotelChain,
   validateCategory, validateNumberOfRooms, validatePrice } from "../../../../utils/validatation";

const SearchForm = ({ isActive, isInView, onClick, unFocus, remove }) => {

   const [selectedInput, setSelectedInput] = useState(null);

   const submit = useSubmit();

   const {
      value: locationValue,
      isValid: locationIsValid,
      setValue: setLocationValue,
      valueChangeHandler: locationValueChangeHandler,
      reset: resetLocationInput,
   } = useInput(validateLocation);

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

   const {
      value: capacityValue,
      isValid: capacityIsValid,
      setValue: setCapacityValue,
      valueChangeHandler: capacityValueChangeHandler,
      reset: resetCapacityInput,
   } = useInput(validateCapacity);

   const {
      value: hotelChainValue,
      isValid: hotelChainIsValid,
      setValue: setHotelChainValue,
      valueChangeHandler: hotelChainValueChangeHandler,
      reset: resetHotelChainInput,
   } = useInput(validateHotelChain);

   const {
      value: categoryValue,
      isValid: categoryIsValid,
      setValue: setCategoryValue,
      valueChangeHandler: categoryValueChangeHandler,
      reset: resetCategoryInput,
   } = useInput(validateCategory);

   const {
      value: numberOfRoomsValue,
      isValid: numberOfRoomsIsValid,
      setValue: setNumberOfRoomsValue,
      valueChangeHandler: numberOfRoomsValueChangeHandler,
      reset: resetNumberOfRoomsInput,
   } = useInput(validateNumberOfRooms);

   const {
      value: priceValue,
      isValid: priceIsValid,
      setValue: setPriceValue,
      valueChangeHandler: priceValueChangeHandler,
      reset: resetPriceInput,
   } = useInput(validatePrice);

   const formIsEmpty = locationValue.trim().length === 0 &&
         checkInValue.trim().length === 0 &&
         checkOutValue.trim().length === 0 &&
         capacityValue.trim().length === 0 &&
         hotelChainValue.trim().length === 0 &&
         categoryValue.trim().length === 0 &&
         numberOfRoomsValue.trim().length === 0 &&
         priceValue.trim().length === 0;

   const formIsValid =
      locationIsValid &&
      checkInIsValid &&
      checkOutIsValid &&
      capacityIsValid &&
      hotelChainIsValid &&
      categoryIsValid &&
      numberOfRoomsIsValid &&
      priceIsValid &&
      !formIsEmpty;

   const setSelectedInputHandler = (inputId) => {
      setSelectedInput(inputId);
   };

   const resetFormHandler = () => {
      resetLocationInput();
      resetCheckInInput();
      resetCheckOutInput();
      resetCapacityInput();
      resetHotelChainInput();
      resetCategoryInput();
      resetNumberOfRoomsInput();
      resetPriceInput();
      setSelectedInput(null);
   };

   const clearFormHandler = (evt) => {
      evt.stopPropagation();
      resetFormHandler();
      unFocus();
   }

   const formSubmissionHandler = (evt) => {
      if(!formIsValid) return;
      submit(null, {action: "/rooms", method: "get"});
      remove();
   };

   useEffect(() => {
      if(!isInView) {
         resetFormHandler();
      }
   }, [isInView]);

   return (
      <Form onSubmit={formSubmissionHandler} onClick={onClick} className={`${classes["search-form"]} ${isActive ? classes.active : ""}`}>
         <SearchFormInput
            type="text"
            label="City"
            id="city"
            placeholder="Search"
            value={locationValue}
            width="10rem"
            selected={isActive && selectedInput === "city"}
            formIsActive={isActive}
            setValue={setLocationValue}
            onFocus={setSelectedInputHandler}
            onChange={locationValueChangeHandler}
            isValid={locationIsValid}
         />
         <SearchFormInput
            type="date"
            label="Check in"
            id="check-in"
            placeholder="Add"
            value={checkInValue}
            width="8.1rem"
            selected={isActive && selectedInput === "check-in"}
            formIsActive={isActive}
            setValue={setCheckInValue}
            onFocus={setSelectedInputHandler}
            onChange={checkInValueChangeHandler}
            isValid={checkInIsValid}
            maxDate={checkOutValue}
         />
         <SearchFormInput
            type="date"
            label="Check out"
            id="check-out"
            placeholder="Add"
            value={checkOutValue}
            width="8.1rem"
            selected={isActive && selectedInput === "check-out"}
            formIsActive={isActive}
            setValue={setCheckOutValue}
            onFocus={setSelectedInputHandler}
            onChange={checkOutValueChangeHandler}
            isValid={checkOutIsValid}
            minDate={checkInValue}
         />
         <SearchFormInput
            type="dropdown"
            label="Capacity"
            id="capacity"
            placeholder="Select"
            value={capacityValue}
            width="8rem"
            selected={isActive && selectedInput === "capacity"}
            formIsActive={isActive}
            setValue={setCapacityValue}
            onFocus={setSelectedInputHandler}
            onChange={capacityValueChangeHandler}
            isValid={capacityIsValid}
            options={["single", "double", "triple", "quad", "quin"]}
         />
         <SearchFormInput
            type="text"
            label="Hotel Chain"
            id="hotel-chain"
            placeholder="Search"
            value={hotelChainValue}
            width="10rem"
            selected={isActive && selectedInput === "hotel-chain"}
            formIsActive={isActive}
            setValue={setHotelChainValue}
            onFocus={setSelectedInputHandler}
            onChange={hotelChainValueChangeHandler}
            isValid={hotelChainIsValid}
         />
         <SearchFormInput
            type="dropdown"
            label="Category"
            id="category"
            placeholder="Select"
            value={categoryValue}
            width="8rem"
            selected={isActive && selectedInput === "category"}
            formIsActive={isActive}
            setValue={setCategoryValue}
            onFocus={setSelectedInputHandler}
            onChange={categoryValueChangeHandler}
            isValid={categoryIsValid}
            options={["1 star", "2 star", "3 star", "4 star", "5 star"]}
         />
         <SearchFormInput
            type="number"
            label="# of rooms"
            id="number-of-rooms"
            placeholder="Enter"
            value={numberOfRoomsValue}
            width="7.7rem"
            selected={isActive && selectedInput === "number-of-rooms"}
            formIsActive={isActive}
            setValue={setNumberOfRoomsValue}
            onFocus={setSelectedInputHandler}
            onChange={numberOfRoomsValueChangeHandler}
            isValid={numberOfRoomsIsValid}
         />
         <SearchFormInput
            type="number"
            label="Price ($)"
            id="price"
            placeholder="Enter"
            value={priceValue}
            width="7.5rem"
            selected={isActive && selectedInput === "price"}
            noBorder
            formIsActive={isActive}
            setValue={setPriceValue}
            onFocus={setSelectedInputHandler}
            onChange={priceValueChangeHandler}
            isValid={priceIsValid}
         />
         <button
            className={`${classes.button} ${classes["clear-button"]} ${formIsEmpty ? classes.disable : ""}`}
            onClick={clearFormHandler}
            type="button"
         >
            {<GoX className={classes["clear-icon"]} />}
         </button>
         <button
            className={`${classes.button} ${classes["search-button"]} ${formIsValid ? "" : classes.disable}`}
            disabled={!formIsValid}
         >
            {<GoSearch className={classes["search-icon"]} />}
         </button>
      </Form>
   );
};

export default SearchForm;
