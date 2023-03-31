import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../store/page/page-slice";
import MainText from "../../components/home/MainText/MainText";
import classes from "./Home.module.css";
import ButtonGroup from "../../components/home/ButtonGroup/ButtonGroup";
import Slideshow from "../../components/home/Slideshow/Slideshow";
import { useLoaderData } from "react-router-dom";
import HelpText from "../../components/home/HelpText/HelpText";

const Home = () => {

   const dispatch = useDispatch();

   const pictureData = useLoaderData();

   useEffect(() => {
      dispatch(setPage("home"));
   }, [dispatch]);

   return (
      <div className={classes["home-page"]}>
         <MainText />
         <ButtonGroup />
         <HelpText />
         {pictureData && <Slideshow pictureData={pictureData}/>}
      </div>
   );
};

export default Home;
