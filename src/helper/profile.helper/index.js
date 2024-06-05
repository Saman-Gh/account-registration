const profileRepository = require("../../repository/profile.repository");

async function changeUserStatus (userData) {
    const user = {
        email: userData.email,
    }
    try {
        const currentUserStatus = await profileRepository.gettingUserStatus(user.email);
        if(currentUserStatus === "active") {
            await profileRepository.changeUserStatusRepo(user.email, 'deactive');
            return true;
        } else {
            console.log("The user status is deactivated already");
            return false;
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
        const currentUserStatus = await profileRepository.gettingUserStatus(user.email);
        if(currentUserStatus === "deactive") {
            await profileRepository.deleteUserByEmailRepo(user.email);
            return true;
        } else {
            console.log("You can delete an user while its status is Deactive");
            return false;
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