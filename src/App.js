import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateMeetingForm from "./components/CreateMeetingForm";
import MeetingList from "./components/MeetingList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import Main from "./components/Main";

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
]);

function App() {
  return (
    // <CreateMeetingForm />
    // <SpaceList />
    <>
        <Nav />
        <RouterProvider router={router} />
    </>
  );
}

export default App;
