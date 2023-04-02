import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root/Root";
import HomePage from "./pages/Home/Home";
import RoomsLayout from "./layouts/Rooms/Rooms";
import RoomsPage from "./pages/Rooms/Rooms";
import RoomPage from "./pages/Rooms/Room/Room";
import ReservationsPage from "./pages/Reservations/Reservations";
import {loader as slideshowLoader} from "./components/home/Slideshow/Slideshow";
import { loader as roomsLoader } from "./pages/Rooms/Rooms";
import {loader as roomLoader} from "./pages/Rooms/Room/Room";
import { action as createBookingAction } from "./components/rooms/RoomPage/BookingFormMini/BookingFormMini";

const router = createBrowserRouter([
   {
      path: "/",
      element: <RootLayout />,
      children: [
         {
            index: true,
            element: <HomePage />,
            loader: slideshowLoader
         },
         {
            path: "rooms",
            element: <RoomsLayout />,
            children: [
               {
                  index: true,
                  element: <RoomsPage />,
                  loader: roomsLoader
               },
               {
                  path: ":roomId",
                  element: <RoomPage />,
                  loader: roomLoader,
                  action: createBookingAction
               }
            ]
         },
         {
            path: "reservations",
            element: <ReservationsPage />,
            children: [
               {
                  path: "bookings",
                  element: <h1>Bookings</h1>
               },
               {
                  path: "reservations",
                  element: <h1>Reservations</h1>
               }
            ]
         },
      ],
   },
]);

const App = () => {
   return <RouterProvider router={router}></RouterProvider>;
};

export default App;
