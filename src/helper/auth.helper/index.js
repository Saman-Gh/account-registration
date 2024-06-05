const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRepository = require("../../repository/auth.repository");


async function signupNewUser (userData) {
    const newUser = {
        username: userData.username.toLowerCase(),
        email: userData.email.toLowerCase(),
        phone: userData.phone_number,
        kyc: userData.kyc_number,
        password: userData.password
    }
    try {
        const kycStatus = await authRepository.kycExistanceCheck(newUser.kyc)
        if(kycStatus) {
            const {userExists, emailExists, phoneExists, kycExists} = await authRepository.userExistanceCheck(newUser.username, newUser.email, newUser.phone, newUser.kyc)
            if(!userExists && !emailExists && !phoneExists && !kycExists) {
                const hashPassword = await encryptPassword(newUser.password);
                const result = await authRepository.createNewUserRepo(newUser.username, newUser.email, newUser.phone, newUser.kyc, hashPassword)
                if(result) {
                    return {message: "The user is created successfully", isValid: true}
                } 
                // return false
            } 
            return {message: "The entered data is already in use", isValid: false}
        }
        return {message: "The KYC number is not valid", isValid: false}
    } catch (err) {
        console.log("An error occurred while signing a new user", err);
        throw err;
    }
}

async function encryptPassword (pass) {
    try {
        const salt = 10;
        const hashedPass = await bcrypt.hash(pass, salt)
        return hashedPass;
    } catch (err){
        console.log("An error occurred while encrypting a password", err);
        throw err;
    }
}

async function decryptPassword (pass, hashedPass) {
    try {
        return bcrypt.compare(pass, hashedPass);
    } catch (err) {
        console.error("An error occurred while decrypting a password", err);
        throw err;
    }
}


async function loginUser (userData) {
    const user = {
        email: userData.email,
        password: userData.password
    }
    try {
        const emailExists = await authRepository.userExistanceCheckByEmail(user.email)
        if(emailExists) {
            const hashedPassword = await authRepository.fetchHashedPassRepo(user.email);
            const isPassMatch = await decryptPassword(user.password, hashedPassword)
            if(isPassMatch){
                const token = jwt.sign()
            }
        } else {
            return {message: "The user does not exist", isValid: false}
        }
    } catch (err) {
        console.error("An error occurred while trying to login", err);
        throw err;
    }
}

module.exports = {
    signupNewUser,
    loginUser
}



