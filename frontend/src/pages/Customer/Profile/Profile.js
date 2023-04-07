import { useEffect, useRef } from "react";
import usePageSetter from "../../../hooks/use-page-setter";
import { getUserId, logout } from "../../../utils/use-user";
import accountServices from "../../../services/account-services";
import classes from "./Profile.module.css";
import { Card, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDateFromSql } from "../../../utils/date-formatter";
import { useNavigate } from "react-router-dom";

const Profile = () => {
   const [editMode, setEditMode] = useState(false);

   const { setCustomerPage } = usePageSetter();

   const account = useLoaderData();

   const navigate = useNavigate();

   const [fullNameValue, setFullNameValue] = useState(account.fullName);
   const [ssnValue, setSsnValue] = useState(account.SSN);
   const [ageValue, setAgeValue] = useState(account.age);
   const [streetValue, setStreetValue] = useState(account.street);
   const [cityValue, setCityValue] = useState(account.city);
   const [postalCodeValue, setPostalCodeValue] = useState(account.postalCode);
   const [emailValue, setEmailValue] = useState(account.email);
   const [passwordValue, setPasswordValue] = useState(account.password);

   const fullNameRef = useRef();
   const ssnRef = useRef();
   const ageRef = useRef();
   const streetRef = useRef();
   const cityRef = useRef();
   const postalCodeRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();

   useEffect(() => {
      setCustomerPage("profile");
   }, [setCustomerPage]);

   const turnOnEditModeHandler = () => {
      setEditMode(true);
   };

   const turnOffEditModeHandler = () => {
      setEditMode(false);
   };

   const deleteProfileHandler = async () => {
      await accountServices.deleteAccountByUserId(getUserId());
      logout();
      navigate("/");
   };

   const submitHandler = async (evt) => {
      evt.preventDefault();
      try {
         const response = await accountServices.updateAccountByUserId(getUserId(), {
            fullName: fullNameRef.current.value,
            SSN: ssnRef.current.value,
            age: ageRef.current.value,
            street: streetRef.current.value,
            city: cityRef.current.value,
            postalCode: postalCodeRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
         });
         if (response.status === 200) {
            setFullNameValue(fullNameRef.current.value);
            setSsnValue(ssnRef.current.value);
            setAgeValue(ageRef.current.value);
            setStreetValue(streetRef.current.value);
            setCityValue(cityRef.current.value);
            setPostalCodeValue(postalCodeRef.current.value);
            setEmailValue(emailRef.current.value);
            setPasswordValue(passwordRef.current.value);
            setEditMode(false);
         } else {
            const data = await response.json();
            throw new Error(data.message);
         }
      } catch (err) {
         toast.error(err.message);
      }
   };

   return (
      <>
         <Card className={classes.card} variant="bordered">
            <form className={classes.form} onSubmit={submitHandler}>
               <h2 className={classes.header}>Profile Information</h2>
               <div className={classes.content}>
                  <div className={classes.info}>
                     <label>Full Name:</label>
                     {editMode ? (
                        <Input
                           size="sm"
                           initialValue={fullNameValue}
                           animated={false}
                           shadow={false}
                           name="fullName"
                           ref={fullNameRef}
                           aria-label="fullName"
                        />
                     ) : (
                        <div>{fullNameValue}</div>
                     )}
                  </div>
                  <div className={classes.info}>
                     <label>SSN:</label>
                     {editMode ? (
                        <Input
                           size="sm"
                           initialValue={ssnValue}
                           animated={false}
                           shadow={false}
                           name="SSN"
                           ref={ssnRef}
                           aria-label="ssn"
                        />
                     ) : (
                        <div>{ssnValue}</div>
                     )}
                  </div>
                  <div className={classes.info}>
                     <label>Age:</label>
                     {editMode ? (
                        <Input
                           size="sm"
                           initialValue={ageValue}
                           animated={false}
                           shadow={false}
                           type="number"
                           max={150}
                           min={0}
                           name="age"
                           ref={ageRef}
                           aria-label="age"
                        />
                     ) : (
                        <div>{ageValue}</div>
                     )}
                  </div>
                  <div className={classes.info}>
                     <label>Street:</label>
                     {editMode ? (
                        <Input
                           size="sm"
                           initialValue={streetValue}
                           animated={false}
                           shadow={false}
                           name="street"
                           ref={streetRef}
                           aria-label="street"
                        />
                     ) : (
                        <div>{streetValue}</div>
                     )}
                  </div>
                  <div className={classes.info}>
                     <label>City:</label>
                     {editMode ? (
                        <Input
                           size="sm"
                           initialValue={cityValue}
                           animated={false}
                           shadow={false}
                           name="city"
                           ref={cityRef}
                           aria-label="city"
                        />
                     ) : (
                        <div>{cityValue}</div>
                     )}
                  </div>
                  <div className={classes.info}>
                     <label>Postal Code:</label>
                     {editMode ? (
                        <Input
                           size="sm"
                           initialValue={postalCodeValue}
                           animated={false}
                           shadow={false}
                           name="postalCode"
                           ref={postalCodeRef}
                           aria-label="postalCode"
                        />
                     ) : (
                        <div>{postalCodeValue}</div>
                     )}
                  </div>
                  <div className={classes.info}>
                     <label>Registration Date:</label>
                     <div>{formatDateFromSql(account.registrationDate)}</div>
                  </div>
                  <div className={classes.info}>
                     <label>Email:</label>
                     {editMode ? (
                        <Input
                           size="sm"
                           initialValue={emailValue}
                           animated={false}
                           shadow={false}
                           name="email"
                           ref={emailRef}
                           aria-label="email"
                        />
                     ) : (
                        <div>{emailValue}</div>
                     )}
                  </div>
                  <div className={classes.info}>
                     <label>Password:</label>
                     {editMode ? (
                        <Input
                           size="sm"
                           initialValue={passwordValue}
                           animated={false}
                           shadow={false}
                           name="password"
                           ref={passwordRef}
                           aria-label="password"
                        />
                     ) : (
                        <div>{passwordValue}</div>
                     )}
                  </div>
                  <div className={classes.info}>
                     <label>Account Type:</label>
                     <div>Customer</div>
                  </div>
               </div>
               {!editMode && (
                  <div className={classes["button-group"]}>
                     <Button onPress={deleteProfileHandler} color="error">
                        Delete Profile
                     </Button>
                     <Button onPress={turnOnEditModeHandler} className={classes["edit-button"]} type="button">
                        Edit Profile
                     </Button>
                  </div>
               )}
               {editMode && (
                  <div className={classes["button-group"]}>
                     <Button onPress={turnOffEditModeHandler} flat type="button">
                        Cancel
                     </Button>
                     <Button type="submit">Save</Button>
                  </div>
               )}
            </form>
         </Card>
         <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
         />
      </>
   );
};

export const loader = async () => {
   try {
      const account = accountServices.getAccountByUserId(getUserId());
      return account;
   } catch (err) {
      return { isError: true, message: err.message };
   }
};

export default Profile;
