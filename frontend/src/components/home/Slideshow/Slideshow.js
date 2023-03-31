import classes from "./Slideshow.module.css";

const Slideshow = ({ pictureData, animate }) => {

   const pictures = pictureData.map(picData => picData.urls.regular);

   return (
      <div className={classes["slideshow-container"]}>
         <div className={`${classes.slideshow} ${animate ? classes.animate : ""}`}>
            {pictures
               .map((picture, index) => {
                  return (
                     <div key={index} className={classes["slideshow-img"]}>
                        <img src={picture} alt="background-pic" />
                     </div>
                  );
               })
               .concat(
                  <div key={21} className={classes["slideshow-img"]}>
                     <img src={pictures[0]} alt="background-pic" />
                  </div>
               )}
         </div>
         <div className={classes.overlay}></div>
      </div>
   );
};

export const loader = async () => {
   try {
      const endpoint = "https://api.unsplash.com/collections/158643/photos?per_page=20&orientation=landscape&client_id=wAgadzm8Kd9wGGxpScQUzUP0ipY4s-dBVGA40bFcH5c";
      const response = await fetch(endpoint);
      if(!response.ok) {
         throw new Error();
      }
      return response;
   } catch(err) {
      return null;
   }
};

export default Slideshow;