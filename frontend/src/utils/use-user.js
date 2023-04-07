// import { useDispatch, useSelector } from "react-redux";
// import { setUserId, setAccountType, setExpirationDate, logout } from "../store/page/user-slice";

// const useUser = () => {

//    const dispatch = useDispatch();
//    const userId = useSelector(state => state.user.userId);
//    const accountType = useSelector(state => state.user.accountType);
//    const expirationDate = useSelector(state => state.user.expirationDate);

//    const setUserIdHandler = (userId) => {
//       dispatch(setUserId(userId));
//    };

//    const setAccountTypeHandler = (accountType) => {
//       dispatch(setAccountType(accountType));
//    };

//    const setExpirationDateHandler = (expirationDate) => {
//       dispatch(setExpirationDate(expirationDate));
//    };

//    const logoutHandler = () => {
//       dispatch(logout());
//    }

//    return {
//       userId,
//       accountType,
//       expirationDate,
//       setUserId: setUserIdHandler,
//       setAccountType: setAccountTypeHandler,
//       setExpirationDate: setExpirationDateHandler,
//       logout: logoutHandler
//    }
// };

export const getUserId = () => {
   return localStorage.getItem("userId");
};

export const setUserId = (userId) => {
   localStorage.setItem("userId", userId);
};

export const getAccountType = () => {
   return localStorage.getItem("accountType");
};

export const setAccountType = (accountType) => {
   localStorage.setItem("accountType", accountType);
};

export const logout = () => {
   localStorage.removeItem("userId");
   localStorage.removeItem("accountType");
};