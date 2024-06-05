const pool = require('../../config/database');

async function kycImporter (num) {
    try {
        const kycQuery = `INSERT INTO kyc (kyc_numbers) VALUES ($1) RETURNING *;`;
        await pool.query(kycQuery , [num])
    } catch (err) {
        console.log("An error occurred while importing kyc number", err);
        throw err;
    }
}

async function kycGenerator (num) {
    for (let i = 0; i < num; i++) {
        let tempNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
        await kycImporter(tempNumber)
    }
}

async function gettingUserStatus (email) {
    try {
        const userQuery = `SELECT account_status FROM users WHERE email = $1`;
        const result = await pool.query(userQuery, [email]);
        return result.rows[0]
    } catch (err) {
        console.error("An error occurred while getting a user status in the Repo", err);
        throw err;
    }
}

module.exports = {
    kycGenerator,
    gettingUserStatus

};

