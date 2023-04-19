const uuid = require('uuid')
const jwt = require("jsonwebtoken")
const path = require("path")

const { read, write } = require('../src/utils/fs')

let courses = read("course.json")
let users = read("user.json")


// --------------------------------- COURSE CREATE ------------------------------------

const createCourse = async (req, res) => {
    const { title, price } = req.body
    let token = await jwt.verify(req.headers.token, process.env.SECRET_KEY);
    let foundetuser = users.filter((c) => c.id === token.id);
    let tekshir = courses.find((course) => course.title === title && course.price === price)
    if (tekshir) return res.status(400).send(JSON.stringify({
        msg: "Course created before"
    }))

    const { image } = req.files
    const imageName = uuid.v4() + image.name
    image.mv(path.join(process.cwd(), "/img/", imageName))

    courses.push({
        id: uuid.v4(),
        userId: foundetuser[0].id,
        title,
        price,
        image: "/img/" + imageName,
        username: foundetuser[0].username
    })

    write("course.json", courses)
    res.status(201).send(JSON.stringify({
        msg: 'Created!'
    }))
}

// --------------------------------- COURSE DELETE ------------------------------------

const deleteCourse = async (req, res) => {
    const { id } = req.params
    let token = await jwt.verify(req.headers.token, process.env.SECRET_KEY);
    console.log(token);
    let tokenCourse = courses.filter((c) => c.userId === token.id);
    let foundedCourse = tokenCourse.find((c) => c.id === id);

    if (!foundedCourse) return res.status(404).send({ msg: 'Course not found!' })

    courses.forEach((course, idx) => {
        if (course.id === id) {
            courses.splice(idx, 1)
        }
    })

    write("course.json", courses)
    return res.send(JSON.stringify({
        msg: 'Deleted!'
    }))
}

// --------------------------------- COURSE GET USER ------------------------------------

const getCourseList = async (req, res) => {

    // const { id } = req.params

    let token = await jwt.verify(req.headers.token, process.env.SECRET_KEY);
    let foundedCourse = courses.filter((c) => c.userId === token.id);
    if (!foundedCourse) return res.status(400).send({ msg: "Course not found!" });
    res.send(JSON.stringify(foundedCourse));
};

// --------------------------------- COURSE GET ALL ------------------------------------

const allCourse = async (req, res) => {
    res.send(JSON.stringify(courses))
}

// --------------------------------- COURSE UPDATE ------------------------------------

const updateCourse = async (req, res) => {
    const { id } = req.params
    const { title, price, image } = req.body
    let token = await jwt.verify(req.headers.token, process.env.SECRET_KEY);
    let tokenCourse = courses.filter((c) => c.userId === token.id);
    let foundedCourse = tokenCourse.find((c) => c.id === id);
    if (!foundedCourse) return res.status(400).send({ msg: 'Course not found!' })
    courses.forEach((course, idx) => {
        if (course.id === id) {
            course.title = title ? title : course.title
            course.price = price ? price : course.price
            course.image = image ? image : course.image
        }
    })

    write("course.json", courses)
    res.status(200).send(JSON.stringify({
        msg: "Updated!"
    }))
}

module.exports = {
    createCourse,
    getCourseList,
    deleteCourse,
    updateCourse,
    allCourse
};



