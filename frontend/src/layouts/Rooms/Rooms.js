import { Outlet } from "react-router-dom";
import SearchBar from "../../components/rooms/SearchBar/SearchBar";
import classes from "./Rooms.module.css";

const Hotels = () => {
   return (
      <div className={classes["rooms-layout"]}>
         <SearchBar />
         <Outlet />
      </div>
   );
};

export default Hotels;