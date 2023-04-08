import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/Auth/Auth";
import { action as authAction } from "./components/AuthCard/AuthCard";
import CustomerRootLayout from "./layouts/Customer/Root/Root";
import CustomerHomePage from "./pages/Customer/Home/Home";
import CustomerRoomsLayout from "./layouts/Customer/Rooms/Rooms";
import CustomerRoomsPage from "./pages/Customer/Rooms/Rooms";
import CustomerRoomPage from "./pages/Customer/Rooms/Room/Room";
import CustomerReservationsPage from "./pages/Customer/Reservations/Reservations";
import CustomerBookingsPage from "./pages/Customer/Reservations/Bookings/Bookings";
import CustomerRentingsPage from "./pages/Customer/Reservations/Rentings/Rentings";
import {loader as slideshowLoader} from "./components/home/Slideshow/Slideshow";
import { loader as roomsLoader } from "./pages/Customer/Rooms/Rooms";
import {loader as roomLoader} from "./pages/Customer/Rooms/Room/Room";
import { action as createBookingAction } from "./components/rooms/RoomPage/BookingFormMini/BookingFormMini";
import { loader as bookingsLoader } from "./pages/Customer/Reservations/Bookings/Bookings";
import { loader as rentingsLoader } from "./pages/Customer/Reservations/Rentings/Rentings";
import CustomerBookingDetails from "./components/reservations/BookingDetails/BookingDetails";
import { loader as bookingDetailsLoader } from "./components/reservations/BookingDetails/BookingDetails";
import CustomerRentingDetails from "./components/reservations/RentingDetails/RentingDetails";
import { loader as rentingDetailsLoader } from "./components/reservations/RentingDetails/RentingDetails";
import ProfilePage from "./pages/Customer/Profile/Profile";
import { loader as profileLoader } from "./pages/Customer/Profile/Profile";
import { action as updateBookingAction } from "./components/reservations/ReservationDetails/EditDatesForm/EditDatesForm";
import EmployeeRootLayout from "./layouts/Employee/Root/Root";
import EmployeeRentingsPage from "./pages/Employee/Rentings/Rentings";
import { loader as employeeRentingsLoader } from "./pages/Employee/Rentings/Rentings";
import EmployeeBookingsPage from "./pages/Employee/Bookings/Bookings";
import { loader as employeeBookingsLoader } from "./pages/Employee/Bookings/Bookings";
import EmployeeBookingDetails from "./components/Employee/BookingDetails/BookingDetails";
import { loader as employeeBookingDetailsLoader } from "./components/Employee/BookingDetails/BookingDetails";
import EmployeeRentingDetails from "./components/Employee/RentingDetails/RentingDetails";
import { loader as employeeRentingDetailsLoader } from "./components/Employee/RentingDetails/RentingDetails";
import NewRentingPage from "./pages/Employee/NewRenting/NewRenting";
import { loader as newRentingLoader } from "./pages/Employee/NewRenting/NewRenting";
import { action as newRentingAction } from "./pages/Employee/NewRenting/NewRenting";
import ViewsPage from "./pages/Employee/Views/Views";
import RoomsPerAreaPage from "./pages/Employee/Views/RoomsPerArea/RoomsPerAreaPage";
import { loader as roomsPerAreaLoader } from "./pages/Employee/Views/RoomsPerArea/RoomsPerAreaPage";
import ViewsHotelsPage from "./pages/Employee/Views/Hotels/Hotels";
import { loader as viewsHotelsLoader } from "./pages/Employee/Views/Hotels/Hotels";
import CapacityOfRoomsPage from "./pages/Employee/Views/CapacityOfRooms/CapacityOFRooms";
import { loader as capacityOfRoomsLoader } from "./pages/Employee/Views/CapacityOfRooms/CapacityOFRooms";

const router = createBrowserRouter([
   {
      path: "/",
      element: <AuthPage />,
      loader: slideshowLoader,
      action: authAction,
   },
   {
      path: "/customer",
      element: <CustomerRootLayout />,
      children: [
         {
            index: true,
            element: <CustomerHomePage />,
            loader: slideshowLoader,
         },
         {
            path: "rooms",
            element: <CustomerRoomsLayout />,
            children: [
               {
                  index: true,
                  element: <CustomerRoomsPage />,
                  loader: roomsLoader,
               },
               {
                  path: ":roomId",
                  element: <CustomerRoomPage />,
                  loader: roomLoader,
                  action: createBookingAction,
               },
            ],
         },
         {
            path: "reservations",
            element: <CustomerReservationsPage />,
            children: [
               {
                  path: "",
                  element: <CustomerBookingsPage />,
                  loader: bookingsLoader,
               },
               {
                  path: ":bookingId",
                  element: <CustomerBookingDetails />,
                  loader: bookingDetailsLoader,
                  action: updateBookingAction,
               },
               {
                  path: "rentings",
                  element: <Outlet />,
                  children: [
                     {
                        path: "",
                        element: <CustomerRentingsPage />,
                        loader: rentingsLoader,
                     },
                     {
                        path: ":rentingId",
                        element: <CustomerRentingDetails />,
                        loader: rentingDetailsLoader,
                     },
                  ],
               },
            ],
         },
         {
            path: "profile",
            element: <ProfilePage />,
            loader: profileLoader,
         },
      ],
   },
   {
      path: "/employee",
      element: <EmployeeRootLayout />,
      children: [
         {
            path: "bookings",
            element: <Outlet />,
            children: [
               {
                  path: "",
                  element: <EmployeeBookingsPage />,
                  loader: employeeBookingsLoader,
               },
               {
                  path: ":bookingId",
                  element: <EmployeeBookingDetails />,
                  loader: employeeBookingDetailsLoader,
               },
            ],
         },
         {
            path: "rentings",
            element: <Outlet />,
            children: [
               {
                  path: "",
                  element: <EmployeeRentingsPage />,
                  loader: employeeRentingsLoader,
               },
               {
                  path: "new",
                  element: <NewRentingPage />,
                  loader: newRentingLoader,
                  action: newRentingAction,
               },
               {
                  path: ":rentingId",
                  element: <EmployeeRentingDetails />,
                  loader: employeeRentingDetailsLoader,
               },
            ],
         },
         {
            path: "views",
            element: <ViewsPage />,
         },
         {
            path: "views/rooms-per-area",
            element: <RoomsPerAreaPage />,
            loader: roomsPerAreaLoader,
         },
         {
            path: "views/hotels",
            element: <ViewsHotelsPage />,
            loader: viewsHotelsLoader,
         },
         {
            path: "views/hotels/:hotelId",
            element: <CapacityOfRoomsPage />,
            loader: capacityOfRoomsLoader,
         },
         {
            path: "profile",
            element: <ProfilePage />,
            loader: profileLoader,
         },
      ],
   },
]);

const App = () => {
   return <RouterProvider router={router}></RouterProvider>;
};

export default App;
