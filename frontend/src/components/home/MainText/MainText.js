import { Text } from "@nextui-org/react";
import classes from "./MainText.module.css"

const MainText = () => {
   return (
      <div className={classes["main-text"]}>
         <Text h1 size="4rem" color="#fff" weight="bold">
            Hello user.
         </Text>
         <Text h1 size="4rem" color="#fff" weight="bold">
            Let's make finding a hotel
         </Text>
         <Text h1 size="4rem" color="#fff" weight="bold">
            Easy as pie
         </Text>
      </div>
   );
};

export default MainText;