import React, { useRef, useEffect } from "react";

const useOutsideClick = (ref, action) => {
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (ref.current && !ref.current.contains(event.target)) {
            action();
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [ref, action]);
};

export default useOutsideClick;
