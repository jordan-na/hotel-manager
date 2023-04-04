import classes from "./ListHeader.module.css";

const ListHeader = () => {
   return (
      <div className={classes["list-header"]}>
         <div></div>
         <div>Hotel</div>
         <div>Check In</div>
         <div>Check Out</div>
         <div>Status</div>
         <div>Total ($)</div>
         <div>Nights</div>
      </div>
   );
};

export default ListHeader;