import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import classes from "./Root.module.css";

const Root = () => {
   return (
      <div className={classes.app}>
         <MainNavigation />
         <main className={classes.main}>
            <Outlet></Outlet>
         </main>
      </div>
   );
};

export default Root;
