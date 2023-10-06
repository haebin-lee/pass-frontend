import React, { Component } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { createMeeting, addAttendees } from "../services/api";
import styles from "../assets/css/CreateSpaceForm.module.css";

class CreateMeetingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      attendees: [],

      attendeeId: 0,
      attendeeName: "",
      attendeeEmail: "",
      attendeePhone: "",
    };
  }

  // todo: change not to render every time.
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, attendees } = this.state;
    createMeeting(name, description)
      .then((res) => {
        console.log("add meeting", res);
        console.log(res.data.id, attendees)
        addAttendees(res.data.id, attendees).then((res2)=> {
          console.log('add attendees', res2)
        })

      })
      .catch((error) => {
        console.log("handleSubmit error", error);
      });
  };

  handleAttendeeAdd = (event) => {
    const { attendeeId, attendeeName, attendeeEmail, attendeePhone } = this.state;
    if (attendeeName && attendeeEmail && attendeePhone) {
      const newAttendee = {
        id: attendeeId,
        name: attendeeName,
        email: attendeeEmail,
        phone: attendeePhone,
      }

      // Add the new attendee to the attendees array
      this.setState((prevState) => ({
        attendees: [...prevState.attendees, newAttendee],
        attendeeId: attendeeId + 1,
        attendeeName: '',
        attendeeEmail: '', 
        attendeePhone: '',
      }))
    }
  }

  handleAttendeeChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    console.log("rendering");
    const { name, description, attendees } = this.state;

    return (
      <div className={styles.container}>
        <Form>
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
        </Form>
      </div>
    );
  }
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
            <Button variant="secondary" size="sm">
              Edit
            </Button>
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
export default CreateMeetingForm;
