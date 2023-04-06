import { Button, Modal, Input, Text, Row, Radio } from "@nextui-org/react";
import { AiOutlineMail as Mail } from "react-icons/ai";
import { RiLockPasswordLine as Password } from "react-icons/ri";
import classes from "./AuthCard.module.css";
import { useSearchParams } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { validateEmail } from "../../utils/validatation";
import { useEffect, useMemo, useState } from "react";
import accountServices from "../../services/account-services";

const AuthCard = ({ handler, visible, closeHandler }) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const [accountType, setAccountType] = useState("customer");

   const [foundEmail, setFoundEmail] = useState(false);

   const [foundAccountType, setFoundAccountTye] = useState();

   const {
      value: emailValue,
      valueChangeHandler: emailValueChangeHandler,
      isValid: emailIsValid,
   } = useInput(validateEmail);

   const { value: passwordValue, valueChangeHandler: passwordValueChangeHandler } = useInput();

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

   const formIsValid = emailIsValid && emailValue.trim().length > 0 && passwordValue.trim().length > 0;
   const signInFormIsValid = formIsValid && foundEmail;
   const signUpFormIsValid = formIsValid && !foundEmail;

   const formSubmissionHandler = (evt) => {
      evt.preventDefault();
      if (signupMode) {
         signUpHandler();
      } else {
         signInHandler();
      }
   }

   const signInHandler = (evt) => {
      
   };

   const signUpHandler = (evt) => {
      console.log("sign -up");
   };

   return (
      <Modal aria-labelledby="modal-title" open={visible} onClose={closeHandler} preventClose>
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
                  color="primary"
                  size="lg"
                  placeholder="Email"
                  type="email"
                  contentLeft={<Mail fill="currentColor" />}
                  aria-label="Email"
                  value={emailValue}
                  onChange={emailValueChangeHandler}
                  status={emailIsValid ? "default" : "error"}
                  status={emailHelper.color}
                  color={emailHelper.color}
                  helperColor={emailHelper.color}
                  helperText={emailHelper.text}
                  name="email"
               />
               <Input.Password
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Password"
                  type="password"
                  contentLeft={<Password fill="currentColor" />}
                  aria-label="password"
                  value={passwordValue}
                  onChange={passwordValueChangeHandler}
                  name="password"
               />
               <Row justify="space-between">
                  {signupMode && (
                     <Radio.Group aria-label="Account Type" value={accountType} onChange={setAccountType}>
                        <Radio value="customer">Customer</Radio>
                        <Radio value="employee">Employee</Radio>
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
   );
};

export const signInAction = ({request}) => {

}

export default AuthCard;
