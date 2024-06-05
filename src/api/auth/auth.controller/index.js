const { signupNewUser } = require("../../../helper/auth.helper");
const { signupValidator } = require("../auth.validator");

function signupPage (req, res) {
    res.send("Welcome to the signup page")
}

async function signupUser (req, res) {
    try {
        const {error} = signupValidator(req.body)
        if(error) {
            res.send(error.message)
        }
        else {
            const signupNewUserExecute = await signupNewUser(req.body);
            if(signupNewUserExecute.isValid) {
                return res.send(signupNewUserExecute.message)
            }
            else {
                return res.send(signupNewUserExecute.message)
            }
        }
    } catch (err) {
        console.log("An error occurred while signing up a new user", err);
        throw err;
    }
}

function loginPage (req, res) {
    try {
        res.send("Welcome to the login page")
    } catch (err) {
        console.log("An error occurred while user trying to login", err);
        throw err;
    }
}



module.exports = {
    signupPage,
    signupUser,
    loginPage
}