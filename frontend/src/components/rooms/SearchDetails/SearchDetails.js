import { Badge } from "@nextui-org/react";
import classes from "./SearchDetails.module.css"
import { AiOutlineCloseCircle } from "react-icons/ai";

const SearchDetails = ({ query, onRemoveFromSearchParams }) => {

   const searchItems = [];

   for(const key in query) {
      if(query[key].trim().length === 0) {
         continue;
      }
      searchItems.push(
         <Badge key={key} color="primary" variant="flat" disableOutline size="lg" className={classes["search-item"]}>
            <button className={classes["close-button"]} onClick={onRemoveFromSearchParams.bind(null, key)}>
               <AiOutlineCloseCircle size="1.5rem" />
            </button>
            <span className={classes["search-query"]}>{key.replaceAll("-", " ")}</span> = {query[key]}
         </Badge>
      );
   }

   return (
      <div className={classes["search-details"]}>
         {searchItems}
      </div>
   );
};

export default SearchDetails;