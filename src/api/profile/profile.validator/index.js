const Joi = require('joi')

const emailSchema = Joi.object({
    email: Joi.string().email().max(100).required()
    .messages({
        'string.email': 'Email must be a valid email address.',
        'string.max': 'Email must be at most 100 characters long.',
    })
});

function emailShemaFunction (data) {
    return emailSchema.validate(data, {abortEarly: false})
}

module.exports = {
    emailShemaFunction
}