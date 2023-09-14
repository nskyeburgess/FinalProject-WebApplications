import React from "react";
import ReactDOM from "react-dom";
//import  Routes from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route,  Routes } from "react-router-dom";

import StudentList from "./attendanceList";
import AddStudent from "./update";
import NewStudent from "./create";
import StudentID from "./create";
import CheckMajor from "./create";

const App = () => {
  return (
    // <BrowserRouter>
      < Routes>
        <Route exact path="/" element={<StudentList />} />
        <Route path="/student/new" element={<NewStudent />} />
        <Route path="/student/:student_id" element={<StudentID />} />
        <Route
          path="/student/:student_id/attendance"
          element={<AddStudent />}
        />
        <Route
          path="/student/:student_id/student_major"
          element={<CheckMajor />}
        />
     </ Routes> 
    
  );
};

reportWebVitals();

export default App;



