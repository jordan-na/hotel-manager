import { Modal, Text } from "@nextui-org/react";
import classes from "./EmployeesModal.module.css";

const EmployeesModal = ({ open, onClose, employees }) => {

   let numEmployees = null;
   if(employees !== undefined && employees !== null) {
      numEmployees = employees.length;
      const managerIndex = employees.findIndex((employee) => employee.positionTitle === "Manager");
      employees = [
         employees[managerIndex],
         ...employees.slice(0, managerIndex),
         ...employees.slice(managerIndex + 1, employees.length),
      ];
   } else {
      employees = [];
   }



   const employeesList = employees.map((employee) => {
      return (
         <li key={employee.employeeId} className={`${classes.employee} ${employee.positionTitle === "Manager" ? classes.manager : ""}`}>
            <div>{employee.fullName}</div>
            <div>{employee.positionTitle}</div>
            <div>{`${employee.street}, ${employee.city}, ${employee.postalCode}`}</div>
            <div>{employee.SSN}</div>
            <div>{employee.age}</div>
         </li>
      );
   });

   return (
      <Modal open={open} onClose={onClose} width="70rem" scroll className={classes.modal} closeButton>
         <Text size="x-large">Viewing Employee Details {numEmployees ? `(${numEmployees})` : ""}</Text>
         <div className={classes.table}>
            <div className={classes.columns}>
               <div>Name</div>
               <div>Position</div>
               <div>Address</div>
               <div>SSN</div>
               <div>Age</div>
            </div>
            <ul className={classes.employees}>
               {employeesList}
            </ul>
         </div>
      </Modal>
   );
};

export default EmployeesModal;