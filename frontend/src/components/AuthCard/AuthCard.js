import { Button, Modal, Input, Text, Row, Radio } from "@nextui-org/react";
import { AiOutlineMail as Mail } from "react-icons/ai";
import { RiLockPasswordLine as Password } from "react-icons/ri";
import classes from "./AuthCard.module.css";
import { redirect, useActionData, useSearchParams, useSubmit } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { validateEmail } from "../../utils/validatation";
import { useEffect, useMemo, useState } from "react";
import accountServices from "../../services/account-services";
import { setAccountType, setUserId } from "../../utils/use-user";
import { ToastContainer, toast } from "react-toastify";
import hotelServices from "../../services/hotel-services";

const AuthCard = ({ handler, visible, closeHandler }) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const submit = useSubmit();

   const [accountType, setAccountType] = useState("Customer");

   const [foundEmail, setFoundEmail] = useState(false);

   const [foundAccountType, setFoundAccountTye] = useState();

   const [hotelId, setHotelId] = useState("");

   const data = useActionData();

   const incorrectPassword = data && !data.passwordVerified;

   const {
      value: emailValue,
      valueChangeHandler: emailValueChangeHandler,
      isValid: emailIsValid,
   } = useInput(validateEmail);

   const { value: passwordValue, valueChangeHandler: passwordValueChangeHandler } = useInput();

   const { value: fullNameValue, valueChangeHandler: fullNameValueChangeHandler } = useInput();

   const { value: ageValue, valueChangeHandler: ageValueChangeHandler } = useInput();

   const { value: ssnValue, valueChangeHandler: ssnValueChangeHandler } = useInput();

   const { value: streetValue, valueChangeHandler: streetValueChangeHandler } = useInput();

   const { value: cityValue, valueChangeHandler: cityValueChangeHandler } = useInput();

   const { value: postalCodeValue, valueChangeHandler: postalCodeValueChangeHandler } = useInput();

   const { value: hotelValue, valueChangeHandler: hotelValueChangeHandler } = useInput();

   const { value: positionValue, valueChangeHandler: positionValueChangeHandler } = useInput();

   const toggleSignUpMode = () => {
      if (searchParams.get("signup") === "true") {
         setSearchParams();
      } else {
         setSearchParams({ signup: true });
      }
   };

   useEffect(() => {
      const checkEmailExistenceHandler = async (emailValue) => {
         const data = await accountServices.emailExists(emailValue);
         setFoundEmail(data.emailExists);
         setFoundAccountTye(data.accountType);
      };
      if (emailValue.trim().length > 0) checkEmailExistenceHandler(emailValue);
   }, [emailValue]);

   const signupMode = searchParams.get("signup") === "true";

   const emailHelper = useMemo(() => {
      if (!emailValue)
         return {
            text: "",
            color: "",
         };
      const isValid = validateEmail(emailValue);
      if (!signupMode) {
         if (!isValid) {
            return {
               text: "Enter a valid email",
               color: "error",
            };
         } else if (!foundEmail) {
            return {
               text: "Email not found",
               color: "error",
            };
         } else {
            return {
               text: "Email found",
               color: "success",
            };
         }
      } else {
         if (!isValid) {
            return {
               text: "Enter a valid email",
               color: "error",
            };
         } else if (foundEmail) {
            return {
               text: "Email is already in use",
               color: "error",
            };
         } else {
            return {
               text: "Email is available",
               color: "success",
            };
         }
      }
   }, [emailValue, signupMode, foundEmail]);

   const passwordHelper = useMemo(() => {
      if (signupMode || !incorrectPassword)
         return {
            text: "",
            color: "",
         };
      return {
         text: "Password is incorrect",
         color: "error",
      };
   }, [incorrectPassword, signupMode]);

   const hotelHelper = useMemo(() => {
      if (!hotelValue)
         return {
            text: "",
            color: "",
         };
      const isValid = hotelId;
      return {
         text: isValid ? "Hotel Found" : "Hotel Not Found",
         color: isValid ? "success" : "error",
      };
   }, [hotelValue, hotelId]);

   useEffect(() => {
      const getHotelId = async (hotelName) => {
         const data = await hotelServices.getHotelIdByName(hotelName);
         console.log(data.hotelId?.hotelId);
         setHotelId(data.hotelId?.hotelId || null);
      };
      if (hotelValue.trim().length > 0) getHotelId(hotelValue);
   }, [hotelValue]);

   const formIsValid = emailIsValid && emailValue.trim().length > 0 && passwordValue.trim().length > 0;
   const signInFormIsValid = formIsValid && foundEmail;
   const signUpFormIsValid =
      formIsValid &&
      !foundEmail &&
      fullNameValue.trim().length > 0 &&
      ageValue.trim().length > 0 &&
      ssnValue.trim().length > 0 &&
      streetValue.trim().length > 0 &&
      cityValue.trim().length > 0 &&
      postalCodeValue.trim().length > 0 &&
      (accountType === "Employee" ? hotelId : true) &&
      (accountType === "Employee" ? positionValue.trim().length > 0 : true);

   const formSubmissionHandler = (evt) => {
      evt.preventDefault();
      if (signupMode && signUpFormIsValid) {
         signUpHandler(evt);
      } else if (!signupMode && signInFormIsValid) {
         signInHandler(evt);
      }
   };

   const signInHandler = (evt) => {
      const formData = new FormData();
      formData.append("email", emailValue);
      formData.append("password", passwordValue);
      formData.append("action", "sign-in");
      submit(formData, { method: "post" });
   };

   const signUpHandler = (evt) => {
      const formData = new FormData();
      formData.append("email", emailValue);
      formData.append("password", passwordValue);
      formData.append("fullName", fullNameValue);
      formData.append("age", ageValue);
      formData.append("ssn", ssnValue);
      formData.append("street", streetValue);
      formData.append("city", cityValue);
      formData.append("postalCode", postalCodeValue);
      formData.append("hotelId", hotelId);
      formData.append("position", positionValue);
      formData.append("accountType", accountType);
      formData.append("action", "sign-up");
      submit(formData, { method: "post" });
   };

   return (
      <>
         <Modal
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            preventClose
            width={signupMode ? "730px" : "450px"}
         >
            <form onSubmit={formSubmissionHandler} className={classes.form}>
               <Modal.Header>
                  <Text id="modal-title" size={20}>
                     Welcome to Hotel Manager
                  </Text>
               </Modal.Header>
               <Modal.Body className={`${classes.body} ${signupMode ? classes["sign-up"] : ""}`}>
                  <Input
                     bordered
                     fullWidth
                     size="lg"
                     placeholder="Email"
                     type="email"
                     contentLeft={<Mail fill="currentColor" />}
                     aria-label="Email"
                     value={emailValue}
                     onChange={emailValueChangeHandler}
                     status={emailHelper.color}
                     color={emailHelper.color}
                     helperColor={emailHelper.color}
                     helperText={emailHelper.text}
                     name="email"
                  />
                  <Input.Password
                     bordered
                     fullWidth
                     size="lg"
                     placeholder="Password"
                     type="password"
                     contentLeft={<Password fill="currentColor" />}
                     aria-label="password"
                     value={passwordValue}
                     onChange={passwordValueChangeHandler}
                     status={passwordHelper.color}
                     color={passwordHelper.color}
                     helperColor={passwordHelper.color}
                     helperText={passwordHelper.text}
                     name="password"
                  />
                  {signupMode && (
                     <Input
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Full Name"
                        name="fullName"
                        aria-label="Full Name"
                        value={fullNameValue}
                        onChange={fullNameValueChangeHandler}
                     />
                  )}
                  {signupMode && (
                     <Input
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Age"
                        name="age"
                        aria-label="Age"
                        value={ageValue}
                        onChange={ageValueChangeHandler}
                     />
                  )}
                  {signupMode && (
                     <Input
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="SSN"
                        name="ssn"
                        aria-label="SSN"
                        value={ssnValue}
                        onChange={ssnValueChangeHandler}
                     />
                  )}
                  {signupMode && (
                     <Input
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Street"
                        name="street"
                        aria-label="Street"
                        value={streetValue}
                        onChange={streetValueChangeHandler}
                     />
                  )}
                  {signupMode && (
                     <Input
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="City"
                        name="city"
                        aria-label="City"
                        value={cityValue}
                        onChange={cityValueChangeHandler}
                     />
                  )}
                  {signupMode && (
                     <Input
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Postal Code"
                        name="postalCode"
                        aria-label="Postal Code"
                        value={postalCodeValue}
                        onChange={postalCodeValueChangeHandler}
                     />
                  )}
                  {signupMode && accountType === "Employee" && (
                     <Input
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Hotel Name"
                        name="Hotel Name"
                        aria-label="Hotel Name"
                        value={hotelValue}
                        onChange={hotelValueChangeHandler}
                        status={hotelHelper.color}
                        color={hotelHelper.color}
                        helperColor={hotelHelper.color}
                        helperText={hotelHelper.text}
                     />
                  )}
                  {signupMode && accountType === "Employee" && (
                     <Input
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Position"
                        name="position"
                        aria-label="Position"
                        value={positionValue}
                        onChange={positionValueChangeHandler}
                     />
                  )}
                  <Row justify="space-between" css={{ gridColumn: "1/3" }}>
                     {signupMode && (
                        <Radio.Group
                           aria-label="Account Type"
                           value={accountType}
                           onChange={setAccountType}
                           orientation="horizontal"
                        >
                           <Radio value="Customer">Customer</Radio>
                           <Radio value="Employee">Employee</Radio>
                        </Radio.Group>
                     )}
                     {!signupMode && (
                        <Text size={14}>Account Type: {foundAccountType ? foundAccountType : "pending"}</Text>
                     )}
                     <p onClick={toggleSignUpMode} className={classes["signup-text"]}>
                        {signupMode ? "Already have an account?" : "Don't have an account?"}
                     </p>
                  </Row>
               </Modal.Body>
               <Modal.Footer>
                  <Button
                     auto
                     css={{ width: "120px" }}
                     onPress={closeHandler}
                     disabled={signupMode ? !signUpFormIsValid : !signInFormIsValid}
                     type="submit"
                  >
                     {signupMode ? "Sign Up" : "Sign In"}
                  </Button>
               </Modal.Footer>
            </form>
         </Modal>
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

export const signInAction = async (email, password) => {
   const { passwordVerified } = await accountServices.verifyPassword(email, password);
   if (!passwordVerified) {
      return { passwordVerified };
   }
   const { userId, accountType } = await accountServices.getAccountInfoByEmail(email);
   setUserId(userId);
   setAccountType(accountType);
   if (accountType === "Employee") {
      return redirect("/employee/bookings");
   } else {
      return redirect(`/${accountType.toLowerCase()}`);
   }
};

const signUpAction = async (account) => {
   try {
      const response = await accountServices.createNewAccount(account);
      const data = await response.json();
      if (response.status === 200) {
         setUserId(data.userId);
         setAccountType(account.accountType);
         if(account.accountType === "Employee") {
            return redirect("/employee/bookings");
         } else {
            return redirect(`/${account.accountType.toLowerCase()}`);
         }
      } else {
         throw new Error(data.message);
      }
   } catch (err) {
      toast.error(err.message);
   }
   return null;
};

export const action = async ({ request }) => {
   const formData = await request.formData();
   const email = formData.get("email");
   const password = formData.get("password");
   const fullName = formData.get("fullName");
   const age = formData.get("age");
   const ssn = formData.get("ssn");
   const street = formData.get("street");
   const city = formData.get("city");
   const postalCode = formData.get("postalCode");
   const hotelId = formData.get("hotelId");
   const position = formData.get("position");
   const accountType = formData.get("accountType");
   const action = formData.get("action");
   const account = {
      email,
      password,
      fullName,
      age,
      ssn,
      street,
      city,
      postalCode,
      hotelId,
      position,
      accountType,
   };
   if (action === "sign-in") {
      return signInAction(email, password);
   } else if (action === "sign-up") {
      return signUpAction(account);
   }
   return null;
};

export default AuthCard;
