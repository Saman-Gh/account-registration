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
            if(signupNewUserExecute) {
                return res.send("User is created successfully")
            }
            else {
                return res.send("Registration is failed")
            }
        }
    } catch (err) {
        console.log("An error occurred while signing up a new user", err);
        throw err;
    }
}





module.exports = {
    signupPage,
    signupUser
}