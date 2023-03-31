import { Button } from "@nextui-org/react";
import classes from "./HelpText.module.css";
import { AiFillYoutube } from "react-icons/ai";

const HelpText = () => {

   const openVideoHandler = () => {
      Object.assign(document.createElement("a"), {
         target: "_blank",
         rel: "noopener noreferrer",
         href: "https://www.youtube.com/?gl=CA",
      }).click();
   };

   return (
      <p className={classes.text}>
         Need help using the app? Watch this
         <Button onPress={openVideoHandler} size="mini" flat icon={<AiFillYoutube />} iconLeftCss={{transform: "translateY(-6px)"}}>
            video
         </Button>
      </p>
   );
};

export default HelpText;