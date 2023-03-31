import classes from "./RoomDetailsSection.module.css";
import { Text } from "@nextui-org/react";

const RoomDetailsSection = (props) => {

   return (
      <div className={classes["details-section"]}>
         <div className={classes["label-section"]}>
            {props.label && (
               <Text size="1.4rem" b>
                  {props.label}
               </Text>
            )}
         </div>
         <div className={classes.details}>
            {props.children}
         </div>
      </div>
   );
};

export default RoomDetailsSection;