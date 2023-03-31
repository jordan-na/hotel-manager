import { Card } from "@nextui-org/react";
import classes from "./EmployeesList.module.css";
import { BsFullscreen } from "react-icons/bs";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import { Loading } from "@nextui-org/react";
import { useState, useEffect } from "react";
import EmployeesModal from "./EmployeesModal/EmployeesModal";

const EmployeesList = ({ employees }) => {

   const [resolvedEmployees, setResolvedEmployees] = useState();
   const [showModal, setShowModal] = useState(false);

   const showEmployeesModalHandler = () => {
      setShowModal(true);
   };

   const removeEmployeesModalHandler = () => {
      setShowModal(false);
   };

   const loading = (
      <div className={classes.loading}>
         <Loading size="lg" />
      </div>
   );

   useEffect(() => {
      (async () => {
         const resolvedEmployees = await employees;
         setResolvedEmployees(resolvedEmployees);
      })();
   }, [employees])

   const employeesList = (
      <Suspense fallback={loading}>
        <Await resolve={employees}>
          {(loadedEmployees) => {
            const managerIndex = loadedEmployees.findIndex((employee) => employee.positionTitle === "Manager");
            loadedEmployees = [
               loadedEmployees[managerIndex],
               ...loadedEmployees.slice(0, managerIndex),
               ...loadedEmployees.slice(managerIndex + 1, loadedEmployees.length)
            ];
             return (
               <ul className={classes.employees}>
                  {loadedEmployees.map((employee) => {
                     return (
                        <li key={employee.employeeId} className={`${classes["employee"]} ${employee.positionTitle === "Manager" ? classes.manager : ""}`}>
                           <div className={classes["no-overflow"]}>{employee.fullName}</div>
                           <div className={classes["no-overflow"]}>{employee.positionTitle}</div>
                           <div>{employee.age}</div>
                        </li>
                     );
                  })}
               </ul>
             )
         }}
        </Await>
      </Suspense>
   );

   return (
      <Card variant="bordered" className={classes.card}>
         <Card.Header css={{ padding: "0" }}>
            <div className={classes.header}>
               <h2 className={classes.title}>Hotel employees</h2>
            </div>
         </Card.Header>
         <Card.Divider />
         <Card.Body css={{ padding: "0" }}>
            <div className={classes.table}>
               <div className={classes["columns"]}>
                  <div>Name</div>
                  <div>Position</div>
                  <div>Age</div>
               </div>
               {employeesList}
            </div>
         </Card.Body>
         <Card.Divider />
         <Card.Footer css={{ padding: "0" }}>
            <div className={classes.footer}>
               <p>{resolvedEmployees ? `Viewing ${resolvedEmployees.length} employees` : "Loading..."}</p>
               {resolvedEmployees && (
                  <button onClick={showEmployeesModalHandler}>
                     <BsFullscreen size="1.5rem" />
                  </button>
               )}
            </div>
         </Card.Footer>
         <EmployeesModal
            open={showModal}
            onClose={removeEmployeesModalHandler}
            employees={resolvedEmployees}
         />
      </Card>
   );
};

export default EmployeesList;