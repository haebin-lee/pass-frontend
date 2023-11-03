import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { createMeeting, addAttendees } from "../services/api";
import styles from "../assets/css/CreateSpaceForm.module.css";
import { qrGenerator } from "./QRCodeGenerator";
import {useLocation} from "react-router-dom";

export default function CreateMeetingForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventAt, setEventAt] = useState("");
  const [registerNow, setRegisterNow] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [attendeeId, setAttendeeId] = useState(0);
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [attendeePhone, setAttendeePhone] = useState("");
  
  const location = useLocation();
  const { editMeeting, editAttendees } = location.state;

  useEffect(() => {  
    if (editMeeting) {
      setName(editMeeting.name);
      setDescription(editMeeting.description);
      setEventAt(editMeeting.eventAt);
      setRegisterNow(editMeeting.registerNow);
    }
    if (editAttendees) {
      setAttendees(editAttendees);
    }
  }, [], []);


  async function generateQRAddr(validationUrl) {
    try {
      const qrDataURL = await qrGenerator(validationUrl);
      return qrDataURL;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "eventAt":
        setEventAt(value);
        break;
      default:
        break;
    }
  }
  function handleChecked(event) {
    setRegisterNow(event.target.checked);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationUrl = getValidationUrl();
    try {
      const qrUrl = await generateQRAddr(validationUrl);
      const body = {
        name: name,
        description: description,
        qrUrl: qrUrl,
        validationUrl: validationUrl,
        registerNow: registerNow,
        eventAt: eventAt,
      };
      console.log('body', body)

      createMeeting(body)
        .then((res) => {
          console.log("add meeting", res);
          console.log(res.data.id, attendees);
          addAttendees(res.data.id, attendees).then((res2) => {
            console.log("add attendees", res2);
          });
          window.location.href = "/spaces/" + res.data.id;
        })
        .catch((error) => {
          console.log("handleSubmit error", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function getValidationUrl() {
    const apiUrl = process.env.REACT_APP_API_URL;
    return apiUrl + "/" + Math.random().toString(36).slice(2, 20);
  }

  const handleAttendeeAdd = () => {
    if (attendeeName && attendeeEmail && attendeePhone) {
      const newAttendee = {
        id: attendeeId,
        name: attendeeName,
        email: attendeeEmail,
        phone: attendeePhone,
      };
      setAttendees([...attendees, newAttendee]);
      setAttendeeId(attendeeId + 1);
      setAttendeeName("");
      setAttendeeEmail("");
      setAttendeePhone("");
    }
  };

  function handleAttendeeChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className={styles.container}>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleName" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="form-control"
            id="formControlName"
            placeholder="Enter your meet-up name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleDescription" className="form-label">
            Description
          </label>
          <textarea
            type="textarea"
            name="description"
            value={description}
            onChange={handleChange}
            className="form-control"
            id="formControlDescription"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleDate" className="form-label">
            Event Date
          </label>
          <input
            type="datetime-local"
            name="eventAt"
            value={eventAt}
            onChange={handleChange}
            className="form-control"
            id="formDate"
          />
        </div>
        <div className="form-check form-switch">
          <label className="form-check-label">Register on the spot</label>
          <input 
            type="checkbox"
            name="registerNow"
            value={registerNow}
            onChange={handleChecked}
            className="form-check-input" 
            role="switch" 
            id="formToggle"/>
        </div>
        <div className="d-grid justify-content-md-end">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>

      {/* <Form>
        <Form.Group className="mb-3" controlId="group_name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Enter your meet-up name"
          />
          <Form.Text className="text-muted" required>
            Enter your meet-up name
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={description}
            onChange={this.handleChange}
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Attendee</Form.Label>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <Attendees attendees={attendees} />
            </tbody>
          </Table>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                name="attendeeName"
                placeholder="Name"
                value={this.state.attendeeName}
                onChange={this.handleAttendeeChange}
              />
            </Col>
            <Col>
              <Form.Control
                name="attendeeEmail"
                placeholder="Email"
                value={this.state.attendeeEmail}
                onChange={this.handleAttendeeChange}
              />
            </Col>
            <Col>
              <Form.Control
                name="attendeePhone"
                placeholder="phone"
                value={this.state.attendeePhone}
                onChange={this.handleAttendeeChange}
              />
            </Col>
            <Col>
              <Button variant="success" onClick={this.handleAttendeeAdd}>
                Add
              </Button>
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Save
        </Button>
      </Form> */}
    </div>
  );
}

function Attendees({ attendees }) {
  return (
    <>
      {attendees.map((attendee) => (
        <tr key={attendee.id}>
          <td>{attendee.id}</td>
          <td>{attendee.name}</td>
          <td>{attendee.email}</td>
          <td>{attendee.phone}</td>
          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            <input type="checkbox" />
          </td>
          <td>
            <button variant="secondary" size="sm">
              Edit
            </button>
          </td>
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
