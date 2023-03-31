import "./Calendar.css";
import classes from "./CalendarInput.module.css";
import Calendar from "react-calendar";

const CalendarInput = (props) => {

   const dateChangeHandler = (value) => {
      const newDate = new Date(value);
      const day = newDate.getDate();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();
      props.setDate(new Date(value));
      props.setValue(`${day}/${month}/${year}`);
   }

   return (
      <div
         className={`${classes.calendar} ${props.show ? classes.show : ""}`}
         style={{
            width: props.width || "100%",
            height: props.height || "auto",
            padding: props.padding || "0px"
         }}
      >
         <Calendar {...props.calendar} onChange={dateChangeHandler} />
      </div>
   );
};

export default CalendarInput;