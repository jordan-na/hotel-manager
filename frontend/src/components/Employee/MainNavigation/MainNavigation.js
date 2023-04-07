import { Navbar, Text, Button } from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import usePageSetter from "../../../hooks/use-page-setter";
import { getUserId, logout } from "../../../utils/use-user";
import { useEffect, useState } from "react";
import accountServices from "../../../services/account-services";

const MainNavigation = () => {
   const [initials, setInitials] = useState("");

   const { employeePage } = usePageSetter();

   const navigate = useNavigate();

   let selectedLinkClass;

   if (employeePage === "rentings") {
      selectedLinkClass = classes.rentings;
   } else if (employeePage === "bookings") {
      selectedLinkClass = classes.bookings;
   } else if (employeePage === "views") {
      selectedLinkClass = classes.views;
   } else if (employeePage === "profile") {
      selectedLinkClass = classes.profile;
   }

   const getNavLinkClasses = ({ isActive }) => {
      return isActive ? `${classes.link} ${classes.active}` : `${classes.link}`;
   };

   const logoutHandler = () => {
      logout();
      navigate("/");
   };

   useEffect(() => {
      document.body.style.overflow = "auto";
      (async () => {
         const initials = await accountServices.getAccountNameInitialsByUserId(getUserId());
         setInitials(initials);
      })();
   }, []);

   return (
      <Navbar variant="sticky" className={classes.navbar}>
         <Navbar.Brand>
            <Text b color="inherit" hideIn="xs">
               HOTEL MANAGER
            </Text>
         </Navbar.Brand>
         <Navbar.Content hideIn="xs" activeColor="primary" variant="underline-rounded">
            <nav className={`${classes.nav} ${selectedLinkClass}`}>
               <div className={classes["link-container"]}>
                  <NavLink className={getNavLinkClasses} to="/employee/bookings">
                     Bookings
                  </NavLink>
               </div>
               <div className={classes["link-container"]}>
                  <NavLink className={getNavLinkClasses} to="/employee/rentings">
                     Rentings
                  </NavLink>
               </div>
               <div className={classes["link-container"]}>
                  <NavLink className={getNavLinkClasses} to="/employee/views">
                     Views
                  </NavLink>
               </div>
            </nav>
         </Navbar.Content>
         <Navbar.Content>
            <Navbar.Item>
               <Button auto flat onPress={logoutHandler}>
                  Log Out
               </Button>
            </Navbar.Item>
            <Navbar.Item>
               <NavLink className={getNavLinkClasses} to="/employee/profile">
                  <div className={classes.avatar}>{initials}</div>
               </NavLink>
            </Navbar.Item>
         </Navbar.Content>
      </Navbar>
   );
};

export default MainNavigation;
