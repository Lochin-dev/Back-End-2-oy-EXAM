import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";
function index() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2020/allcourse", {
      method: "GET",
      headers: {
        "Copntent-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [courses]);

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="courses container">
        <h1 align="center">Courses</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Yaratdi</th>
              <th>title</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course, idx) => (
                <tr key={course.id}>
                  <td>{course.username}</td>
                  <td>{course.title}</td>
                  <td>{course.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default index;
