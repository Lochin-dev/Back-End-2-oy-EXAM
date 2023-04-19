const Joi = require("joi")

exports.courseValidation = (data) => {
    console.log(data);
    const schema = Joi.object({
        image: Joi.string(),
        title: Joi.string().min(2).max(20).required(),
        price: Joi.string().required()
    })
    return schema.validate(data)
}

