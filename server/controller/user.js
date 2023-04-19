const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()
const { read, write } = require("../src/utils/fs.js")

let users = read("user.json")

// --------------------------------- USER GET ------------------------------------

const userget = async (req, res) => {
    res.status(200).send(JSON.stringify(users))
}

// --------------------------------- USER UPDATE ------------------------------------

const userupdate = (req, res) => {
    const { id } = req.params

    const { username, email, configEmail, password } = req.body
    const foundedUser = users.find(el => el.id === id)
    if (!foundedUser) return res.status(400).send(JSON.stringify({ msg: "User note fount" }))

    users.forEach((el, idx) => {
        if (el.id === id) {
            el.username = username ? username : el.username
            el.email = email ? email : el.email
            el.configEmail = configEmail ? configEmail : el.configEmail
            el.password = password ? password : el.password
        }
    })

    write("user.json", users)
    res.status(200).send(JSON.stringify({
        msg: "Updeted"
    }))
}

// --------------------------------- USER  DELETE ------------------------------------

const userdelete = async (req, res) => {
    const { id } = req.params
    let users = read("user.json")
    const foundedCurse = users.find(c => c.id === id)
    if (!foundedCurse) return res.status(404).send({ msg: "Course not found" })
    users.forEach((user, idx) => {
        if (user.id === id) {
            users.splice(idx, 1)
        }
    })
    write("user.json", users)
    return res.send(JSON.stringify({
        msg: 'Deleted!'
    }))
}
module.exports = { userupdate, userdelete, userget }