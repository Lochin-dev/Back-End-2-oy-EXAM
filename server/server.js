const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const fileUpload = require('express-fileupload')
dotenv.config()
const port = process.env.PORT || 2021

const courseRout = require("./route/course.rout")
const authRout = require("./route/auth.rout")
const userRout = require("./route/user.rout")

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.static(path.join(process.cwd(), "img")))

app.use(courseRout)
app.use(authRout)
app.use(userRout)

app.listen(port, () => {
    console.log(`IS RENNING ${port} PORT...`);
})