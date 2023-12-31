import React from "react";
import styles from "../assets/css/Introduction.module.css";

export default function Introduction() {
  function handleRegister() {
    window.location.href = '/create-space'
  }
  
  return (
    <>
      <div className={styles.centeredContent}>
        <p>
          The power to know. The ease of a click. Making attendance management a
          breeze.
        </p>
        <div className="d-grid justify-content-md-start">
          <button className="btn btn-outline-primary" onClick={handleRegister}>
            Create Meeting Space
          </button>
        </div>
      </div>
    </>
  );
}
