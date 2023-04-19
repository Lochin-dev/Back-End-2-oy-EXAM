const Joi = require("joi")

exports.userValidation = (data) => {

    const schema = Joi.object({
        image: Joi.string(),
        username: Joi.string().min(3).max(15).required(),
        email: Joi.string().min(3).max(30).required().email(),
        confirmEmail: Joi.ref('email'),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })

    return schema.validate(data)
}


