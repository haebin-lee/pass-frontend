import React, { useState, useEffect } from "react";
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
  
  const location = useLocation();
  const editMeeting = location.state != null ? location.state.editMeeting : null;
  const editAttendees = location.state != null ? location.state.editAttendees : null;
  
  
  useEffect(() => {  
    if (editMeeting != null) {
      setName(editMeeting.name);
      setDescription(editMeeting.description);
      setEventAt(formatDate(editMeeting.eventAt));
      setRegisterNow(editMeeting.registerNow);
    }
    if (editAttendees) {
      setAttendees(editAttendees);
    }
  }, []);

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

  const addAttendee = (newAttendee) => {
    setAttendees([...attendees, newAttendee]);
  };

  function handleAttendeeChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  function formatDate(dateArray) {
    const [year, month, day, hour, minute] = dateArray;
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    return formattedDate;
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
            id="formToggle"
          />
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Participation</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            <Attendees attendees={attendees} addAttendee={addAttendee}/>
          </tbody>
        </table>
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
    </div>
  );
}

function Attendees({ attendees, addAttendee}) {
  return (
    <>
      {attendees.map((attendee) => (
        <tr key={attendee.id}>
          <td>{attendee.id}</td>
          <td>{attendee.name}</td>
          <td>{attendee.email}</td>
          <td>{attendee.phone}</td>
          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            <input className="form-check-input" type="checkbox" />
          </td>
          <td>
            <button className="btn btn-outline-success btn-sm">Edit</button>
          </td>
        </tr>
      ))}
      <AddAttendee addAttendee={addAttendee} />
    </>
  );
}

function AddAttendee({addAttendee}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleAddClick = (event) => {
    event.preventDefault()
    const newAttendee = {
      name: name,
      email: email,
      phone: phone,
    };

    addAttendee(newAttendee);

    setName('');
    setEmail('');
    setPhone('');
  };
  return (
    <>
      <tr>
        <td>N</td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="name"
            aria-label="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="email"
            aria-label="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="phone"
            aria-label="Username"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </td>
        <td></td>
        <td>
          <button 
            className="btn btn-outline-success btn-sm"
            onClick={handleAddClick}
            >Add</button>
        </td>
      </tr>
    </>
  );
}

const attendeeData = [
  { id: 1, name: "Lucy", email: "hblee8080@gmail.com", phone: "6267863192" },
  { id: 2, name: "Lucy", email: "hblee8080@gmail.com", phone: "6267863192" },
  { id: 3, name: "Lucy", email: "hblee8080@gmail.com", phone: "6267863192" },
];
