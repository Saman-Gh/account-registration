const profileHelper = require("../../../helper/profile.helper");
const emailValidator = require("../profile.validator");

async function changeUserStatus (req, res) {
    try {
        const {error} = emailValidator.emailShemaFunction(req.body);
        if(error) {
            res.send(error.message)
        } 
        else {
            const changeUserSts = await profileHelper.changeUserStatus(req.body)
            if(changeUserSts) {
                return res.send("The user status is changed successfully")
            } else {
                return res.send("Updating failed")
            }
        }
    } catch (err) {
        console.error("An error occurred while changing a user status", err)
        throw err;
    }
}


async function deleteUserByEmail (req, res) {
    try {
        const {error} = emailValidator.emailShemaFunction(req.body);
        if(error) {
            res.send(error.message)
        } else {
            const deleteUser = await profileHelper.deleteUserByEmailH(req.body);
            if(deleteUser) {
                return res.send("User deleted successfully")
            } else {
                return res.send("Deleting failed")
            }
        }
    } catch (err) {
        console.error("An error occurred while deleteing an user in controller", err);
        throw err;
    }
}



module.exports = {
    changeUserStatus,
    deleteUserByEmail
}