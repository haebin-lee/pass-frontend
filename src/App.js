import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateMeetingForm from "./components/CreateMeetingForm";
import MeetingList from "./components/MeetingList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import Main from "./components/Main";
import styles from "./assets/css/App.module.css";
import MeetingDetail from "./components/MeetingDetail";
import Validation from "./components/Validation";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/meetings",
    element: <MeetingList />,
  },
  {
    path: "/create-space",
    element: <CreateMeetingForm />,
  },
  {
    path: '/spaces/:id',
    element: <MeetingDetail />
  },
  {
    path:'/validation/:qrAddr',
    element: <Validation />
  }
]);

function App() {
  return (
    <>
        <Nav />
        <div>
          <RouterProvider router={router} />
        </div>
        
    </>
  );
}

export default App;
