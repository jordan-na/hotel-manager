import classes from "./SearchBar.module.css";
import { useRef } from "react";
import { GoSearch } from "react-icons/go";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm/SearchForm";

const SearchBar = () => {

   const [showFullSearchBar, setShowFullSearchBar] = useState(false);
   const [searchBarAnimation, setSearchBarAnimation] = useState(null);

   const [distanceFromTop, setDistanceFromTop] = useState(null);
   const [fixedSearchBarAnimation, setFixedSearchBarAnimation] = useState(null);

   const [formIsActive, setFormIsActive] = useState(false);

   const searchBarRef = useRef();

   useEffect(() => {
      window.addEventListener("scroll", () => {
         if(!searchBarRef.current) return;
         setDistanceFromTop(searchBarRef.current.getBoundingClientRect().top);
      });
   }, []);

   useEffect(() => {
      if(!distanceFromTop || !searchBarRef.current) return;
      if(distanceFromTop + searchBarRef.current.offsetHeight - 76 <= 0) {
         setFixedSearchBarAnimation("slide-down");
      } else if(fixedSearchBarAnimation) {
         setFixedSearchBarAnimation("slide-up");
      }
   }, [distanceFromTop, fixedSearchBarAnimation]);

   const showFullSearchBarHandler = () => {
      setShowFullSearchBar(true);
      setSearchBarAnimation("fade-out");
   };

   const overlayClickHandler = () => {
      if(formIsActive) unfocusFormHandler();
      else removeFullSearchBarHandler();
   };

   const removeFullSearchBarHandler = () => {
      setShowFullSearchBar(false);
      setSearchBarAnimation("fade-in");
      setFormIsActive(false);
   };

   const focusFormHandler = (evt) => {
      evt.stopPropagation();
      setFormIsActive(true);
   };

   const unfocusFormHandler = () => {
      setFormIsActive(false);
   };

   let searchBarClasses = classes["search-bar"];

   if(searchBarAnimation === "fade-in") {
      searchBarClasses += " " + classes["fade-in"];
   } else if (searchBarAnimation === "fade-out") {
      searchBarClasses += " " + classes["fade-out"];
   }

   let fixedSeachBarClasses = classes["fixed-search-bar"];

   if(fixedSearchBarAnimation === "slide-down") {
      fixedSeachBarClasses += " " + classes["slide-down"];
   } else if (fixedSearchBarAnimation === "slide-up") {
      fixedSeachBarClasses += " " + classes["slide-up"];
   }

   return (
      <>
         <div
            className={searchBarClasses}
            onClick={showFullSearchBarHandler}
            ref={searchBarRef}
         >
            <input type="text" placeholder="Search rooms" />
            <GoSearch />
         </div>
         <div className={fixedSeachBarClasses} onClick={showFullSearchBarHandler}>
            SEARCH ROOMS <GoSearch />
         </div>
         <div className={`${classes["full-search-bar"]} ${showFullSearchBar ? classes.show : classes.remove}`} onClick={unfocusFormHandler}>
            <SearchForm
               isActive={formIsActive}
               isInView={showFullSearchBar}
               onClick={focusFormHandler}
               unFocus={unfocusFormHandler}
               remove={removeFullSearchBarHandler}
            />
         </div>
         {showFullSearchBar && <div className={classes.overlay} onClick={overlayClickHandler}></div>}
      </>
   );
};

export default SearchBar;