import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from "../assets/css/Validation.module.css";
import { confirmAttendee } from '../services/api';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


export default function Validation() {
    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState(null);

    const {key} = useParams();
    const onClickConfirm = (event) => {
      const data = {name};
      confirmAttendee(key, data)
        .then((res) => {
          const result = res.data;
          setConfirm(result);
        })
    }

    const handleChange = (event) => {
      event.preventDefault();
      const {value} = event.target; 
      setName(value);
    }

    return (
      <>
        <div className={styles.container}>
          {confirm == null && (
            <div className="input-group mb-3">
              <div className={styles.child} style={{ width: "100%" }}>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Attendee's name"
                  aria-label="name"
                  aria-describedby="basic-addon2"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{ marginTop: "10px" }}
                  onClick={onClickConfirm}
                >
                  confirm
                </button>
              </div>
            </div>
          )}
          {confirm == true && <p>You're invited.</p>}
          {confirm == false && <p>Sorry, you are not invited.</p>}
        </div>
      </>
    );
}