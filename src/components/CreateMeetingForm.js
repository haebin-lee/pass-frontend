import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { createMeeting } from "../services/api";
import styles from '../assets/css/CreateSpaceForm.module.css';

class CreateMeetingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
  }

  // todo: change not to render every time.
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
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

  render() {
    console.log("rendering");
    const { name, description } = this.state;

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
            <Form.Text className="text-muted">
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
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateMeetingForm;
