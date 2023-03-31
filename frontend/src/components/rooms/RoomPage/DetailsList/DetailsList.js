import classes from "./DetailsList.module.css";

const DetailsList = ({ title, icon, list }) => {

   const listItems = list.map((item) => {
      const id = item.amenityId || item.issueId;
      const listDetails = item.amenity || item.issue;
      return (
         <li key={id} className={classes["list-item"]}>
            {listDetails}
         </li>
      );
   });

   return (
      <div className={classes["details-list-container"]}>
         <div className={classes["header-container"]}>
            <h2 className={classes.header}>{title}</h2>
            {icon}
         </div>
         <ul className={classes.list}>{listItems}</ul>
      </div>
   );
};

export default DetailsList;
