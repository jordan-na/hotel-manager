import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root/Root";
import HomePage from "./pages/Home/Home";
import RoomsLayout from "./layouts/Rooms/Rooms";
import RoomsPage from "./pages/Rooms/Rooms";
import RoomPage from "./pages/Rooms/Room/Room";
import ReservationsPage from "./pages/Reservations/Reservations";
import BookingsPage from "./pages/Reservations/Bookings/Bookings";
import RentingsPage from "./pages/Reservations/Rentings/Rentings";
import {loader as slideshowLoader} from "./components/home/Slideshow/Slideshow";
import { loader as roomsLoader } from "./pages/Rooms/Rooms";
import {loader as roomLoader} from "./pages/Rooms/Room/Room";
import { action as createBookingAction } from "./components/rooms/RoomPage/BookingFormMini/BookingFormMini";
import { loader as bookingsLoader } from "./pages/Reservations/Bookings/Bookings";
import { loader as rentingsLoader } from "./pages/Reservations/Rentings/Rentings";
import BookingDetails from "./components/reservations/BookingDetails/BookingDetails";
import { loader as bookingDetailsLoader } from "./components/reservations/BookingDetails/BookingDetails";
import RentingDetails from "./components/reservations/RentingDetails/RentingDetails";
import { loader as rentingDetailsLoader } from "./components/reservations/RentingDetails/RentingDetails";
import ProfilePage from "./pages/Profile/Profile";
import { loader as profileLoader } from "./pages/Profile/Profile";
import { action as updateBookingAction } from "./components/reservations/ReservationDetails/EditDatesForm/EditDatesForm";

const router = createBrowserRouter([
   {
      path: "/",
      element: <RootLayout />,
      children: [
         {
            index: true,
            element: <HomePage />,
            loader: slideshowLoader,
         },
         {
            path: "rooms",
            element: <RoomsLayout />,
            children: [
               {
                  index: true,
                  element: <RoomsPage />,
                  loader: roomsLoader,
               },
               {
                  path: ":roomId",
                  element: <RoomPage />,
                  loader: roomLoader,
                  action: createBookingAction,
               },
            ],
         },
         {
            path: "reservations",
            element: <ReservationsPage />,
            children: [
               {
                  path: "",
                  element: <BookingsPage />,
                  loader: bookingsLoader,
               },
               {
                  path: ":bookingId",
                  element: <BookingDetails />,
                  loader: bookingDetailsLoader,
                  action: updateBookingAction,
               },
               {
                  path: "rentings",
                  element: <Outlet />,
                  children: [
                     {
                        path: "",
                        element: <RentingsPage />,
                        loader: rentingsLoader,
                     },
                     {
                        path: ":rentingId",
                        element: <RentingDetails />,
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
]);

const App = () => {
   return <RouterProvider router={router}></RouterProvider>;
};

export default App;
