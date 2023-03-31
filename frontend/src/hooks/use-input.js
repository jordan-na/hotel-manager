import { useState } from "react";

const useInput = (validateInput) => {
   const [enteredValue, setEnteredValue] = useState("");

   const valueIsValid = validateInput(enteredValue) || enteredValue.trim().length === 0;

   const valueChangeHandler = (event) => {
      setEnteredValue(event.target.value);
   };

   const reset = () => {
      setEnteredValue("");
   };

   return {
      value: enteredValue,
      isValid: valueIsValid,
      setValue: setEnteredValue,
      valueChangeHandler,
      reset,
   };
};

export default useInput;