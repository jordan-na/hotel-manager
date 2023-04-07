import usePageSetter from "../../../hooks/use-page-setter";
import rentingServices from "../../../services/renting-services";
import { getUserId } from "../../../utils/use-user";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import ReservationsList from "../../../components/Employee/ReservationsList/ReservationsList";
import { Button } from "@nextui-org/react";
import classes from "./Rentings.module.css";
import { MdLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Rentings = () => {

   const rentings = useLoaderData();

   const navigate = useNavigate();

   const { setEmployeePage } = usePageSetter();

   const showRentingFormHandler = () => {
      navigate("new");
   }

   useEffect(() => {
      setEmployeePage("rentings");
   }, [setEmployeePage]);

   return (
      <div>
         <Button
            className={classes["create-renting-button"]}
            icon={<MdLibraryAdd size="1rem" />}
            onPress={showRentingFormHandler}>
            CREATE NEW RENTING
         </Button>
         <ReservationsList items={rentings} reservationType="renting" />
      </div>
   );

};

export const loader = async () => {
   try {
      const rentings = await rentingServices.getRentingsByEmployeeId(getUserId());
      return rentings;
   } catch(err) {
      return { isError: true, message: err.message }
   }
}

export default Rentings;