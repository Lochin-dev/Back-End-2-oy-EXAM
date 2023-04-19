const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()
const { read, write } = require("../src/utils/fs.js")
let users = read("user.json")


// --------------------------------- USER REGISTER ---------------------------------

const register = async (req, res) => {
    const { username, email, confirmEmail, password } = req.body;
    let foundetuser = users.find(user => user.email === email)
    if (foundetuser) return res.status(400).send(JSON.stringify({
        msg: "User oldin registratsiyadan o'tgan!!"
    }))


    if (req.files) {
        const { image } = req.files
        const imageName = uuid.v4() + image.name
        image.mv(path.join(process.cwd(), "/img/", imageName))

        if (email == confirmEmail) {
            let hashPas = await bcrypt.hash(password, 12)
            let user = {
                id: uuid.v4(),
                image: "/img/" + imageName,
                username,
                email,
                password: hashPas
            }

            users.push(user)
            write("user.json", users)
            return res.status(201).send({
                msg: "User registrated"
            })
        } else {
            res.status(400).send(JSON.stringify({
                msg: "Confirm Email Error"
            }))
        }
    } else {
        const rasm = 'https://i.pinimg.com/736x/c8/83/5a/c8835a6e6574327ef5b033a66098ecce.jpg'
        if (email == confirmEmail) {
            let hashPas = await bcrypt.hash(password, 12)
            let user = {
                id: uuid.v4(),
                image: rasm,
                username,
                email,
                password: hashPas
            }
            0
            users.push(user)
            write("user.json", users)
            return res.status(201).send({
                msg: "User registrated"
            })
        } else {
            res.status(400).send(JSON.stringify({
                msg: "Confirm Email Error"
            }))
        }
    }
}


// --------------------------------- USER LOGIN ------------------------------------

const login = async (req, res) => {
    const { suppername, password } = req.body;

    const foundetuser = users.find(user => user.email === suppername || user.username === suppername)
    if (!foundetuser) return res.status(404).send({ msg: "User not found" })
    let checkPas = await bcrypt.compare(password, foundetuser.password)
    if (checkPas) {
        let token = await jwt.sign({ id: foundetuser.id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        })

        return res.status(200).send({ token })
    }

    return res.status(404).send({ msg: "Passwort natog'ri" })

}
module.exports = { register, login }