import React, { Component, useEffect, useState } from "react";
import CreateMeetingForm from "./CreateMeetingForm";
import { findMeetings } from "../services/api";
import { Card, Col, Row, Button } from "react-bootstrap";
import styles from "../assets/css/SpaceList.module.css";

export default function SpaceList() {
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
        console.error("Error fetching spaces", error);
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
                <Button className={styles.button} onClick={handleRegister}>Register New Meeting</Button>
                <Spaces meetings={meetings} />
            </div>}
        
      </div>
    </>
  );
}

function Spaces({ meetings }) {
  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {meetings.map((meeting) => (
          <Col key={meeting.id}>
            <Card width="200px">
              <Card.Img
                variant="top"
                src="https://picsum.photos/seed/picsum/300/100"
              />
              <Card.Body>
                <Card.Title>{meeting.name}</Card.Title>
                <Card.Text>{meeting.description}</Card.Text>
                <Button variant="primary">Go Somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}