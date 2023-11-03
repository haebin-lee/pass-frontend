import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from '../assets/css/MeetingDetail.module.css';
import {findMeeting} from '../services/api';

export default function MeetingDetail() {
    const {id} = useParams();
    const [meeting, setMeeting] = useState({});
    const [attendees, setAttendees] = useState([]);
    const [showQRCode, setShowQRCode] = useState(false);

    useEffect(() => {
        findMeeting(id).then((response) => {
            console.log(response.data)
            setMeeting(response.data)
            setAttendees(attendeeData);
        }).catch((error) => { 
            console.error('Error fetching meeting', error);
        })
    },{});
    const navigate = useNavigate();

    function onClickEdit() {
      const state = {
        editMeeting: meeting,
        editAttendees: attendees,
      };
      navigate('/create-space', {state});
    }

    return (
      <>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2 className={styles.centeredContent}>{meeting.name}</h2>
            <b>Hosted by</b>
          </div>
          <div className={styles.detail_container}>
            <div className={styles.detail}>
              <div style={{ textAlign: "right" }}>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  style={{ margin: "2px" }}
                  onClick={onClickEdit}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  style={{ margin: "2px" }}
                >
                  QR
                </button>
              </div>
              <h4>Event Date</h4>
              <p>{meeting.eventAt}</p>
              <h4 className={styles.description}>Description</h4>
              <p>{meeting.description}</p>
            </div>
            <div className={styles.etc}></div>
            <div className={styles.host}>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">phone</th>
                  </tr>
                </thead>
                <tbody>
                  <Attendees attendees={meeting.attendees}/>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
}

function Attendees({ attendees }) {
  attendees = (attendees == null? [] : attendees);
  return (
    <>
      {attendees.map((attendee) => (
        <tr key={attendee.id}>
          <th scope="row"></th>
          <td>{attendee.name}</td>
          <td>{attendee.email}</td>
          <td>{attendee.phone}</td>
        </tr>
      ))}
    </>
  );
}

const attendeeData = [
  { id: 1, name: "Lucy", email: "hblee8080@gmail.com", phone: "6267863192" },
  { id: 2, name: "Lucy", email: "hblee8080@gmail.com", phone: "6267863192" },
  { id: 3, name: "Lucy", email: "hblee8080@gmail.com", phone: "6267863192" },
];
