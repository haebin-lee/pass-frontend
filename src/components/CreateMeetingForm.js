import React, { Component } from "react";
import { Button, Form, Row, Col, Table, Container } from "react-bootstrap";
import { createMeeting } from "../services/api";
import styles from "../assets/css/CreateSpaceForm.module.css";

class CreateMeetingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      attendees: [],
    };
  }

  // todo: change not to render every time.
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { name, description } = this.state;
    console.log("submit", name, description);
    createMeeting(name, description)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("handleSubmit error", error);
      });
  };

  handleAttendeeAdd = (event) => {
    console.log(event)
  }
  
  handleAttendeeChange = (event) => {
    console.log(event.target.value)
  }

  render() {
    console.log("rendering");
    const { name, description, attendees} = this.state;

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
                <Form.Control placeholder="Name" 
                  />
              </Col>
              <Col>
                <Form.Control placeholder="Email" />
              </Col>
              <Col>
                <Form.Control placeholder="phone" />
              </Col>
              <Col>
                <Button variant="success">Add</Button>
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
        <tr>
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
