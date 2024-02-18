const bcrypt = require("bcrypt");

export const encryptPassword = async (password: string) => {
    console.log("This is the password to be encoded" + password)
    try {

        let hashed_password = await bcrypt.hash(password.toString(), 10);
        const hashed = await hashed_password
        console.log(hashed_password)
        return hashed;

    }
    catch (err) {
        console.log(err
        )
        return "there is an error"
    }

}

export const decryptPassword = async (user_password: string, real_password: string) => {

    //  console.log(user_password, real_password)
    let isMatch = await bcrypt.compare(user_password, real_password)

    return isMatch;


}
