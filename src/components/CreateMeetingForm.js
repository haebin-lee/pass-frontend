import React, { useState, useEffect } from "react";
import { createMeeting, updateMeeting } from "../services/api";
import styles from "../assets/css/CreateSpaceForm.module.css";
import { qrGenerator } from "./QRCodeGenerator";
import {useLocation} from "react-router-dom";

export default function CreateMeetingForm() {
  const [name, setName] = useState("");
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [description, setDescription] = useState("");
  const [eventAt, setEventAt] = useState("");
  const [registerNow, setRegisterNow] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState('NAME');
  const [attendees, setAttendees] = useState([]);
  const [idCounter, setIdCounter] = useState(0); 
  
  const location = useLocation();
  const editMeeting = location.state != null ? location.state.editMeeting : null;
  const editAttendees = location.state != null ? location.state.editAttendees : null;
  
  useEffect(() => {  
    if (editMeeting != null) {
      setName(editMeeting.name);
      setDescription(editMeeting.description);
      setEventAt(formatDate(editMeeting.eventAt));
      setRegisterNow(editMeeting.registerNow);
      setVerificationMethod(editMeeting.verificationMethod);
      setIsEditingMode(true);
    }
    if (editAttendees) {
      let id = 0;
      const attendeesWithId = editAttendees.map((attendee) => ({
        ...attendee, 
        id: id++,
      }))
      setAttendees(attendeesWithId);
      setIdCounter(id)
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

  const  handleOptionRadio = (verificationMethod) => {
      setVerificationMethod(verificationMethod);
  }

  function handleChecked(event) {
    setRegisterNow(event.target.checked);
  }

  async function handleSave(event) {
    event.preventDefault();

    if (!name || !description || !eventAt) {
      alert("Name, description, and event date are required.");
      return;
    }

    const key = Math.random().toString(36).slice(2, 20);
    const currentDomain = window.location.origin;
    const verificationUrl = currentDomain + "/validation/" + key;
    try {
      const qrUrl = await generateQRAddr(verificationUrl);
      const body = {
        name: name,
        description: description,
        qrUrl: qrUrl,
        key: key,
        registerNow: registerNow,
        verificationMethod: verificationMethod,
        eventAt: eventAt,
        attendees: attendees,
      };

      createMeeting(body)
        .then((res) => {
            window.location.href = "/spaces/" + res.data.id;
        })
        .catch((error) => {
          console.log("handleSave error", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (event) => {
    event.preventDefault();

    const body = {
      name: name,
      description: description,
      registerNow: registerNow,
      verificationMethod: verificationMethod,
      eventAt: eventAt,
      attendees: attendees
    }
    updateMeeting(editMeeting.id, body)
      .then((res) => {
        window.location.href = "/spaces/" + editMeeting.id
      })
      .catch((error) => {
        console.log('handleEdit error', error)
      })
    
  }

  const addAttendee = (attendee) => {
    const newAttendee = {
      ...attendee, 
      id: idCounter
    }
    setAttendees([...attendees, newAttendee]);
    setIdCounter(idCounter + 1);
  };

  const editAttendee = (index, updatedData) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index] = {...updatedAttendees[index], ...updatedData};
    setAttendees(updatedAttendees);
  };

  function formatDate(dateArray) {
    if (!dateArray) return null;
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
        <div className="mb-3">
          <label htmlFor="exampleOption" className="form-label">
            Select one: name, email, phone to confirm attendee verification.
          </label>
          <br />
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
              checked={verificationMethod === 'NAME'}
              onClick={() => handleOptionRadio('NAME')}
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio1">
              Name
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio2"
              autoComplete="off"
              checked={verificationMethod === 'EMAIL'}
              onClick={() => handleOptionRadio('EMAIL')}
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio2">
              Email
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio3"
              autoComplete="off"
              checked={verificationMethod === 'PHONE'}
              onClick={() => handleOptionRadio('PHONE')}
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio3">
              Phone
            </label>
          </div>
        </div>
        {/* <div className="form-check form-switch">
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
        </div> */}
        <table className="table table-hover">
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
            <Attendees
              attendees={attendees}
              addAttendee={addAttendee}
              editAttendee={editAttendee}
            />
          </tbody>
        </table>
        <div className="d-grid justify-content-md-end">
          {isEditingMode ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleEdit}>
                Edit
              </button>
          ) :(
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSave}>
              Save
            </button>
          )}
          
        </div>
      </form>
    </div>
  );
}

function Attendees({ attendees, addAttendee, editAttendee}) {
  const handleEditAttendee = (index, updatedData) => {
    editAttendee(index, updatedData);
  }

  return (
    <>
      {attendees.map((attendee) => (
        <tr key={attendee.id}>
          <td>{attendee.id}</td>
          <td>
            <input
              type="text"
              className="form-control"
              value={attendee.name}
              onChange={(e) =>
                handleEditAttendee(attendee.id, { name: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              value={attendee.email}
              onChange={(e) =>
                handleEditAttendee(attendee.id, { email: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              value={attendee.phone}
              onChange={(e) =>
                handleEditAttendee(attendee.id, { phone: e.target.value })
              }
            />
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={attendee.status === 'ATTENDED'}
              onChange={() => handleEditAttendee(attendee.id, {
                status: attendee.status === 'ATTENDED' ? 'NOT_ATTENDED' : 'ATTENDED'
              })}
            />
          </td>
          <td></td>
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