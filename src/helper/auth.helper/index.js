const bcrypt = require('bcrypt');
const { kycExistanceCheck, userExistanceCheck, createNewUserRepo } = require("../../repository/auth.repository");

async function signupNewUser (userData) {
    const newUser = {
        username: userData.username.toLowerCase(),
        email: userData.email.toLowerCase(),
        phone: userData.phone_number,
        kyc: userData.kyc_number,
        password: userData.password
    }
    try {
        const kycStatus = await kycExistanceCheck(newUser.kyc)
        if(kycStatus) {
            const {userExists, emailExists, phoneExists, kycExists} = await userExistanceCheck(newUser.username, newUser.email, newUser.phone, newUser.kyc)
            if(!userExists && !emailExists && !phoneExists && !kycExists) {
                const hashPassword = await encryptPassword(newUser.password);
                const result = await createNewUserRepo(newUser.username, newUser.email, newUser.phone, newUser.kyc, hashPassword)
                if(result) {
                    return true
                } return false
            } 
            console.log("The user is exists already");
            return false;
        }
        console.log("The KYC number is not valid");
        return false
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


module.exports = {
    signupNewUser
}



