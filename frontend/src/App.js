import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root/Root";
import HomePage from "./pages/Home/Home";
import RoomsLayout from "./layouts/Rooms/Rooms";
import RoomsPage from "./pages/Rooms/Rooms";
import RoomPage from "./pages/Rooms/Room/Room";
import BookingsPage from "./pages/Bookings/Bookings";
import {loader as slideshowLoader} from "./components/home/Slideshow/Slideshow";
import { loader as roomsLoader } from "./pages/Rooms/Rooms";
import {loader as roomLoader} from "./pages/Rooms/Room/Room";

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
                  loader: roomLoader
               }
            ]
         },
         {
            path: "bookings",
            element: <BookingsPage />,
         },
      ],
   },
]);

const App = () => {
   return <RouterProvider router={router}></RouterProvider>;
};

export default App;
