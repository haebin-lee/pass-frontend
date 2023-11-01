import React, { Component, useEffect, useState } from "react";
import CreateMeetingForm from "./CreateMeetingForm";
import { findMeetings } from "../services/api";
import styles from "../assets/css/MeetingList.module.css";

export default function MeetingList() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    findMeetings()
      .then((response) => {
        setMeetings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meeting", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  function handleRegister() {
    console.log("Clicked");
    setShowRegisterForm(true);
  }

  return (
    <>
      <div className={styles.container}>
        {showRegisterForm ? 
            <CreateMeetingForm /> : 
            <div>
                {/* <Button className={styles.button} onClick={handleRegister}>Register New Meeting</Button> */}
                <Meeting meetings={meetings} />
            </div>}
        
      </div>
    </>
  );
}

function Meeting({ meetings }) {
  return (
    <>
      <h2 style={{padding: '3px'}}>Upcoming Events</h2>
      <div className="row row-cols-4 g-5">
        {meetings.map((meeting) => (
          <div className="col">
            <div className="card" style={{ width: "300px", height: "300px" }}>
              <img
                src="https://picsum.photos/seed/picsum/300/100"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{meeting.name}</h5>
                <p className="card-text">{meeting.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
