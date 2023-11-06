import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from "../assets/css/Validation.module.css";
import { confirmAttendee, findMeetingByKey } from '../services/api';

export default function Validation() {
    const [value, setValue] = useState('');
    const [verificationMethod, setVerificationMethod] = useState('NAME');
    const [confirm, setConfirm] = useState(null);
    const {key} = useParams();

    useEffect(() => {
      findMeetingByKey(key).then((response) => {
        const size = response.data == null ? 0 : response.data.length;
        if (size > 0) {
          setVerificationMethod(response.data[0].verificationMethod);
        }
      })
    }, [])

    const onClickConfirm = (event) => {
      let data = {
        name: value
      }
      if (verificationMethod === "EMAIL") {
        data = {
          email: value,
        };
      } else if (verificationMethod === "PHONE") {
        data = {
          phone: value, 
        }
      }
      
      confirmAttendee(key, data)
        .then((res) => {
          const result = res.data;
          setConfirm(result);
        })
    }

    const handleChange = (event) => {
      event.preventDefault();
      const {value} = event.target; 
      setValue(value);
    }

    const placeholder = () => {
      let text = `Attendee's name`
      if (verificationMethod !== null) {
        text = `Attendee's ${verificationMethod.toLowerCase()}`
      }
      return text;
    }

    return (
      <>
        <div className={styles.container}>
          {confirm === null && (
            <div className="input-group mb-3">
              <div className={styles.child} style={{ width: "100%" }}>
                <input
                  type="info"
                  className="form-control"
                  placeholder={placeholder()}
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
          {confirm === true && <p>You're invited.</p>}
          {confirm === false && <p>Sorry, you are not invited.</p>}
        </div>
      </>
    );
}