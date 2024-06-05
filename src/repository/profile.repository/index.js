const pool = require('../../../config/database');

async function gettingUserStatus (email) {
    try {
        const userQuery = `SELECT account_status FROM users WHERE email = $1`;
        const result = await pool.query(userQuery, [email]);
        return result.rows[0].account_status
    } catch (err) {
        console.error("An error occurred while getting a user status in the Repo", err);
        throw err;
    }
}

async function changeUserStatusRepo (email, sts) {
    try {
        const userQuery = `UPDATE users SET account_status = $2 WHERE email = $1`;
        await pool.query(userQuery, [email, sts]);
        console.log("The user status has been changed successfully");
        return true
    } catch (err) {
        console.error("An error occurred while changing the user status in the Repo", err);
        throw err;
    }
}

async function deleteUserByEmailRepo (email) {
    try {
        const deleteQuery = `DELETE FROM users WHERE email = $1`;
        await pool.query(deleteQuery, [email]);
        return true;
    } catch (err) {
        console.error("An error occurred while deleting an user in the Repo", err);
        throw err;
    }
}

async function userExistanceCheckByEmail (email) {
    try {
        const userQuery = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(userQuery, [email]);
        if(result.rows.length === 1) {
            return true
        }
        return false
    } catch (err) {
        console.error("An error occurred while checking an user existance", err);
        throw err;
    }
}

module.exports = {
    changeUserStatusRepo,
    gettingUserStatus,
    deleteUserByEmailRepo,
    userExistanceCheckByEmail,
}