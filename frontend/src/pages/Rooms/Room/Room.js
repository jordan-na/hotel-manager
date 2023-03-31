import classes from "./Room.module.css";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../../store/page/page-slice";
import RoomHeader from "../../../components/rooms/RoomPage/RoomHeader/RoomHeader";
import RoomDetails from "../../../components/rooms/RoomPage/RoomDetails/RoomDetails";
import { useRef } from "react";
import BookingFormMini from "../../../components/rooms/RoomPage/BookingFormMini/BookingFormMini";
import EmployeesList from "../../../components/rooms/RoomPage/EmployeesList/EmployeesList";
import roomServices from "../../../services/room-services";
import { defer } from "react-router-dom";
import employeeServices from "../../../services/emplolyee-service";
import DetailsList from "../../../components/rooms/RoomPage/DetailsList/DetailsList";
import { BiHappyBeaming, BiSad } from "react-icons/bi";

const Room = () => {

   const { room, employees } = useLoaderData();

   const dispatch = useDispatch();

   const formRef = useRef();

   const scrollToFormHandler = () => {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      formRef.current.animate([
         { transform: 'scale(0.95)' },
         { transform: 'scale(1.05)', border: "1px solid #0072f5"},
         { transform: 'scale(1)' }
      ], {
         duration: 400,
         delay: 500
      });
   }

   useEffect(() => {
      dispatch(setPage("rooms"));
   }, [dispatch]);

   useEffect(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
   }, []);

   return (
      <div className={classes["room-page"]}>
         <RoomHeader
            hotelName={room.hotelName}
            hotelCategory={room.hotelCategory}
            roomPrice={room.roomPrice}
            onBook={scrollToFormHandler}
         />
         <img className={classes["hotel-image"]} src={room.hotelImage} alt="hotel" />
         <div className={classes["room-content"]}>
            <RoomDetails room={room} />
            <BookingFormMini ref={formRef} />
            <EmployeesList employees={employees} />
            <DetailsList title="Amenities" icon={<BiHappyBeaming size="1.8rem" />} list={room.amenities} />
            <DetailsList title="Issues" icon={<BiSad size="1.8rem" />} list={room.issues} />
         </div>
      </div>
   );
};

const getRoomById = async (roomId) => {
   try {
      const room = await roomServices.getRoomById(roomId);
      return room;
   } catch (err) {
      return { isError: true, message: "Error retrieving room" };
   }
}

const getEmployeesByRoomId = async (roomId) => {
   try {
      const employees = await employeeServices.getEmployeesByRoomId(roomId);
      return employees;
   } catch (err) {
      return { isError: true, message: "Error retrieving employees" };
   }
}

export const loader = async ({ params }) => {
   return defer({
      room: await getRoomById(params.roomId),
      employees: getEmployeesByRoomId(params.roomId)
   });
};

export default Room;
