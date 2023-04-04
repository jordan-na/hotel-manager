import { Navbar, Text, Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';
import usePageSetter from "../../hooks/use-page-setter";

const MainNavigation = () => {

   const { customerPage } = usePageSetter();

   let selectedLinkClass;

   if(customerPage === 'home') {
      selectedLinkClass = classes.home
   } else if (customerPage === 'rooms') {
      selectedLinkClass = classes.rooms;
   } else if (customerPage === 'reservations') {
      selectedLinkClass = classes.reservations;
   }

   const getNavLinkClasses = ({isActive}) => {
      return isActive ? `${classes.link} ${classes.active}` : `${classes.link}`;
   }

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
                  <NavLink className={getNavLinkClasses} to="/">
                     Home
                  </NavLink>
               </div>
               <div className={classes["link-container"]}>
                  <NavLink className={getNavLinkClasses} to="/rooms">
                     Rooms
                  </NavLink>
               </div>
               <div className={classes["link-container"]}>
                  <NavLink className={getNavLinkClasses} to="/reservations">
                     Reservations
                  </NavLink>
               </div>
            </nav>
         </Navbar.Content>
         <Navbar.Content>
            <Navbar.Item>
               <Button auto flat>
                  Log Out
               </Button>
            </Navbar.Item>
            <Navbar.Item>
               <div className={classes.avatar}>
                  user
               </div>
            </Navbar.Item>
         </Navbar.Content>
      </Navbar>
   );
};

export default MainNavigation;
