import classes from "./SearchFormInput.module.css";
import { useEffect, useState, useRef } from "react";
import CalendarInput from "../../../../UI/Calendar/CalendarInput";
import React from "react";

const SearchFormInput = (
   { type, label, id, placeholder, value, width, selected, noBorder, formIsActive,
      setValue, onFocus, onChange, isValid, options, minDate, maxDate }) => {

   const onFocusHandler = () => {
      onFocus(id);
   };

   switch (type) {
      case "text":
         return (
            <TextInput
               type={type}
               label={label}
               id={id}
               placeholder={placeholder}
               value={value}
               width={width}
               selected={selected}
               noBorder={noBorder}
               formIsActive={formIsActive}
               setValue={setValue}
               setSelected={onFocusHandler}
               onChange={onChange}
               isValid={isValid}
            />
         );
      case "date":
         return (
            <DateInput
               type={type}
               label={label}
               id={id}
               placeholder={placeholder}
               value={value}
               width={width}
               selected={selected}
               noBorder={noBorder}
               formIsActive={formIsActive}
               setValue={setValue}
               setSelected={onFocusHandler}
               onChange={onChange}
               isValid={isValid}
               minDate={minDate}
               maxDate={maxDate}
            />
         );
      case "dropdown":
         return (
            <DropdownInput
               type={type}
               label={label}
               id={id}
               placeholder={placeholder}
               value={value}
               width={width}
               selected={selected}
               noBorder={noBorder}
               formIsActive={formIsActive}
               setValue={setValue}
               setSelected={onFocusHandler}
               onChange={onChange}
               isValid={isValid}
               options={options}
            />
         );
      case "number":
         return (
            <NumberInput
               type={type}
               label={label}
               id={id}
               placeholder={placeholder}
               value={value}
               width={width}
               selected={selected}
               noBorder={noBorder}
               formIsActive={formIsActive}
               setValue={setValue}
               setSelected={onFocusHandler}
               onChange={onChange}
               isValid={isValid}
            />
         );
      default:
         return (
            <TextInput
               type={type}
               label={label}
               id={id}
               placeholder={placeholder}
               value={value}
               width={width}
               selected={selected}
               noBorder={noBorder}
               formIsActive={formIsActive}
               setValue={setValue}
               setSelected={onFocusHandler}
               onChange={onChange}
               isValid={isValid}
            />
         );
   }
};

const TextInput = ({ label, id, placeholder, value, width, selected, noBorder, formIsActive, setValue, setSelected, onChange, isValid }) => {

   const inputRef = useRef();

   useEffect(() => {
      if(selected) {
         inputRef.current.focus();
      }
   }, [selected]);

   return (
      <div
         className={`${classes["form-input"]} ${classes["text-input"]} ${noBorder ? "" : classes.border} ${
            formIsActive ? "" : classes["remove-border-on-hover"]
         } ${selected ? classes.selected : ""} ${isValid ? "" : classes.error}}`}
         style={{ width: width }}
         onClick={setSelected}
      >
         <label htmlFor={id} >{label}</label>
         <input id={id} ref={inputRef} name={id} type="text" placeholder={placeholder} value={value} onFocus={setSelected} onChange={onChange} />
      </div>
   );
};

const DateInput = ({ label, id, placeholder, value, width, selected, noBorder, formIsActive, setValue, setSelected, onChange, isValid, minDate, maxDate }) => {

   const [date, setDate] = useState(new Date());

   if(minDate && minDate.trim().length > 0) {
      const minDateData = minDate.split("/");
      minDate = new Date(minDateData[2], minDateData[1] - 1, parseInt(minDateData[0]) + 1);
   } else if (maxDate === null || maxDate === undefined) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      minDate = tomorrow;
   } else {
      minDate = new Date();
   }

   if(maxDate && maxDate.trim().length > 0) {
      const maxDateData = maxDate.split("/");
      maxDate = new Date(maxDateData[2], parseInt(maxDateData[1]) - 1, parseInt(maxDateData[0]) - 1);
   }

   return (
      <div
         className={`${classes["form-input"]} ${classes["date-input"]} ${noBorder ? "" : classes.border} ${
            formIsActive ? "" : classes["remove-border-on-hover"]
         } ${selected ? classes.selected : ""} ${isValid ? "" : classes.error}`}
         style={{ width: width }}
         onClick={setSelected}
      >
         <label htmlFor={id}>{label}</label>
         <input readOnly className={classes.disabled} id={id} name={id} type="text" placeholder={placeholder} value={value} onFocus={setSelected} onChange={onChange} />
         <CalendarInput
            show={selected}
            width="15rem"
            setValue={setValue}
            setDate={setDate}
            calendar={{
               minDate: minDate,
               maxDate: maxDate || null,
               calendarType: "US",
               value: date
            }}
         />
      </div>
   );
};

const DropdownInput = ({ label, id, placeholder, value, width, selected, noBorder, formIsActive, setValue, setSelected, onChange, isValid, options }) => {
   return (
      <div
         className={`${classes["form-input"]} ${classes["dropdown-input"]} ${noBorder ? "" : classes.border} ${
            formIsActive ? "" : classes["remove-border-on-hover"]
         } ${selected ? classes.selected : ""} ${isValid ? "" : classes.error}`}
         style={{ width: width }}
         onClick={setSelected}
      >
         <label htmlFor={id}>{label}</label>
         <input readOnly className={classes.disabled} id={id} name={id} type="text" placeholder={placeholder} value={value} onFocus={setSelected} onChange={onChange} />
         <div className={`${classes.card} ${selected ? classes.show : ""}`}>
            <ul className={classes["dropdown-options"]}>
            {options.map((option) => (
               <li key={option} className={`${classes.option} ${value === option ? classes.selected : ""}`} onClick={setValue.bind(null, option)}>
                  {option}
               </li>
            ))}
            </ul>
         </div>
      </div>
   );
};

const NumberInput = ({ label, id, placeholder, value, width, selected, noBorder, formIsActive, setSelected, onChange, isValid }) => {

   const inputRef = useRef();

   useEffect(() => {
      if (selected) {
         inputRef.current.focus();
      }
   }, [selected]);

   const verifySignsHandler = (evt) => {
      if(evt.key === "-" || evt.key === "+") {
         evt.preventDefault();
      }
   };

   return (
      <div
         className={`${classes["form-input"]} ${classes["number-input"]} ${noBorder ? "" : classes.border} ${
            formIsActive ? "" : classes["remove-border-on-hover"]
         } ${selected ? classes.selected : ""} ${isValid ? "" : classes.error}`}
         style={{ width: width }}
         onClick={setSelected}
      >
         <label htmlFor={id}>{label}</label>
         <input id={id} ref={inputRef} name={id} type="number"
         placeholder={placeholder} value={value} min="1"
         onFocus={setSelected}
         onChange={onChange} onKeyDown={verifySignsHandler}
          />
      </div>
   );
};

export default SearchFormInput;
