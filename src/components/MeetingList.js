import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findMeetings } from "../services/api";
import styles from "../assets/css/MeetingList.module.css";

export default function MeetingList() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findMeetings()
      .then((response) => {
        setMeetings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meetings", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const ellipsis = (str) => {
    const length = 100;
    if (str.length > length) {
        str = str.substr(0, length - 2) + '...';
    }
    return str;
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <Meeting meetings={meetings} ellipsis={ellipsis}/>
        </div>
      </div>
    </>
  );
}

function Meeting({ meetings, ellipsis}) {
  return (
    <>
      <h2 style={{ padding: "3px" }}>Upcoming Events</h2>
      <div className="row row-cols-4 g-5">
        {meetings.map((meeting) => (
          <div className="col" key={meeting.id}>
            <Link to={`/spaces/${meeting.id}`}>
              {/* Use Link to navigate to MeetingDetail */}
              <div className="card" style={{ width: "300px", height: "300px" }}>
                <img
                  src="https://picsum.photos/seed/picsum/300/100"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{meeting.name}</h5>
                  <p className="card-text">{ellipsis(meeting.description)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
