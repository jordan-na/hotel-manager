import RoomDetailsSection from "./RoomDetailsSection/RoomDetailsSection";
import RoomDetail from "./RoomDetail/RoomDetail";

import { BsFillPeopleFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaMountain, FaCity } from "react-icons/fa";
import { BiWater } from "react-icons/bi";
import { MdForest } from "react-icons/md";
import { GiValley } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { AiFillCheckCircle } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import classes from "./RoomDetails.module.css";

const sizes = ["single", "double", "triple", "quad", "quin"];

const RoomDetails = ({ room }) => {
   let viewIcon;

   if (room.roomView === "Mountain") {
      viewIcon = <FaMountain size="1.8rem" />;
   } else if (room.roomView === "Ocean" || room.roomView === "Lake") {
      viewIcon = <BiWater size="1.8rem" />;
   } else if (room.roomView === "Forest") {
      viewIcon = <MdForest size="1.8rem" />;
   } else if (room.roomView === "City") {
      viewIcon = <FaCity size="1.8rem" />;
   } else if (room.roomView === "Valley") {
      viewIcon = <GiValley size="1.8rem" />;
   }

   const extendableIcon = room.roomIsExtendable ? (
      <AiFillCheckCircle size="1.8rem" />
   ) : (
      <ImCancelCircle size="1.8rem" />
   );

   return (
      <div className={classes.details}>
         <RoomDetailsSection label="Room Info:">
            <RoomDetail
               icon={<RiMoneyDollarCircleFill size="1.8rem" />}
               text={
                  <p>
                     Costs <b>${room.roomPrice}</b> a night
                  </p>
               }
            />
            <RoomDetail
               icon={<BsFillPeopleFill size="1.8rem" />}
               text={
                  <p>
                     Capacity is <b>{`${sizes[room.roomCapacity - 1]} (${room.roomCapacity})`}</b>
                  </p>
               }
            />
            <RoomDetail
               icon={viewIcon}
               text={
                  <p>
                     Has a{room.roomView === "Ocean" ? "n" : ""} <b>{room.roomView.toLowerCase()}</b> view
                  </p>
               }
            />
            <RoomDetail
               icon={extendableIcon}
               text={
                  <p>
                     Is <b>{room.roomIsExtendable ? "" : "not"} extendable</b>
                  </p>
               }
            />
         </RoomDetailsSection>
         <RoomDetailsSection label={`Hotel Info: ${room.hotelName}`}>
            <RoomDetail
               icon={<IoLocationSharp size="1.8rem" />}
               text={<p>{`${room.hotelStreet}, ${room.hotelCity}, ${room.hotelPostalCode}`}</p>}
            />
            <RoomDetail icon={<MdEmail size="1.8rem" />} text={<p>{room.hotelEmail}</p>} />
            <RoomDetail icon={<BsFillTelephoneFill size="1.8rem" />} text={<p>{room.hotelPhone}</p>} />
            <RoomDetail icon={<GrUserManager size="1.8rem" />} text={<p>Manager is {room.hotelManagerName}</p>} />
         </RoomDetailsSection>
         <RoomDetailsSection label={`Hotel Chain Info: ${room.hotelChainName}`}>
            <RoomDetail
               icon={<IoLocationSharp size="1.8rem" />}
               text={<p>{`${room.hotelChainStreet}, ${room.hotelChainCity}, ${room.hotelChainPostalCode}`}</p>}
            />
            <RoomDetail icon={<MdEmail size="1.8rem" />} text={<p>{room.hotelChainEmail}</p>} />
            <RoomDetail icon={<BsFillTelephoneFill size="1.8rem" />} text={<p>{room.hotelChainPhone}</p>} />
         </RoomDetailsSection>
      </div>
   );
};

export default RoomDetails;
