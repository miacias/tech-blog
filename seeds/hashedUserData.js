const users = require('./userData.json');
const bcrypt = require('bcrypt');
const { writeFile } = require('fs').promises;

const simulateHashPasswords = async (users) => {
    try {
        const userJson = [];
        for (i = 0; i < users.length; i++) {
            users[i].password = await bcrypt.hash(users[i].password, 10);
            userJson.push(users[i]);
        }
        console.log(userJson);
        writeFile('./seeds/hashedUserData.json', JSON.stringify(userJson), (err) => 
            err ? console.error(err) : console.log('Hashing passwords successful.'));
    } catch (err) {
        console.error(err);
    }
};

module.exports = { simulateHashPasswords };