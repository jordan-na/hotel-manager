import { Navbar, Text, Button } from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from './MainNavigation.module.css';
import usePageSetter from "../../hooks/use-page-setter";
import { getUserId, logout } from "../../utils/use-user";
import { useEffect, useState } from "react";
import accountServices from "../../services/account-services";

const MainNavigation = () => {

   const [initials, setInitials] = useState("");

   const { customerPage } = usePageSetter();

   const navigate = useNavigate();

   let selectedLinkClass;

   if(customerPage === 'home') {
      selectedLinkClass = classes.home
   } else if (customerPage === 'rooms') {
      selectedLinkClass = classes.rooms;
   } else if (customerPage === 'reservations') {
      selectedLinkClass = classes.reservations;
   } else if (customerPage === 'profile') {
      selectedLinkClass = classes.profile;
   }

   const getNavLinkClasses = ({isActive}) => {
      return isActive ? `${classes.link} ${classes.active}` : `${classes.link}`;
   };

   const logoutHandler = () => {
      logout();
      navigate('/');
   };

   useEffect(() => {
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
                  <NavLink className={getNavLinkClasses} to="/customer" end>
                     Home
                  </NavLink>
               </div>
               <div className={classes["link-container"]}>
                  <NavLink className={getNavLinkClasses} to="/customer/rooms">
                     Rooms
                  </NavLink>
               </div>
               <div className={classes["link-container"]}>
                  <NavLink className={getNavLinkClasses} to="/customer/reservations">
                     Reservations
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
               <NavLink className={getNavLinkClasses} to="/customer/profile">
                  <div className={classes.avatar}>
                     {initials}
                  </div>
               </NavLink>
            </Navbar.Item>
         </Navbar.Content>
      </Navbar>
   );
};

export default MainNavigation;
