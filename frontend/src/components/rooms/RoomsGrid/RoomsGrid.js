import classes from "./RoomsGrid.module.css";
import { Suspense } from "react";
import { Await, Link } from "react-router-dom";
import { Loading } from "@nextui-org/react";
import RoomCard from "../RoomCard/RoomCard";

const RoomsGrid = ({ rooms }) => {

   const loading = (
      <div className={classes["loading-container"]}>
         <Loading size="lg"/>
      </div>
   );

   const createRoomGrid = (rooms) => {

      if(rooms.length === 0) {
         return <h2>No rooms found</h2>
      }

      const roomCards = rooms.map((room) => {
         return (
            <Link to={room.roomId} key={room.roomId}>
               <RoomCard key={room.roomId} room={room} />
            </Link>
         );
      });

      return (
         <>
            <h2 className={classes.header}>Showing {rooms.length} rooms</h2>
            <div className={classes.grid}>{roomCards}</div>
         </>
      );
   };

   return (
      <Suspense fallback={loading}>
         <Await resolve={rooms}>
            {createRoomGrid}
         </Await>
      </Suspense>
   );
};

export default RoomsGrid;