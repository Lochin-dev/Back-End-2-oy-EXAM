import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./companents/Register";
import Login from "./companents/Login";
import AllCours from "./companents/AllCours";
import Course from "./companents/Course";
import Update from "./companents/Update";
import Create from "./companents/Create";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allcourse" element={<AllCours />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/update" element={<Update />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
