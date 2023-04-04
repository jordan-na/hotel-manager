import { useDispatch, useSelector } from "react-redux";
import { setCustomerPage, setEmployeePage } from "../store/page/page-slice";

const usePageSetter = () => {
   const dispatch = useDispatch();
   const customerPage = useSelector(state => state.page.customerPage);
   const employeePage = useSelector(state => state.page.employeePage);

   const setCustomerPageHandler = (page) => {
      dispatch(setCustomerPage(page));
   };

   const setEmployeePageHandler = (page) => {
      dispatch(setEmployeePage(page));
   };

   return {
      customerPage,
      employeePage,
      setCustomerPage: setCustomerPageHandler,
      setEmployeePage: setEmployeePageHandler
   };
};

export default usePageSetter;