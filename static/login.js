/*
TODO

-hidden on load for dropdown
-visible when logged in

*/


const web = 'http://localhost:8000/'

window.onload = function() {

    document.getElementById('login').addEventListener('click', login);
    document.getElementById('register').addEventListener('click', register);
    document.getElementById('username').addEventListener('keyup', function(event) {
        if (event.keyCode === 13 && document.getElementById('username').value != "") {
            event.preventDefault();
            document.getElementById('login').click();
        }
    });
    document.getElementById('password').addEventListener('keyup', function(event) {
        if (event.keyCode === 13 && document.getElementById('username').value != "") {
            event.preventDefault();
            document.getElementById('login').click();
        }
    });

    localStorage.getItem("username") ? document.getElementById('username').value = localStorage.getItem("username") : null;
    localStorage.getItem("password") ? document.getElementById('password').value = localStorage.getItem("password") : null;

    document.getElementById('alert').style.display = "none";

    //check if token exists
    fetch(web + 'tokenGet')
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                console.log("no token");
                return;
            }
            var expire = data[0].expire;
            let now = new Date(); // Get the current date and time
            let hours = now.getHours(); // Get the hours component
            let minutes = now.getMinutes(); // Get the minutes component

            let nowInMinutes = hours * 60 + minutes; // Convert hours and minutes to total minutes
            if (nowInMinutes > expire) {
                //delete expired token
                fetch(web + 'expiredToken', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "userID": data[0].userID
                    })
                });
                console.log("token expired");
                return;
            }
            window.location.href = `se.html`;
        });
}

function login() {
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === "" || password === "") {
        document.getElementById('alert').innerHTML = "Username or password cannot be empty!";
        document.getElementById('alert').style.display = "block";
        const container = document.querySelector('.login-container');
        container.style.height = '40%';
        return;
    }

    fetch(web + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    .then(response => response.json())
    .then(data => {
        // alert(data.message);
        if (data.message != "Login successful!") {
            document.getElementById('alert').innerHTML = "Wrong username or password!";
            document.getElementById('alert').style.display = "block";

            const container = document.querySelector('.login-container');
            container.style.height = '40%';
            return;
        }
        else{
            saveCredential();
            // document.getElementById('alert').innerHTML = "going to se.html";
            // window.location.href = `se.html`;
            //get mainpage
            fetch(web + 'mainpage', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function register() {
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === "" || password === "") {
        document.getElementById('alert').innerHTML = "Username or password cannot be empty!";
        document.getElementById('alert').style.display = "block";
        const container = document.querySelector('.login-container');
        container.style.height = '40%';
        return;
    }

    fetch(web + 'register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('alert').innerHTML = data.message;
        document.getElementById('alert').style.display = "block";

        const container = document.querySelector('.login-container');
        container.style.height = '40%';
        return;
        // alert(data.message);
        // Additional logic based on the response, e.g., redirect to another page on successful login
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function saveCredential(){

    var remember = document.getElementById('remember').checked;

    if (remember) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
    } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }
}