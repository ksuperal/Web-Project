const fs = require('fs');

function checkLogin(id, password) {
    // Read the JSON file containing login credentials
    const data = fs.readFileSync('path/to/login/credentials.json');
    const credentials = JSON.parse(data);

    // Check if the entered ID and password match any user in the file
    for (const user of credentials.users) {
        if (user.id === id && user.password === password) {
            return true;
        }
    }

    return false;
}
