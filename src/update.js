import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function AddStudent() {
 const [form, setForm] = useState({
  name: "",
  major: "",
  attend: "",
  cwid:"",
  students: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.student_id.toString();
     const response = await fetch(`http://localhost:3001/student/${id}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const student = await response.json();
     if (!student) {
       window.alert(`Student with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(student);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const newStudent = {
     name: form.name,
     major: form.major,
     attend: form.attend,
     cwid: form.cwid,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:3001/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(newStudent),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Student</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Major: </label>
         <input
           type="text"
           className="form-control"
           id="major"
           value={form.major}
           onChange={(e) => updateForm({ major: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">CWID: </label>
         <input
           type="text"
           className="form-control"
           id="cwid"
           value={form.cwid}
           onChange={(e) => updateForm({ cwid: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
         <label htmlFor="name">Attendence: </label>
           <input
             type="text"
             className="form-control"
             id="attend"
             value={form.attend}
             onChange={(e) => updateForm({ attend: e.target.value })}
           />
           
         </div>
          
         </div>
       <br />
 
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