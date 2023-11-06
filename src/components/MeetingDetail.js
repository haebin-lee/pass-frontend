import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import styles from '../assets/css/MeetingDetail.module.css';
import {findMeeting} from '../services/api';
import QRCode from './QRCode';

export default function MeetingDetail() {
    const {id} = useParams();
    const [meeting, setMeeting] = useState({});
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        findMeeting(id).then((response) => {
            setMeeting(response.data)
            setAttendees(response.data.attendees);
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

    const onClickQR = () => {     
      const newTab = window.open('', '_blank');
      const qrCodeHTML = renderToString(<QRCode qrUrl={meeting.qrUrl} />);
      newTab.document.write(qrCodeHTML);
    };

    function formatDateTime(inputDateTime) {
      if (inputDateTime == null) return null; 
      
      const year = inputDateTime[0];
      const month = inputDateTime[1].toString().padStart(2, "0");
      const day = inputDateTime[2].toString().padStart(2, "0");
      const hours = inputDateTime[3].toString().padStart(2, "0");
      const minutes = inputDateTime[4].toString().padStart(2, "0");
      const period = inputDateTime[3] >= 12 ? "PM" : "AM";

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}${period}`;
      return formattedDateTime;
    }

    return (
      <>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2 className={styles.centeredContent}>{meeting.name}</h2>
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
                  onClick={onClickQR}
                >
                  QR
                </button>
              </div>
              <h4>Event Date</h4>
              <p>{formatDateTime(meeting.eventAt)}</p>
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
                    <th scope="col">Participation</th>
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
          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`inlineCheckbox${attendee.id}`}
                value="option3"
                checked={attendee.status === 'ATTENDED'}
                disabled
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}