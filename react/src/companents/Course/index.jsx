import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";

function index() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2020/courses", {
      method: "GET",
      headers: {
        "Copntent-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [courses]);

  const deleteCourse = (id) => {
    fetch(`http://localhost:2020/courses/${id}`, {
      method: "DELETE",
      headers: {
        "Copntent-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
  };

  const updateCourse = () => {
    location.href = "/update";
  };

  return (
    <>
      <Navbar />

      <div className="courses container">
        <h1 align="center">Courses</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Ismi</th>
              <th>title</th>
              <th>price</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course, idx) => (
                <tr key={course.id}>
                  <td>{course.username}</td>
                  <td>{course.title}</td>
                  <td>{course.price}</td>
                  <td>
                    <i
                      className="fa fa-edit text-primary"
                      style={{
                        cursor: "pointer",
                        marginRight: 15,
                      }}
                      onClick={() => updateCourse(course.id)}
                    ></i>
                    <i
                      className="fa fa-trash text-danger ml-4"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteCourse(course.id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div
          onClick={() => (location.href = "/create")}
          className="d-flex justify-content-end w-100"
        >
          <button className="btn fs-2 p-3 py-0 border ">+</button>
        </div>
      </div>
    </>
  );
}

export default index;
