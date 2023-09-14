import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import'./attendenceList.css'
import NewStudent from "./create";

const Student = (props) => (
  <tr>
    <td>{props.student.name}</td>
    <td>{props.student.major}</td>
    <td>{props.student.attend}</td>
    <td>{props.student.cwid}</td>
  </tr>
);

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", major: "", attend: "", cwid: "" });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getStudents() {
      const response = await fetch(`http://localhost:3001/student/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const students = await response.json();
      setStudents(students);
    }

    getStudents();

    return;
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const id = params.id.toString();
  //     const response = await fetch(`http://localhost:3001/student/${params.id.toString()}`);

  //     if (!response.ok) {
  //       const message = `An error has occurred: ${response.statusText}`;
  //       window.alert(message);
  //       return;
  //     }

  //     const student = await response.json();
  //     if (!student) {
  //       window.alert(`Student with id ${id} not found`);
  //       navigate("/");
  //       return;
  //     }

  //     setForm(student);
  //   }

  //   fetchData();

  //   return;
  // }, [params.id, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      major:form.major,
      cwid:form.cwid,
      attend:form.attend,
    };

    // post request to update the data in the database.
    await fetch(`http://localhost:3001/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");

    //fetchData();

    return;
  }

  function studentList() {
    return students.map((student) => {
      return (
        <Student
          student={student}
          //deleteStudent={() => deleteStudent(student._id)}
          key={student._id}
        />
      );
    });
  }

  return (
    <div>
     <h3>Attendence List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Major</th>
           <th>Are you here?</th>
           <th>CWID</th>
         </tr>
       </thead>
       <tbody>{studentList()}</tbody>
     </table>
   </div>
   
 );

 
}

