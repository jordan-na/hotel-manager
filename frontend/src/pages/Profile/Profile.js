import { useEffect } from "react";
import usePageSetter from "../../hooks/use-page-setter";
import { getUserId } from "../../hooks/use-user";
import accountServices from "../../services/account-services";
import classes from "./Profile.module.css";
import { Card, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import useInput from "../../hooks/use-input";
import { useLoaderData } from "react-router-dom";

const Profile = () => {

   const [editMode, setEditMode] = useState(false);

   const { setCustomerPage } = usePageSetter();

   const account = useLoaderData();

   const turnOnEditModeHandler = () => {
      setEditMode(true);
   };

   const turnOffEditModeHandler = () => {
      setEditMode(false);
   };

   useEffect(() => {
      setCustomerPage("profile");
   }, [setCustomerPage]);

   return (
      <Card className={classes.card} variant="bordered">
         <h2 className={classes.header}>Profile Information</h2>
         <div className={classes.content}>
            <div className={classes.info}>
               <label>Full Name:</label>
               {editMode ? (
                  <Input size="sm" initialValue="Oliver Woodard" animated={false} shadow={false} />
               ) : (
                  <div>Oliver Woodard</div>
               )}
            </div>
            <div className={classes.info}>
               <label>SSN:</label>
               {editMode ? (
                  <Input size="sm" initialValue="417836902" animated={false} shadow={false} />
               ) : (
                  <div>417836902</div>
               )}
            </div>
            <div className={classes.info}>
               <label>Age:</label>
               {editMode ? (
                  <Input size="sm" initialValue={42} animated={false} shadow={false} type="number" max={150} min={0} />
               ) : (
                  <div>42</div>
               )}
            </div>
            <div className={classes.info}>
               <label>Street:</label>
               {editMode ? (
                  <Input size="sm" initialValue="51 Cedar Street" animated={false} shadow={false} />
               ) : (
                  <div>51 Cedar Street</div>
               )}
            </div>
            <div className={classes.info}>
               <label>City:</label>
               {editMode ? (
                  <Input size="sm" initialValue="51 Cedar Street" animated={false} shadow={false} />
               ) : (
                  <div>Tokyo</div>
               )}
            </div>
            <div className={classes.info}>
               <label>Postal Code:</label>
               {editMode ? (
                  <Input size="sm" initialValue="N3T 1L3" animated={false} shadow={false} />
               ) : (
                  <div>N3T 1L3</div>
               )}
            </div>
            <div className={classes.info}>
               <label>Registration Date:</label>
               <div>28/3/2023</div>
            </div>
            <div className={classes.info}>
               <label>Email:</label>
               {editMode ? (
                  <Input size="sm" initialValue="owoodard@email.com" animated={false} shadow={false} />
               ) : (
                  <div>owoodard@email.com</div>
               )}
            </div>
            <div className={classes.info}>
               <label>Password:</label>
               {editMode ? (
                  <Input size="sm" initialValue="Test1234" animated={false} shadow={false} />
               ) : (
                  <div>Test1234</div>
               )}
            </div>
            <div className={classes.info}>
               <label>Account Type:</label>
               <div>Customer</div>
            </div>
         </div>
         {!editMode && (
            <Button onClick={turnOnEditModeHandler} className={classes["edit-button"]}>
               Edit Profile
            </Button>
         )}
         {editMode && (
            <div className={classes["button-group"]}>
               <Button onClick={turnOffEditModeHandler} flat>
                  Cancel
               </Button>
               <Button onClick={turnOffEditModeHandler}>Save</Button>
            </div>
         )}
      </Card>
   );
};

export const loader = async () => {
   try {
      const account = accountServices.getAccountById(getUserId());
      return account;
   } catch (err) {
      return {isError: true, message: err.message}
   }
};

export default Profile;