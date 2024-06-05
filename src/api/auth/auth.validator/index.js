const Joi = require('joi')

const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(4).max(50).required()
    .messages({
        'string.alphanum': 'Username must contain only letters and numbers.',
        'string.min': 'Username must be at least 4 characters long.',
        'string.max': 'Username must be at most 50 characters long.',
    }),
    email: Joi.string().email().max(100).required()
    .messages({
        'string.email': 'Email must be a valid email address.',
        'string.max': 'Email must be at most 100 characters long.',
    }),
    phone_number: Joi.string().pattern(/^09\d{9}$/).required()
    .messages({
        'string.pattern.base': 'Phone number must be exactly 11 digits long and start with 09.',
    }),
    kyc_number: Joi.string().length(10).pattern(/^\d+$/).required()
    .messages({
        'string.length': 'KYC number must be exactly 10 characters long.',
        'string.pattern.base': 'KYC number must contain only numbers.',
    }),
    password: Joi.string().min(8).pattern(/[!@#$%^&*(),.?":{}|<>]/).required()
    .messages({
        'string.min': 'Password must be at least 8 characters long.',
        'string.pattern.base': 'Password must contain at least one special character.',
    }),
    confirm_password: Joi.any().equal(Joi.ref('password')).required()
    .messages({
        'any.only': 'Confirm password does not match password.',
    })
})


const loginSchema = Joi.object({
    email: Joi.string().email().max(100).required()
    .messages({
        'string.email': 'Email must be a valid email address.',
        'string.max': 'Email must be at most 100 characters long.',
    }),
    password: Joi.string().min(8).pattern(/[!@#$%^&*(),.?":{}|<>]/).required()
    .messages({
        'string.min': 'Password must be at least 8 characters long.',
        'string.pattern.base': 'Password must contain at least one special character.',
    }),
}) 



function signupValidator (data) {
    return signupSchema.validate(data, {abortEarly: false});
}


function loginValidator (data) {
    return loginSchema.validate(data, {abortEarly: false});
}

module.exports = {
    signupValidator,
    loginValidator
}