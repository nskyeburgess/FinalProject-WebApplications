import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";

export default function NewStudent() {
  const [form, setForm] = useState({
    name: "",
    major: "",
    attend: "",
    cwid: "",
  });

  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newStudent = { ...form };

    await fetch("http://localhost:3001/student/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then(() => {
        setForm({ name: "", major: "", attend: "", cwid: "" });
        navigate("/");
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Attendance Sheet</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="major">Major</label>
          <input
            type="text"
            className="form-control"
            id="major"
            value={form.major}
            onChange={(e) => updateForm({ major: e.target.value })}
          />
        </div> 

        <div className="form-group">
          <label htmlFor="cwid">CWID</label>
          <input
            type="text"
            className="form-control"
            id="cwid"
            value={form.cwid}
            onChange={(e) => updateForm({ cwid: e.target.value })}
          />
        </div>

         <div className="form-group">
          <label htmlFor="attend">Are you here?</label>
          <input
            type="text"
            className="form-control"
            id="attend"
            value={form.attend}
            onChange={(e) => updateForm({ attend: e.target.value })}
          />
        </div> 

        <div className="form-group">
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
