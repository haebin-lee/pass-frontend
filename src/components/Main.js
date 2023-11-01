import React from 'react';
import MeetingList from './MeetingList';
import styles from "../assets/css/Main.module.css";


export default function Main() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.introduction}>

          </div>
          <div className={styles.meetinglist}>
            <MeetingList />
          </div>
        </div>
      </>
    );
}