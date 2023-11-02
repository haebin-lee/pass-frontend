import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import styles from '../assets/css/MeetingDetail.module.css';
import {findMeeting} from '../services/api';

export default function MeetingDetail() {
    const {id} = useParams();
    const [meeting, setMeeting] = useState({});

    useEffect(() => {
        findMeeting(id).then((response) => {
            setMeeting(response.data)
        }).catch((error) => { 
            console.error('Error fetching meeting', error);
        })
    })

    return (
      <>
        <div className={styles.container}>
          <div className={styles.title}>
            <p>{`This is the meeting detail ${id}`}</p>
          </div>
          <div className={styles.detil}>
            <p>{meeting.id}</p>
            <p>{meeting.name}</p>
            <p>{meeting.description}</p>
            <div id="qrcode"></div>
            
          </div>
        </div>
      </>
    );
}