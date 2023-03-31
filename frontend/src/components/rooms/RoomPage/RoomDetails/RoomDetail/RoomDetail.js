import classes from "./RoomDetail.module.css";

const RoomDetail = ({icon, text}) => {
   return (
      <div className={classes.detail}>
         {icon}
         {text}
      </div>
   );
};

export default RoomDetail;