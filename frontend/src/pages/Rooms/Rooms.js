import usePageSetter from "../../hooks/use-page-setter";
import { useCallback, useEffect, useState } from "react";
import { Text } from "@nextui-org/react";
import RoomsGrid from "../../components/rooms/RoomsGrid/RoomsGrid";
import { useLoaderData } from "react-router-dom";
import classes from "./Rooms.module.css";
import { defer } from "react-router-dom";
import roomServices from "../../services/room-services";
import SearchDetails from "../../components/rooms/SearchDetails/SearchDetails";
import useQuery from "../../hooks/use-query";

const Rooms = () => {

   let data = useLoaderData();

   const [rooms, setRooms] = useState(data.rooms);

   const searchHandler = useCallback(async (queryString) => {
      const roomSearchResults = roomServices.getRoomsBySearchParams(queryString);
      setRooms(roomSearchResults);
   }, []);

   const { searching, query, removeFromSearchParamsHandler } = useQuery(searchHandler);

   const { setCustomerPage } = usePageSetter();

   useEffect(() => {
      setCustomerPage("rooms")
   }, [setCustomerPage]);

   return (
      <>
         <Text b size="3rem" className={`${classes.header} ${searching ? classes["less-margin-bottom"] : ""}`}>
            {searching ? "Search results" : "All rooms"}
         </Text>
         {searching && <SearchDetails query={query} onRemoveFromSearchParams={removeFromSearchParamsHandler}/>}
         <RoomsGrid rooms={rooms} />
      </>
   );
};

const loadRooms = async () => {
   try {
      const rooms = await roomServices.getRooms();
      return rooms;
   } catch (err) {
      return { isError: true, message: err.message };
   }
};

export const loader = async ({ request, params }) => {
   return defer({
      rooms: loadRooms(),
   });
};

export default Rooms;
