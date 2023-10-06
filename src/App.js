import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateMeetingForm from "./components/CreateMeetingForm";
import MeetingList from "./components/MeetingList";
import {
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MeetingList />
  },
  {
    path: "/create-space",
    element: <CreateMeetingForm />
  }
])

function App() {
  return (
    // <CreateMeetingForm />
    // <SpaceList />
    <RouterProvider router={router}/>
  );
}

export default App;
