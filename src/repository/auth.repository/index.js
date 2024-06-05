const pool = require('../../../config/database')

async function kycExistanceCheck (kyc) {
    try {
        const kycQuery = `SELECT * FROM kyc WHERE kyc_numbers = $1`;
        const result = await pool.query(kycQuery, [kyc])
        if(result.rows.length === 1) {
            return true
        }
        return false
    } catch (err) {
        console.log("An error occurred while checking a kyc existance", err);
        throw err;
    }
}

async function userExistanceCheck (username, email, phone, kyc) {
    try {
        const userQuery = `
        SELECT
            EXISTS(SELECT 1 FROM users WHERE username = $1) AS user_exists,
            EXISTS(SELECT 1 FROM users WHERE email = $2) AS email_exists,
            EXISTS(SELECT 1 FROM users WHERE phone_number = $3) AS phone_exists,
            EXISTS(SELECT 1 FROM users WHERE kyc_number = $4) AS kyc_exists;
        `;
        const result = await pool.query(userQuery, [username, email, phone, kyc]);
        const {user_exists, email_exists, phone_exists, kyc_exists} = result.rows[0];
        return {userExists: user_exists, emailExists: email_exists, phoneExists: phone_exists, kycExists: kyc_exists}
    } catch (err) {
        console.log("An error occurred while checking user existance in the Repo", err);
        throw err
    }
}

async function createNewUserRepo (username, email, phone, kyc, pass) {
    try {
        const userQuery = `INSERT INTO users (username, email, phone_number, kyc_number, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`;
        const result = await pool.query(userQuery, [username, email, phone, kyc, pass]);
        console.log("the user is created successfully", result.rows[0]);
        return true;
    } catch (err) {
        console.log("An error occurred while creating a new user", err); 
        throw err;
    }
}





module.exports = {
    kycExistanceCheck,
    userExistanceCheck,
    createNewUserRepo,
}