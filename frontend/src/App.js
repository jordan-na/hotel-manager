import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/Auth/Auth";
import { action as authAction } from "./components/AuthCard/AuthCard";
import CustomerRootLayout from "./layouts/Root/Root";
import CustomerHomePage from "./pages/Customer/Home/Home";
import CustomerRoomsLayout from "./layouts/Rooms/Rooms";
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
import CustomerProfilePage from "./pages/Customer/Profile/Profile";
import { loader as profileLoader } from "./pages/Customer/Profile/Profile";
import { action as updateBookingAction } from "./components/reservations/ReservationDetails/EditDatesForm/EditDatesForm";

const router = createBrowserRouter([
   {
      path: "/",
      element: <AuthPage />,
      loader: slideshowLoader,
      action: authAction
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
            element: <CustomerProfilePage />,
            loader: profileLoader,
         },
      ],
   },
   {
      path: "/employee",
      element: <h1>Employee</h1>
   }
]);

const App = () => {
   return <RouterProvider router={router}></RouterProvider>;
};

export default App;
