const bcrypt = require('bcrypt');
async function hash(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function compare(enteredPassword, storedHashedPassword) {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
}
module.exports = {hash,compare}
