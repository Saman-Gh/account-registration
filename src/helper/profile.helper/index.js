const profileRepository = require("../../repository/profile.repository");

async function changeUserStatus (userData) {
    const user = {
        email: userData.email,
    }
    try {
        const userExist = await profileRepository.userExistanceCheckByEmail(user.email)
        if(userExist){
            const currentUserStatus = await profileRepository.gettingUserStatus(user.email);
            if(currentUserStatus === "active") {
                await profileRepository.changeUserStatusRepo(user.email, 'deactive');
                return {message: "The user status is changed successfully", isValid: true}
            } 
            else if(currentUserStatus === "deactive") {
                await profileRepository.changeUserStatusRepo(user.email, 'active');
                return {message: "The user status is changed successfully", isValid: true}
            } 
        }
        else {
            return {message: "The user does not exists", isValid: false}
        }
    } catch (err) {
        console.error("An error occurred while changing user status in helper", err);
        throw err;
    }
}


async function deleteUserByEmailH (userData) {
    const user = {
        email: userData.email,
    }
    try {
        const userExistanceCheck = await profileRepository.userExistanceCheckByEmail(user.email)
        if(userExistanceCheck) {
            const currentUserStatus = await profileRepository.gettingUserStatus(user.email);
            if(currentUserStatus === "deactive") {
                await profileRepository.deleteUserByEmailRepo(user.email);
                return {message: "The user is deleted successfully", isValid: true}
            } else {
                return {message: "You can delete an user while its status is Deactive", isValid: false}
            }
        } else {
            return {message: "The user does not exist", isValid: false}
        }
    } catch (err) {
        console.error("An error occurred while deleting an user in helper", err);
        throw err;
    }
}






module.exports = {
    changeUserStatus,
    deleteUserByEmailH
}