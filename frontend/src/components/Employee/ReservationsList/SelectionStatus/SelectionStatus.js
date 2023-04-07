import classes from "./SelectionStatus.module.css";
import { Text, Button } from "@nextui-org/react";

const SelectionStatus = ({ selectedItems, reservationType, onModify, onUnselectAll }) => {

   const modifyItemsHandler = () => {
      onModify(selectedItems);
      onUnselectAll();
   };

   return (
      <div className={`${classes["selection-status"]} ${selectedItems.length > 0 ? classes.show : ""}`}>
         <Text b size="x-large">
            Selected {selectedItems.length} {reservationType}{selectedItems.length === 1 ? "" : "s"}
         </Text>
         <div className={classes["button-group"]}>
            <Button size="xs" css={{padding: "1.2rem 2rem"}} flat onPress={onUnselectAll}>
               Cancel
            </Button>
            <Button size="xs" css={{padding: "1.2rem 2rem"}} onPress={modifyItemsHandler}>
               {reservationType === "booking" ? "Convert" : "Check Out"}
            </Button>
         </div>
      </div>
   );
};

export default SelectionStatus;