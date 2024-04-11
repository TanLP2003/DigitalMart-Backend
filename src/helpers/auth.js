const bcrypt = require('bcrypt');
const saltRounds = 5;

module.exports = {
    hashPassword: async (password) => {
        try {
            let hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        }
        catch (err) {
            console.log(err);
        }
    },
    comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    }
}