import React from 'react';
import MeetingList from './MeetingList';
import styles from "../assets/css/Main.module.css";
import Introduction from './Introduction';


export default function Main() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.introduction}>
            <Introduction />
          </div>
          <div className={styles.meetinglist}>
            <MeetingList />
          </div>
        </div>
      </>
    );
}