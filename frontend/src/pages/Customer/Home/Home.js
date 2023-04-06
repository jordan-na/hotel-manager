import { useEffect } from "react";
import MainText from "../../../components/home/MainText/MainText";
import classes from "./Home.module.css";
import ButtonGroup from "../../../components/home/ButtonGroup/ButtonGroup";
import Slideshow from "../../../components/home/Slideshow/Slideshow";
import { useLoaderData } from "react-router-dom";
import HelpText from "../../../components/home/HelpText/HelpText";
import usePageSetter from "../../../hooks/use-page-setter";

const Home = () => {

   const { setCustomerPage } = usePageSetter();

   const pictureData = useLoaderData();

   useEffect(() => {
      setCustomerPage("home");
   }, [setCustomerPage]);

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
