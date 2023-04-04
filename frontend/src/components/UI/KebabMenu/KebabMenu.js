import classes from "./KebabMenu.module.css";
import { useState, useRef } from "react";
import useOutsideClick from "../../../hooks/use-outside-click";

const KebabMenu = ({ menu, className }) => {

   const [showMenu, setShowMenu] = useState(null);

   let menuAnimation;

   if (showMenu === true) menuAnimation = classes["show"];
   else if (showMenu === false) menuAnimation = classes["hide"];

   const toggleMenuHandler = (evt) => {
      evt.stopPropagation();
      setShowMenu((prev) => !prev);
   };

   const menuItemClickHandler = (evt, clickHandler) => {
      evt.stopPropagation();
      setShowMenu(false);
      clickHandler();
   };

   const removeMenu = () => {
      if(showMenu) setShowMenu(false);
   }

   const wrapperRef = useRef();

   useOutsideClick(wrapperRef, removeMenu);

   return (
      <div ref={wrapperRef} className={`${classes.kebab} ${className ? className : ""}`}>
         <button className={classes["kebab-button"]} onClick={toggleMenuHandler}>
            <div></div>
            <div></div>
            <div></div>
         </button>
         <ul className={`${classes.menu} ${menuAnimation}`}>
            {menu.map((item) => (
               <li
                  className={classes["menu-item"]}
                  key={item.name}
                  onClick={(evt) => menuItemClickHandler(evt, item.onClick)}
               >
                  {item.icon && item.icon}
                  {item.name}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default KebabMenu;
