import AuthCard from "../../components/AuthCard/AuthCard";
import Slideshow from "../../components/home/Slideshow/Slideshow";
import { useLoaderData } from "react-router-dom";

const Auth = () => {

   const pictureData = useLoaderData();

   return (
      <>
         <Slideshow pictureData={pictureData} />
         <AuthCard visible={true} />
      </>
   );
};

export default Auth;