const express = require("express")


const { getCourseList, createCourse, deleteCourse, updateCourse, allCourse } = require("../controller/course")
const { courseValidated } = require("../middleware/course.middle")
const router = express.Router()


// router
//     .route("/courses/:id")
//     .get(getCourseList)

router
    .route("/courses")
    .get(getCourseList)
    .post(courseValidated, createCourse);

router

    .route("/courses/:id")
    .delete(deleteCourse)
    .put(courseValidated, updateCourse)

router
    .route("/allcourse")
    .get(allCourse)

module.exports = router 